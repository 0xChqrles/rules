import { encode } from '..'
import { WITHDRAW_MESSAGE } from '../constants'
import { MessageContext, ParsedMessage } from '../types'

export function parseMessage(context: MessageContext, payload: string[]): ParsedMessage | null {
  switch (context) {
    case 'starkgate':
      if (payload[0] !== WITHDRAW_MESSAGE) return null

      return {
        type: 'withdraw',
        l1Recipient: payload[1],
        amount: encode.encodeUint256({ low: payload[2], high: payload[3] }),
      }
  }
}
