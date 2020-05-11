<template>


  <el-container>


    <left></left>

    <el-main class="container">
      <h2>文章详情页</h2>
     articleId: {{$route.params.articleId}}
      <!--   classifyName: {{$route.params.classifyName}}-->


      <div class="Modular">
        <h3> {{articles.articleName}}</h3>
        <div class="articleTitle">
          <pre>{{articles.articleTitle}}</pre>
        </div>
        {{articles.articleDate}}
        <a>阅读数:</a>{{articles.articleReading}}
        <a>评论数:</a>{{articles.articleComment}}
      </div>









      <!--评论-->

        <!--获取文章的id，根据文章的id 显示相应的评论和回复-->
        <div v-for="(item,index) in Comment" v-if="item.commentArticleId ==$route.params.articleId" class="comment">
             <b>{{item.commentName}}:</b>
          <span class="time">{{item.commentDate}}</span>  <br>
          <!--<span  @click="commentNameFunction(item.commentName)">{{item.commentContent}}</span>-->



          <!-- 评论的Form -->
          <el-button type="text" @click="dialogCacheFunction(item.commentId,item.commentName)">{{item.commentContent}}</el-button>

          <el-dialog title="评论" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="您的姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="您的评论" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="commentNameFunction()">确 定</el-button>
            </div>
          </el-dialog>




          <!--回复-->
          <div v-for="(item2,index2) in Reply" v-if="item2.replyCommentId == item.commentId" class="reply">

            <b>{{item2.replyName}}</b> 回复 <b>{{item2.replyCommentName}}</b> {{item2.replyDate}} <br>
          <!--  <span @click="replyNameFunction(item2.replyName)">{{item2.replyContent}}</span>-->


              <!-- 回复的Form -->
              <el-button type="text" @click="dialogCacheFunction(item2.replyCommentId,item2.replyName)">{{item2.replyContent}}</el-button>

            <el-dialog title="评论" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="您的姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="您的评论" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commentNameFunction()">确 定</el-button>
              </div>
            </el-dialog>


          </div>

        </div>

      <!--留言栏-->
      <div class="messageBoard">
        <el-input v-model="inputName" placeholder="请输入你的姓名" class="inputName"></el-input>
        <el-input type="textarea" v-model="inputContent" placeholder="请输入对文章的看法" class="inputContent"></el-input>
        <el-button type="primary" @click="commentArticle">提交</el-button>
      </div>

    </el-main>


    <el-main class="right">
      <h3>分类</h3>

      <el-tag>{{classify.classifyName}}</el-tag>
    </el-main>



  </el-container>
</template>

