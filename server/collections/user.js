const {
  User
} = require('../db.js')
const bcrypt = require('bcryptjs')
const ObjectID = require('mongodb').ObjectID;

const jwt = require('jsonwebtoken')

const secretKey = "密钥"
exports.user = {
  async getUsers(req, res) {
    const user = await User.find()
    res.send(user)
  },
  async getProfile(req, res) {
    if (!req.user) {
      return res.send('wrong token')
    }
    res.send(req.user)
  },
  async register(req, res) {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    })
    res.send(user)
  },
  async login(req, res) {
    console.log(req.body);
    const user = await User.findOne({
      username: req.body.username
    })
    if (!user) {
      return res.status(422).send({
        message: "用户名不存在"
      })
    }
    const isPass = bcrypt.compareSync(
      req.body.password,
      user.password
    )
    if (!isPass) {
      return res.status(422).send({
        message: "密码无效"
      })
    }
    const token = jwt.sign({
      id: String(user._id),
    }, secretKey)
    res.send({
      user,
      token,
    })
  },
  async updateRole(req,res){
    if(!req.isAdmin){
      return res.send('无权限')
    }
    let user
    try {
      user=await User.updateOne({_id:ObjectID(req.body._id)},{$set:{role:req.body.role}})
    } catch (error) {
      console.log(error)
      return res.send('出现错误')
    }
    res.send(user)
  }
}