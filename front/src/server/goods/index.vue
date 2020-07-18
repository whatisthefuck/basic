
<template>
  <div>
    <el-button @click="addGoods">添加商品</el-button>
    <el-table :data="goodsList">
      <el-table-column prop='title' label='标题'></el-table-column>
      <el-table-column prop='price' label='价格'></el-table-column>
      <el-table-column label='操作'>
        <template slot-scope="scope">
          <div>
            <el-button @click='getGoodsDetail(scope.row._id)'>详情</el-button>
            <el-button @click="delGoods(scope.row._id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      goodsList:[]
    };
  },
  created() {
    this.getGoods()
  },
  methods: {
    addGoods(){
      this.post('/api/addGoods',{title:'测试商品',price:100}).then(res=>{
        console.log(res,'00000');
      })
    },
    getGoods(){
      this.get('/api/getGoods',{}).then(res=>{
        console.log(res,'111')
        this.goodsList=res.data
      })
    },
    getGoodsDetail(_id){
      this.get('/api/getGoodsDetail',{_id}).then(res=>{
        console.log(res,'00000');
      })
    },
    delGoods(_id){
      this.post('/api/delGoods',{_id}).then(res=>{
        console.log(res,'00000');
        this.getGoods()
      })
    },
  }
};
</script>