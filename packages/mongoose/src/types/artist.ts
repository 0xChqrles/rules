import { Document, Types } from 'mongoose'

export interface Artist {
  name: string
  slug: string
  userId?: Types.ObjectId
}

export interface ArtistDocument extends Artist, Document {}
