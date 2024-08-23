import { Schema, model } from 'mongoose'

import { ArtistDocument } from '../../types/artist'

const artistSchema = new Schema<ArtistDocument>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default model('Artist', artistSchema, 'artists')
