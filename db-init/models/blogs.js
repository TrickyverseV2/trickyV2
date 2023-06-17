// /* eslint-disable lines-around-comment */
import { Schema, models, model } from 'mongoose'

const blogModel = new Schema({
  user: {
    type: Object,
    required: true,
    default: {
      uid: 'yyyyy',
      username: '',
      displayName: '',
      profileImage: '',
      region: ''
    }
  },
  // blogId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, required: false },
  locations: { type: Array, required: false },
  isPublished: { type: Boolean, default: false },
  views: {
    type: Array,
    required: false,
    default: [{ id: 'user1', region: 'jaipur,india', profileImage: 'ghj', userName: '' }]
  },
  likes: {
    type: Array,
    required: false,
    default: [{ id: 'user1', region: 'jaipur,india', profileImage: 'ghj', userName: '' }]
  },
  comments: {
    type: Array,
    required: false,
    default: [
      {
        id: 'user1',
        region: 'jaipur,india',
        profileImage: 'ghj',
        userName: '',
        comment: '',
        commentLikes: ''
      }
    ]
  },
  shares: {
    type: Array,
    required: false,
    default: [
      {
        id: 'user1',
        region: 'jaipur,india',
        type: 'whatsapp',
        profileImage: 'ghj',
        userName: ''
      }
    ]
  },
  media: {
    type: Array,
    required: false,
    default: [
      {
        id: 'user1',
        type: 'image' || 'video' || 'ytembed',
        title: '',
        url: '',
        region: 'jaipur,india',
        profileImage: 'ghj',
        userName: ''
      }
    ]
  },
  created: {
    type: String,
    required: false
  },
  updated: {
    type: String,
    required: false
  },
  modificationLogs: { type: Array, default: [] },
  shareUrl: {
    type: String,
    required: false
  },
  activated: { type: Boolean, required: false },
  body: {
    type: String,
    required: false
  },
  linksUsed: {
    type: Array,
    required: false
  }
})

export default models.blogs || model('blogs', blogModel)
