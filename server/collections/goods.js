const {
  Goods
} = require('../db.js')

exports.goods={
  async addGoods(req, res) {
    if (!req.user) {
      return res.send('用户不存在')
    }
    const goods = await Goods.create({
      username: req.user.username,
      title: req.body.title,
      price: req.body.price,
    })
    res.send(goods)
  },
  async getGoods(req, res){
    if (!req.user) {
      return res.send('用户不存在')
    }
    const goods = await Goods.find({
      username:req.user.username
    })
    res.send(goods)
  },
  async getGoodsDetail(req,res){
    const goods = await Goods.find({
      _id:ObjectID(req.query._id)
    })
    res.send(goods)
  },
  async delGoods(req,res){
    if (!req.user) {
      return res.send('用户不存在')
    }
    const goods = await Goods.remove({
      _id:ObjectID(req.body._id)
    })
    res.send('删除成功')
  },
}