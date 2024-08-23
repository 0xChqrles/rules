import mongoose, { Connection, ClientSession, ConnectOptions } from 'mongoose'

import rulesModels from './models/rules'

export enum Database {
  RULES = 'rules-db'
}

export class Cluster {
  readonly uri: string
  readonly query: { [param: string]: string } = {
    retryWrites: 'true',
    w: 'majority',
  }

  public db: Database | undefined
  public connection: Connection | typeof mongoose | null = null
  public session: ClientSession | null = null

  public rules = rulesModels

  constructor(uri: string) {
    const splittedUri = uri.split('?')
    if (splittedUri.length > 2) throw 'Invalid URI'

    this.uri = splittedUri[0]

    for (const queryString of (splittedUri[1]?.split('&')) ?? []) {
      const splittedQuery = queryString.split('=')
      if (splittedQuery.length !== 2) throw 'Invalid URI'

      this.query[splittedQuery[0]] = splittedQuery[1]
    }
  }

  public async connect(db: Database) {
    if (this.connection) {
      console.log('Already connected to database')
      return
    }

    const queryString = Object.keys(this.query).map((param) => `${param}=${this.query[param]}`).join('&')

    const url = `${this.uri}/${db}?${queryString}`

    this.connection = await mongoose.connect(url, {
      connectTimeoutMS: 5000, // Timeout after 5s
      bufferCommands: false,
    } as ConnectOptions)

    this.db = db

    console.log('Connected to database')
  }

  public async startSession() {
    if (this.session) throw 'A session is already active'

    this.session = await this.connection?.startSession() ?? null
    if (!this.session) throw 'Failed to create mongoose session'
  }

  public endSession() {
    this.session?.endSession()
    this.session = null
  }
}
