
<template>
  <div>
    <el-button @click="updateRole">修改权限</el-button>
    <el-table :data='users'>
      <el-table-column prop='username' label='用户名'></el-table-column>
      <el-table-column prop='role' label='权限'></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div>
            <el-button @click="updateRole(scope.row._id)">修改权限</el-button>
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
      users:[]
    };
  },
  created() {
    this.getUsers()
  },
  methods: {
    updateRole(_id){
      this.post('/api/updateRole',{_id,role:3}).then(res=>{
        console.log(res)
      })
    },
    getUsers() {
      this.get('api/users').then(res => {
        this.users=res.data
        console.log(res.data);
      });
    },
  }
};
</script>