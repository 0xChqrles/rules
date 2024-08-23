import { getAddress } from 'ethers'
import { encode, getChecksumAddress } from 'starknet'

export function isEthereumAddress(address: string = '') {
  return address.match(/^0x[0-9a-fA-F]{40}$/)
}

export function isStarknetAddress(address: string = '') {
  return address.match(/^0x[0-9a-fA-F]{64}$/)
}

export function checksum(address: string = '') {
  if (address.match(/^0x[0-9a-fA-F]{1,40}$/)) {
    return getAddress(encode.addHexPrefix(encode.removeHexPrefix(address).padStart(40, '0')))
  } else if (address.match(/^0x[0-9a-fA-F]{41,64}$/)) {
    return getChecksumAddress(encode.addHexPrefix(encode.removeHexPrefix(address).padStart(64, '0')))
  }

  throw 'Invalid address'
}
