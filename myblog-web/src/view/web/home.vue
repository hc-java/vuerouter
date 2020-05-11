<template>




    <el-container>


      <left></left>

<!--发布的文章都会放在这里，点击文字名字或者文章内容，可以查看文章详情-->
      <el-main class="container" >
        <h2>文章首页</h2>
        <div v-for="(item,index) in articles" class="Modular">

         <h3 @click='gotoBlogconent(item.articleId,item.articleType)'>{{item.articleName}}</h3>

          <div class="articleTitle" @click='gotoBlogconent(item.articleId,item.articleType)'>
            <pre>{{item.articleTitle}}</pre>
          </div>
          <br>
          {{item.articleDate}}
          <a>阅读数:</a>{{item.articleReading}}
          <a>评论数:</a>{{item.articleComment}}

        </div>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

      </el-main>


      <el-main class="right">
        <h3>分类</h3>
        <div v-for="item in classify" class="classify">
          <el-tag>{{item.classifyName}}</el-tag>
        </div>

      </el-main>


    </el-container>



</template>

<script>
  import  axios from 'axios'

    export default {
        components: {
            Left:require('../../components/left.vue').default
        },
        name: "home",
        data(){
            return{

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
                    },
                    {
                        articleId:2,
                        articleName :'文章名2',
                        articleTitle:'文章内容2',
                        articleDate:'2019-04-14 01:39:41',
                        articleReading:2,
                        articleComment:2,
                        classifyName:'html'

                    },
                    {
                        articleId:3,
                        articleName :'文章名3',
                        articleTitle:'文章内容3',
                        articleDate:'2019-04-14 01:39:41',
                        articleReading:3,
                        articleComment:3,
                        classifyName:'sql'

                    }
                ],
                //分类页
                classify: [
                    {classifyName: 'java'},
                    {classifyName:'数据库'},
                    {classifyName:'html'}
                ],
                //分页
                currentPage: 1,//当前页
                total:10,                //总数量,由 mounted: function ()赋值
                pageSize:2

            }
        },
        methods:{
            gotoBlogconent:function(articleId,classifyName) {
                //console.log(articleId,classifyName);
                this.$router.push('blogconent/'+articleId+'/'+classifyName);
            },
            //分页
            handleSizeChange:function(val) {
                //当前页的可以放几条数据
                this.pageSize=val;

                axios.post('http://localhost:8081/handleSizeChange',{currentPage :this.currentPage,pageSize : val,articleName:''})
                    .then(response=> {
                        console.log(response.data);
                        this.articles=response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleCurrentChange:function(val) {
                //当前是第几页
                this.currentPage=val;

                axios.post('http://localhost:8081/handleSizeChange',{currentPage :val,pageSize : this.pageSize,articleName:''})
                    .then(response=> {

                        this.articles=response.data;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        created() {
            const _this=this;
            axios.all([
                // axios.post('http://localhost:8081/about'),
                axios.post('http://localhost:8081/queryArticle',{articleName:''}),
                axios.post('http://localhost:8081/queryClassify'),
                axios.post('http://localhost:8081/queryArticleCount',{articleName:''})
            ])
            .then(axios.spread(function (responseArticles,responseClassify,responseQueryArticleCount) {
                // 三个请求现在都执行完成后

                _this.articles=responseArticles.data;
                _this.classify=responseClassify.data;

                _this.total =responseQueryArticleCount.data;

                // console.log(responseHome.data+"---"+ responseArticles.data+"---"+responseClassify.data);
            }));


        }
    }
</script>

<style scoped>
  ::-webkit-scrollbar{
    display: none;
  }

  pre{
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    width:300px;
    /*background:#ccc;*/
  }


</style>
