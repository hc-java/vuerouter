<template>

  <el-container>


      <left></left>

      <el-main>
          <h1>简介</h1>

          <hr>

      <!--  <div v-for="item in about">
          <span>姓名：</span>{{item.name}}<br>
          <span>性别：</span>{{item.gender}}<br>
          <span>年龄：</span>{{item.age}}<br>
          <span>专业：</span>{{item.birthday}}<br>
          <span>签名：</span>{{item.introduce}}<br>

        </div>-->

        <span>姓名：</span>{{about.name}}<br>
        <span>年龄：</span>{{about.age}}<br>
        <span>出生年月：</span>{{about.birthday}}<br>
        <span>个性签名：</span>{{about.introduce}}<br>

      </el-main>

  </el-container>


</template>

<script>
  import axios from 'axios'
    export default {
        components: {
            Left:require('../../components/left.vue').default
        },
        name: "about",
        data(){
            return{
                about:[
                    {name:'HC',age:23,birthday:'1997-11-13',introduce:'前端好难搞啊！！！'}
                ]

            }
        },
        created() {
            let _this = this;
            axios.post('http://localhost:8081/about')
                .then(function (response) {
                    console.log(response);
                    _this.about = response.data;
                })
                .catch (function(error) {
                    console.error(error);
                })
        }
    }
</script>

<style scoped>

</style>
