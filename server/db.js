const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
mongoose.connect('mongodb://localhost:27017/mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
})
const userModel = new mongoose.Schema({
  username: {
    type: String,
    unique:true
  },
  password: {
    type: String,
    set(val){
      return bcrypt.hashSync(val,10)
    }
  },
  role:{
    type:Number,
    default:2,
  }
})
const goodsModel = new mongoose.Schema({
  username:{
    type: String,
    required:true,
  },
  title: {
    type: String,
    required:true,
  },
  price: {
    type: Number,
    required:true,
  },
})
const User = mongoose.model('User', userModel)
const Goods = mongoose.model('Goods', goodsModel)
// User.db.dropCollection('users')
// Goods.db.dropCollection('Goodss')
module.exports = {
  User,
  Goods
}