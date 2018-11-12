import mongoose, { Schema } from 'mongoose'

const tempsensorSchema = new Schema({
  time: {
    type: String
  },
  value: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tempsensorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      time: this.time,
      value: this.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Tempsensor', tempsensorSchema)

export const schema = model.schema
export default model