<script>
    import Left from "../../components/left";
    import axios from 'axios'
    export default {

        name: "blogconent",
        components: {Left},

        data(){
            return{

                articles: [
                    {
                        articleId:1,
                        articleName :'文章名',
                        articleTitle:'文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
                        articleDate:'2020-01-01',
                        articleReading:2,
                        articleComment:2,
                        articleType:'html'
                    }
                    ],
                //分类页
                classify: [
                    {classifyName: 'java'}

                ],
                //评论
                Comment:[
                   //评论内容
                   {commentId:1,commentName:'张三',commentContent:'大家好,我是张三',commentDate:'2020-01-03 01:39:41',commentArticleId:1},
                    {commentId:2,commentName:'李四',commentContent:'大家好,我是李四',commentDate:'2020-01-04 01:39:41',commentArticleId:1},
                    {commentId:3,commentName:'王五',commentContent:'大家好,我是王五',commentDate:'2020-01-05 01:39:41',commentArticleId:1},
                    {commentId:4,commentName:'赵六',commentContent:'大家好,我是赵六',commentDate:'2020-01-06 01:39:41',commentArticleId:1},
                    {commentId:5,commentName:'王二',commentContent:'大家好,我是王二',commentDate:'2020-01-07 01:39:41',commentArticleId:1}
                ],
                Reply:[
                    //回复内容
                    {replyId:1,replyName:'zhang',replyCommentName:'张三',replyContent:'你好，张三，我是zhang',replyDate:'2020-01-02 01:39:41',replyCommentId:1,replyArticleId:1}
                ],
                //留言
                inputName:'',
                inputContent:'',

                //dialog对话框
                dialogFormVisible: false,
                form: {
                    name: '',
                    content: ''
                },
                //回复的表单
        /*        form2: {
                    name: '',
                    content: ''
                },*/
                formLabelWidth: '120px',
                //dialog对话框 临时存储的 id name，因为弹出的对话框 点击确定 无法准确获取 想要的评论的id name
                id:'',
                name:''

            }
        },
        methods:{
            //评论文章
            commentArticle:function(){

                if(this.inputName =='' || this.inputName == null){
                    this.$alert('姓名不能为空', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                }else{
                    if(this.inputContent =='' || this.inputContent == null){
                        this.$alert('内容不能为空', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    }else {
                        // console.log(this.inputName);
                        // console.log(this.inputContent);
                        //console.log(this.$route.params.articleId)  //当前文章的id
                        //这里写ajax,把对文章的评论的数据给 后台
                        axios.post('http://localhost:8081/addCommentToArticle',
                            {commentName:this.inputName,commentContent:this.inputContent,commentArticleId:this.$route.params.articleId})
                            .then(response=>{
                                this.$alert('添加成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$message({
                                            type: 'info',
                                            message: `action: ${ action }`
                                        });
                                    }
                                });
                            })
                            .catch (error => {
                                console.log(error)
                            });

                        window.location.reload();

                    }
                }
            },

            //临时赋值
            dialogCacheFunction:function(id,name){
              this.id=id;
              this.name=name;

                this.dialogFormVisible =true;
            },

            //一级回复
            commentNameFunction:function(){
                /*console.log(commentName)
                console.log(this.form.name)
                console.log(this.form.content)*/

               /* console.log(this.id);
                alert(this.name);*/
                //这里写一个添加的 ajax

                    axios.post('http://localhost:8081/addReplyToComment',
                        {replyName:this.form.name,replyCommentName:this.name,replyContent:this.form.content,replyCommentId:this.id,replyArticleId:this.$route.params.articleId})
                        .then(response => {
                            this.dialogFormVisible=false;
                            alert(response.data)
                            window.location.reload();
                        })
                        .catch (error => {
                            console.log(error);
                        })




            },
            //二级回复
   /*         replyNameFunction:function (replyName) {
                /!*alert(replyName)*!/
                this.$prompt('回复'+replyName, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '评论格式不正确'
                }).then(({ value }) => {
                    //这里写ajax 把对二级评论的回复的数据给后台，本质上算三级评论，但是这里把它当成二级评论，它的上一级评论是 一级评论
                    this.$message({
                        type: 'success',
                        message: '你的评论是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }*/
        },
        created() {
            let _this=this;
            //得到被点击的文章id,然后查询，并送到上面去
            // alert("id="+this.$route.params.articleId)
         /*   axios.post('http://localhost:8081/selectArticleByPrimaryKey',{articleId :this.$route.params.articleId})
                .then(function (response) {

                    _this.articles=response.data;

                    _this.classify.classifyName=response.data.articleType;

                })
                .catch (function(error) {
                    console.log(error)
                });*/
         axios.all([
             axios.post('http://localhost:8081/selectArticleByPrimaryKey',{articleId :this.$route.params.articleId}),
             axios.post('http://localhost:8081/queryCommentToArticle', {commentArticleId:this.$route.params.articleId}),
             axios.post('http://localhost:8081/queryReplyToComment', {replyArticleId:this.$route.params.articleId}),
             axios.post('http://localhost:8081/updateCommentReading', {articleId:this.$route.params.articleId})


         ])
             .then(axios.spread((responseArticle,responseComment,responseReply,responseCommentReading)=>{

                 _this.articles=responseArticle.data;
                 _this.classify.classifyName=responseArticle.data.articleType;


                 _this.Comment=responseComment.data;

                 _this.Reply=responseReply.data;



                  _this.articles.articleComment=responseComment.data.length+responseReply.data.length;

                  //修改文章的评论数
                 axios.post('http://localhost:8081/updateArticleComment', {articleId:this.$route.params.articleId,articleComment: _this.articles.articleComment})


                 // console.log(responseCommentReading);

             }));



        }
    }
</script>

<style scoped>
.articleTitle{
  height: 300px;
  /*overflow:auto !important;*/
}
.time{
  float: right;
}
 .comment{
   position: relative;
   top: 20px;
   margin-bottom: 20px;

 }
  .reply{
    position: relative;
    left: 40px;
  }

.el-container ::-webkit-scrollbar {
 /* display: none;*/
  width: 0 !important
}

  .messageBoard{
    margin-bottom: 20px;
  }

pre{
  white-space:pre-wrap;
  white-space:-moz-pre-wrap;

  white-space:-o-pre-wrap;
  word-wrap:break-word;
}
</style>
