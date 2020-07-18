const {
  User,
  Goods
} = require('./db')


const jwt = require('jsonwebtoken')

const secretKey = "密钥"

const express = require('express')

const ObjectID = require('mongodb').ObjectID;

const app = express()
var bodyParser = require('body-parser');

//商品
const { goods } = require('./collections/goods')
const { user } = require('./collections/user')
app.use(bodyParser.urlencoded({
  extended: true
}));
//token验证中间件
const auth = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization.split(' ').pop())
    const {
      id
    } = jwt.verify(token, secretKey)
    console.log(jwt.verify(token, secretKey));
    console.log('id', id)
    req.user = await User.findById(id)
  } catch {
    req.user = false
  }
  next()
}
//判断是否是admin
const isAdmin = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization.split(' ').pop())
    const {
      id
    } = jwt.verify(token, secretKey)
    console.log(jwt.verify(token, secretKey));
    console.log('id', id)
    const { role } = await User.findById(id)
    if (role == 3) {
      req.isAdmin = true
    }else {
      req.isAdmin = false
    }
  } catch {
    req.isAdmin = false
  }
  next()
}

//获取用户列表
app.get('/api/users',isAdmin, user.getUsers)
//用户获取个人信息
app.get('/api/profile', auth, user.getProfile)
//注册账号
app.post('/api/register', user.register)
//用户登录
app.post('/api/login', user.login)
//修改用户权限
app.post('/api/updateRole',isAdmin,user.updateRole)


//商家添加商品
app.post('/api/addGoods', auth, goods.addGoods)
//商家获取商品
app.get('/api/getGoods', auth, goods.getGoods)
//获取单个商品详情
app.get('/api/getGoodsDetail', goods.getGoodsDetail)
//商家删除商品
app.post('/api/delGoods', auth, goods.delGoods)

app.listen(3001, () => {
  console.log('http://localhost:3001');
})