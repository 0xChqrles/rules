export class Version {
  public readonly str: string
  public readonly major: number
  public readonly minor: number
  public readonly patch: number

  constructor(str: string) {
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(str))
      throw 'version not well formed'

    this.str = str

    const [major, minor, patch] = str.split('.').map(e => +e)
    this.major = major
    this.minor = minor
    this.patch = patch
  }

  public compare(otherVersion: Version | string): -1 | 0 | 1 {
    if (typeof otherVersion === 'string') otherVersion = new Version(otherVersion)

    if (this.major > otherVersion.major) return 1
    if (this.major < otherVersion.major) return -1

    if (this.minor > otherVersion.minor) return 1
    if (this.minor < otherVersion.minor) return -1

    if (this.patch > otherVersion.patch) return 1
    if (this.patch < otherVersion.patch) return -1

    return 0
  }
}

export function getTransactionVersionFromWalletVersion(version: Version | string) {
  if (typeof version === 'string') version = new Version(version)

  if (version.compare('0.2.0') >= 0) return 1

  return 0
}
