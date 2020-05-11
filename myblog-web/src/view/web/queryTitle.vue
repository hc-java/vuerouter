<template>


  <el-container>
    <left></left>



      <!--发布的文章都会放在这里，点击文字名字或者文章内容，可以查看文章详情-->
      <el-main class="container">
        <!--input: {{$route.params.input}}-->

        <h2>文章详情页</h2>
        <div v-for="(item,index) in articles" class="Modular">

          <h3 @click='gotoBlogconent(item.articleId,item.classifyName)'>{{item.articleName}}</h3>

          <div class="articleTitle" @click='gotoBlogconent(item.articleId,item.classifyName)'>
            {{item.articleTitle}}
          </div>
          <br>
          {{item.articleDate}}
          <a>阅读数:</a>{{item.articleReading}}
          <a>评论数:</a>{{item.articleComment}}

        </div>

      </el-main>

  </el-container>
</template>

<script>
  import axios from 'axios'
    export default {
        components: {
            Left:require('../../components/left.vue').default
        },
        name: "queryTitle",
        data(){
            return {
                //文章详情页
                articles : [
                    {
                        articleId:1,
                        articleName :'文章名',
                        articleTitle:'文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
                        articleDate:'2019-04-14 01:39:41',
                        articleReading:1,
                        articleComment:1,
                        classifyName:'java'
                    }]
            }
        },
        methods:{
            gotoBlogconent:function(articleId,classifyName) {
                console.log(articleId,classifyName);
                this.$router.replace('../blogconent/'+articleId+'/'+classifyName);
            }
        },
        created() {
            console.log(this.$route.params.input)
            axios.post('http://localhost:8081/queryInputTitle',{articleName : this.$route.params.input})
                .then((response)=>{
                console.log(response.data);
                if(response.data.length ==0){
                    this.articles=[];
                    //alert("没有该文章内容")
                }else {
                    this.articles=response.data;
                }
            })
                .catch (function(error) {
                    console.log(error);
                })
        }
    }
</script>

<style scoped>

</style>
