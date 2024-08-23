import { Signature as StarknetSignature, ec, encode, num } from 'starknet'

import { Signature } from '../types'

export async function isHashSignatureValid(hash: string, signature: Signature, publicKey: string) {
  return ec.starkCurve.verify(
    new ec.starkCurve.Signature(num.toBigInt(signature.r), num.toBigInt(signature.s)),
    hash,
    publicKey
  )
}

export function signHash(hash: string, pk: string) {
  return formatSignature(ec.starkCurve.sign(hash, pk))
}

export function formatSignature(signature: StarknetSignature): Signature {
  return Array.isArray(signature)
    ? {
      r: signature[0],
      s: signature[1],
    }
    : {
      r: signature.r.toString(),
      s: signature.s.toString(),
    }
}

export function isFullPublicKeyValid(fullPublicKey: string, publicKey: string) {
  return BigInt(publicKey) == BigInt(encode.addHexPrefix(fullPublicKey.slice(4, 68)))
}
