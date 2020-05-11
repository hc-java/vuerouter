<template>
  <el-container>
    <el-main>

      <!-- 动态标签页 -->
      <el-tabs v-model="editableTabsValue" type="card"
               closable @tab-remove="removeTab"> <el-tab-pane
        v-for="(item, index) in editableTabs" :key="item.name"
        :label="item.title" :name="item.name">

        <!-- 模糊查询的input -->
        <el-input placeholder="文章名" v-model="name" name="name" clearable style="width:30%;"> </el-input>
        <template>
          <el-button type="primary" @click="showConcreteContent()" >查询</el-button>
        </template>

        <!--可以显示的隐藏的tab-->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">

                <el-form-item label="评论内容:">
                  <pre>{{ props.row.commentContent }}</pre>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="评论 ID"
            prop="commentId">
          </el-table-column>
          <el-table-column
            label="评论者姓名"
            prop="commentName">
          </el-table-column>
          <el-table-column
            label="评论时间"
            prop="commentDate">
          </el-table-column>
          <el-table-column
            label="被评论的文章ID"
            prop="commentArticleId">
          </el-table-column>



          <el-table-column
            label="操作"
            prop="desc">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <!--form-->
              <el-dialog title="修改评论" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="评论名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="评论内容" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.title" autocomplete="off"  rows="20" cols="20"></el-input>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateArticle()">确 定</el-button>
                </div>
              </el-dialog>

              <br>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>

          </el-table-column>
        </el-table>

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

      </el-tab-pane>
      </el-tabs>
    </el-main>

  </el-container>
</template>

<script>
    import  axios from 'axios'

    var handleSizeChangeVal="";//每页多少条
    var handleCurrentChangeVal="";//当前页

    export default {
        name: "queryComment",

        data(){
            return{
                name:'',
                /* 标签页触发器 */
                editableTabsValue: '1',
                editableTabs: [{
                    title:'queryComment',
                    name: '1',
                    content: ''
                }],
                tabIndex: 1,
                tableData: [{
                    commentId:1,
                    commentName :'张三',
                    commentContent:'文章内容文章内容文内容文章内容文章内容文章内容',
                    commentDate:'2019-04-14 01:39:41',
                    commentArticleId:1
                },
                    {
                        commentId:2,
                        commentName :'李四',
                        commentContent:'文章内容文章内容文内容文章内容文章内容文章内容',
                        commentDate:'2019-04-14 01:39:41',
                        commentArticleId:1
                    }],
                //分页
                currentPage: 1,//当前页
                total:10,                //总数量,由 mounted: function ()赋值
                pageSize:2,
                //修改的弹出框
                dialogFormVisible: false,
                form: {
                    name: '',
                    title:''
                },
                formLabelWidth: '120px',
                id:''

            }
        },
        methods:{
            showConcreteContent:function(event){

                const __this = this;
                axios.all([
                    axios.post('http://localhost:8081/queryInputTitleByComment',{commentName:this.name}),
                    axios.post('http://localhost:8081/queryAllCommentNum',{commentName:this.name})
                ])
                    .then(axios.spread(function(responseInputTitleByComment,responseAllCommentNum){
                        console.log(responseInputTitleByComment)

                        __this.tableData=responseInputTitleByComment.data;
                        //评论的总数

                        __this.total =responseAllCommentNum.data;
                    }));

            },
            /*操作*/
            handleEdit:function(index, row) {


                this.id=row.commentId;
                this.form.name =row.commentName;
                this.form.title=row.commentContent;
                this.dialogFormVisible=true;

            },
            updateArticle:function() {
                //var _this = this;
                axios.post('http://localhost:8081/updateComment',{commentId :this.id,commentName:this.form.name,commentContent : this.form.title})
                    .then(response=> {
                        console.log(response);
                        this.dialogFormVisible=false;

                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleDelete:function(index, row) {

                this.$confirm('永久删除该文章及其相关回复信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8081/delComment',{commentId :row.commentId})
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    window.location.reload();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //分页
            handleSizeChange:function(val) {
                this.pageSize=val;
                axios.post('http://localhost:8081/handleSizeChangeByComment',{currentPage :this.currentPage,pageSize : val,commentName:this.name})
                    .then(response=> {
                        this.tableData=response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            handleCurrentChange:function(val) {

                this.currentPage = val;
                axios.post('http://localhost:8081/handleSizeChangeByComment',{currentPage :val,pageSize : this.pageSize,commentName:this.name})
                    .then(response=> {
                        console.log(response)

                        this.tableData=response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            },
            removeTab:function(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        },
        created() {
            //将评论表的所有内容都显示出来

     /*       axios({
                method: 'get',
                url: 'http://localhost:8081/getMessage',
              headers : {
            token:window.sessionStorage.getItem("mytoken")
        }*/



               const _this=this;
               axios.all([
                   axios.post('http://localhost:8081/queryAllComment',{commentName:''}),
                   axios.post('http://localhost:8081/queryAllCommentNum',{commentName : ''})

                  ])
                   .then(axios.spread(function(responseAllComment,responseAllCommentNum){
                       _this.tableData=responseAllComment.data;
                        //评论的总数
                       _this.total =responseAllCommentNum.data;
            }));


        }
    }
</script>

<style scoped>
  ::-webkit-scrollbar{
    display: none;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
