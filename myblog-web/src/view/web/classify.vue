<template>


  <!--将components/left.vue放在这里-->
  <el-container>
    <left></left>

    <el-main>
      <div v-for="item in classify" @click="classifyClick(item.classifyName)">
        <el-tag :type="itemType" >{{item.classifyName}}  ({{item.classifyNum}})</el-tag>
      </div>

      <div v-if="showClassify">

        <div v-for="item in classifyTitle" class="classifyTitle">

            <div v-if="item.articleType == classifyNameResult">
             <!-- id:{{item.articleId}} 标签:{{item.articleType}}-->

              <h3 @click='gotoBlogconent(item.articleId,item.articleType)'>{{item.articleName}}</h3>
                <div class="articleTitle" @click='gotoBlogconent(item.articleId,item.articleType)'>
                  {{item.articleTitle}}
                </div>
                <br>
                {{item.articleDate}}
                <a>阅读数:</a>{{item.articleReading}}
                <a>评论数:</a>{{item.articleComment}}

              <hr>
            </div>
        </div>
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


    name: "classify",

        data(){
            return {
                classifyNameResult:'',
                showClassify:false,
                itemType:'success',
                classify:[
                    {classifyName:'java',classifyNum:2},
                    {classifyName:'html',classifyNum:3},
                    {classifyName:'sql',classifyNum:4},

                ],
                classifyTitle:[
                    {
                        articleId:1,
                        articleName :'文章名1',
                        articleTitle:'文章内容1',
                        articleDate:'2019-04-14 01:39:41',
                        articleReading:3,
                        articleComment:3,
                        articleType:'java'
                    },
                    {
                        articleId:2,
                        articleName :'文章名2',
                        articleTitle:'文章内容2',
                        articleDate:'2019-04-14 01:39:41',
                        articleReading:3,
                        articleComment:3,
                        articleType:'html'
                    },
                    {
                        articleId:3,
                        articleName :'文章名3',
                        articleTitle:'文章内容3',
                        articleDate:'2019-04-14 01:39:41',
                        articleReading:3,
                        articleComment:3,
                        articleType:'sql'
                    }
                ]
            }
        },
        methods:{
            classifyClick:function (classifyName) {
                let _this = this;
                console.log(classifyName);
                this.showClassify=true;//只有点击 标签 后，才会显示具体的文章
                this.classifyNameResult=classifyName;

                axios.post('http://localhost:8081/queryArticleClassify',{articleType:classifyName})
                    .then(function(response){
                        console.log(response.data)
                        _this.classifyTitle=response.data;
                    })
                    .catch (function(error) {
                        console.log(error)
                    })
            },
            gotoBlogconent:function(articleId,classifyName) {
                console.log(articleId,classifyName);
                this.$router.push('blogconent/'+articleId+'/'+classifyName);
            }
        },
        created() {
            let _this = this;
            axios.post('http://localhost:8081/queryClassify')
                .then(function (response) {
                    console.log(response);
                          _this.classify = response.data;
                })
                .catch(function (error) {
                console.log(error);
            });

        }
    }
</script>

<style scoped>

  .el-main{
    width:200px;
  }

  .articleTitle{
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    width:200px;
  }

</style>
