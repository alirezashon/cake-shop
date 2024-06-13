/** @format */

import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
  email: String,
  name: String,
  nationalCode: String,
  information: [
    {
      address: String,
      houseNumber: Number,
      houseUnit: Number,
      zipCode: Number,
      lat: Number,
      long: Number,
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  seens: [
    {
      type: Date,
      default: Date.now,
    },
  ],
  time: { type: Date, default: Date.now },
})

// Pre-save middleware to update the 'seens' field
profileSchema.pre('save', function (next) {
  const profile = this as any
  const oneHour = 60 * 60 * 1000 // One hour in milliseconds
  const currentTime = new Date()

  if (
    profile.seens.length === 0 ||
    currentTime.getTime() -
      new Date(profile.seens[profile.seens.length - 1]).getTime() >
      oneHour
  ) {
    profile.seens.push(currentTime)
  }

  next()
})

const Profile =
  mongoose.models.Profile || mongoose.model('Profile', profileSchema)
export default Profile
