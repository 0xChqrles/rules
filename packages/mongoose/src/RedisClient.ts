import IORedis from 'ioredis'
import Redlock, { Lock } from 'redlock'
import { NumberSettings, StringSettings } from './constants'

export class RedisClient {
  readonly host: string

  protected _redlock?: Redlock
  protected _redisClient?: IORedis.Redis

  private locks: Array<Lock> = []

  constructor(host: string) {
    this.host = host
  }

  /** Getters */

  protected redisClient() {
    if (!this._redisClient) throw 'Redis instance not connected'
    return this._redisClient
  }

  protected redlock() {
    if (!this._redlock) throw 'Redis instance not connected'
    return this._redlock
  }

  public getLocks() {
    return this.locks
  }

  /** Business logic */

  public async connect(options: Redlock.Options = {}) {
    if (this._redisClient) {
      console.log('Already connected to redis')
      return
    }

    this._redisClient = new IORedis({
      host: this.host,
      port: 6379,
      lazyConnect: true
    })

    await this._redisClient.connect()

    console.log('Connected to redis client')

    this._redlock = new Redlock(
      // You should have one client for each independent redis node
      // or cluster.
      [this._redisClient],
      {
        // The expected clock drift; for more details see:
        // http://redis.io/topics/distlock
        driftFactor: 0.01, // multiplied by lock ttl to determine drift time

        // The max number of times Redlock will attempt to lock a resource
        // before erroring.
        retryCount: 3,

        // the time in ms between attempts
        retryDelay: 200, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter: 50, // time in ms

        ...options,
      }
    )

    this._redlock.on('clientError', function(err: any) {
      console.error('A redis error has occurred:', err);
    })
  }

  public async lock(ressource: string | string[], duration: number): Promise<Lock> {
    const ressources = Array.isArray(ressource) ? ressource : [ressource]

    const lock = await this.redlock().acquire(ressources, duration)
    this.locks.push(lock)

    return lock
  }

  public async unlockAll() {
    await Promise.all(this.locks.map((lock) => {
      try {
        this.redlock().release(lock)
      } catch (error) {
        console.error('[ERROR] Failed to unlock:', error)
      }
    }))
    this.locks = []
  }

  // settings

  public async get(key: keyof typeof NumberSettings): Promise<number | null>
  public async get(key: keyof typeof StringSettings): Promise<string | null>

  public async get(key: any): Promise<any> {
    const value = await this.redisClient().get(key)

    return (NumberSettings as any)[key] ? +(value ?? 0) : value
  }

  public async set(key: keyof typeof NumberSettings, value: number): Promise<void>
  public async set(key: keyof typeof StringSettings, value: string | null): Promise<void>

  public async set(key: any, value: any) {
    await this.redisClient().set(key, value)
  }
}
