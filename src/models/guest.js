const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Guest = new Schema({
  fullName: { type: String, maxLength: 128 },
  cmnd: { type: String },
  address: { type: Object, default: {} },
  phone: { type: String, default: '' },
  totalMoney: { type: Number, default: 0 },
  bought: [{ product: { type: Schema.Types.ObjectId, ref: 'product' }, quantity: { type: Number, default: 1 } }],
  slug: { type: String, slug: "fullName" },
  text: { type: String, default: ""}
}, {
  timestamps: true
})

module.exports = mongoose.model('guest', Guest)