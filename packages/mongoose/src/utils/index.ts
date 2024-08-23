import { Document, Types } from 'mongoose'

export function documentArrayToSet<T extends Document<Types.ObjectId>>(documents: T[]): { [id: string]: T } {
  return documents.reduce<{ [key: string]: T }>((acc, document) => {
    const id = document._id?.toString()
    if (!id) throw 'Failed to convert mongo array to set'

    acc[id] = document
    return acc
  }, {})
}
