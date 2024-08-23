import { Types } from 'mongoose'

/**
 * Owner
 */

export interface Owner {
  /**
   * @deprecated should only be used for migration purposes
   */
  transferStarknetTransaction?: Types.ObjectId

  starknetAddress: string
}

export interface OwnerDocument extends Owner, Document {}

/**
 * Signature
 */

export interface Signature {
  r: string
  s: string
}

export interface SignatureDocument extends Signature, Document {}

/**
 * Voucher data
 */

export interface MessageSigningData {
  signature: Signature
  salt: string
}

export interface MessageSigningDataDocument extends MessageSigningData, Document {}
