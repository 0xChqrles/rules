import { hash, uint256 } from 'starknet'

import { Uint256 } from '../types'
import { encodeShortString } from './encode'
import { Seasons } from '../constants'

interface CardModel {
  artistName: string
  season: number
  scarcityId: number
}

interface Card extends CardModel {
  serialNumber: number
}

export function getCardTokenId({ artistName, season, scarcityId, serialNumber }: Card): Uint256 {
  return {
    low: getCardModelId({ artistName, season, scarcityId }).toString(),
    high: `${serialNumber}`,
  }
}

export function getCardModelId({ artistName, season, scarcityId }: CardModel) {
  const fullId = hash.computeHashOnElements([encodeShortString(artistName), season, scarcityId])

  return uint256.bnToUint256(fullId).low
}

export function isLowSerial(serialNumber: number, season: number, scarcityId: number) {
  return serialNumber <= Seasons[season][scarcityId].maxLowSerial
}
