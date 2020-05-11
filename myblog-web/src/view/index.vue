<template>

  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item id="blogName">HC 个人博客</el-menu-item>
      <el-menu-item index="1" @click="home">首页</el-menu-item>
      <el-menu-item index="2" @click="classify" >分类</el-menu-item>
      <el-menu-item index="3" @click="album" >相册</el-menu-item>
      <el-menu-item index="4" @click="about">关于我</el-menu-item>
      <el-menu-item index="5" @click="login">登录</el-menu-item>


        <el-input placeholder="请输入内容" v-model="input" clearable   @keyup.enter.native="queryTitle($event)"></el-input>


    </el-menu>


    <el-menu>
      <router-view></router-view>
    </el-menu>

  </div>

</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                activeIndex: '1',
                input:''
            }

        },
        methods:{
            handleSelect:function(key, keyPath) {
                console.log(key, keyPath);
            },
            home:function(){
                this.activeIndex ='1';
                this.$router.push('/home');
            },
            classify:function () {
                console.log("laile");
                this.activeIndex ='2';
                this.$router.push('/classify');
            },
            album:function () {
                console.log("album");
                this.activeIndex ='3';
                this.$router.push('/album');
            },
            about : function() {
                this.activeIndex ='4';
                this.$router.push('/about');
            },
            login : function() {
                this.activeIndex = "5" ;
                this.$router.push('/login');

            },
            queryTitle:function() {
                console.log(this.input);
                if(this.input.length !=0 || this.input !=null){
                    this.$router.push('/queryTitle/'+ this.input);
                }
            }
        }
    }
</script>

<style scoped>
  .el-menu-demo{
    /*float: left !important;*/
    /*padding:0px 0px 0px 500px !important;*/
 /*   padding-left: 40% !important;
    padding-right: 100px !important;*/
    padding-left: 30%;
  }

  #blogName {
    padding-right:200px;
    /*padding-right: 40%;*/
  }
  .el-input{
    width: 200px;
    padding: 10px 0px 0px 30px ;

  }
</style>
