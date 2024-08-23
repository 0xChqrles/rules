import { encode, num, uint256 } from 'starknet'

export function encodeShortString(str: string): string {
  return encode.addHexPrefix(str.split('').map(c => Number(c.charCodeAt(0)).toString(16)).join(''))
}

export const encodeUint256 = (n: uint256.Uint256) => num.toHex(uint256.uint256ToBN(n))
