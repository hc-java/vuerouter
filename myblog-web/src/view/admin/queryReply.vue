<template>
  <el-container>
    <el-main>

      <!-- 动态标签页 -->
      <el-tabs v-model="editableTabsValue" type="card"
               closable @tab-remove="removeTab"> <el-tab-pane
        v-for="(item, index) in editableTabs" :key="item.name"
        :label="item.title" :name="item.name">

        <!-- 模糊查询的input -->
        <el-input placeholder="回复者姓名" v-model="name" name="name" clearable style="width:30%;"> </el-input>
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
                  <pre>{{ props.row.replyContent }}</pre>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="回复 ID"
            prop="replyId">
          </el-table-column>
          <el-table-column
            label="回复者姓名"
            prop="replyName">
          </el-table-column>
          <el-table-column
            label="被回复者姓名"
            prop="replyCommentName">
          </el-table-column>
          <el-table-column
            label="回复时间"
            prop="replyDate">
          </el-table-column>
          <el-table-column
            label="父评论"
            prop="replyCommentId">
          </el-table-column>
          <el-table-column
            label="文章ID"
            prop="replyArticleId">
          </el-table-column>



          <el-table-column
            label="操作"
            prop="desc">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <!--form-->
              <el-dialog title="修改回复" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="回复者名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="回复内容" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.title" autocomplete="off"  rows="20" cols="20"></el-input>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateReply()">确 定</el-button>
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
        name: "queryReply",

        data(){
            return{
                name:'',
                /* 标签页触发器 */
                editableTabsValue: '1',
                editableTabs: [{
                    title:'queryReply',
                    name: '1',
                    content: ''
                }],
                tabIndex: 1,
                tableData: [{
                    replyId:1,
                    replyName :'张三',
                    replyCommentName:'李四',
                    replyContent:'文章内容文章内容文内容文章内容文章内容文章内容',
                    replyDate:'2019-04-14 01:39:41',
                    replyCommentId:1,
                    replyArticleId:1
                },
                    {
                        replyId:2,
                        replyName :'李四',
                        replyCommentName:'张三',
                        replyContent:'你好，张三',
                        replyDate:'2019-04-14 01:39:41',
                        replyCommentId:1,
                        replyArticleId:1
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
                    axios.post('http://localhost:8081/queryInputTitleByReply',{replyName:this.name}),
                    axios.post('http://localhost:8081/queryAllReplyNum',{replyName:this.name})
                ])
                    .then(axios.spread(function(responseInputTitleByReply,responseAllReplyNum){
                        console.log(responseInputTitleByReply)
                        __this.tableData=responseInputTitleByReply.data;
                        //评论的总数

                        __this.total =responseAllReplyNum.data;
                    }));

            },
            /*操作*/
            handleEdit:function(index, row) {


                this.id=row.replyId;
                this.form.name =row.replyName;
                this.form.title=row.replyContent;
                this.dialogFormVisible=true;

            },
            updateReply:function() {
                axios.post('http://localhost:8081/updateReply',{replyId :this.id,replyName:this.form.name,replyContent : this.form.title})
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
                    axios.post('http://localhost:8081/delReply',{replyId :row.replyId})
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
                axios.post('http://localhost:8081/handleSizeChangeByReply',{currentPage :this.currentPage,pageSize : val,replyName:this.name})
                    .then(response=> {
                        this.tableData=response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            handleCurrentChange:function(val) {

                this.currentPage = val;
                axios.post('http://localhost:8081/handleSizeChangeByReply',{currentPage :val,pageSize : this.pageSize,replyName:this.name})
                    .then(response=> {
                        //console.log(response);
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

            const _this=this;
            axios.all([
                axios.post('http://localhost:8081/queryAllReply',{replyName:''}),
                axios.post('http://localhost:8081/queryAllReplyNum',{replyName:''})
            ])
                .then(axios.spread(function(responseAllReply,responseAllReplyNum){
                    _this.tableData=responseAllReply.data;
                    //评论的总数

                    _this.total =responseAllReplyNum.data;
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
