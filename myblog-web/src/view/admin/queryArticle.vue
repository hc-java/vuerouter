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

                <el-form-item label="文章内容:">
                  <pre>{{ props.row.articleTitle }}</pre>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="文章 ID"
            prop="articleId">
          </el-table-column>
          <el-table-column
          label="文章名称"
          prop="articleName">
        </el-table-column>
          <el-table-column
            label="发布时间"
            prop="articleDate">
          </el-table-column>
          <el-table-column
            label="阅读数"
            prop="articleReading">
          </el-table-column>
          <el-table-column
            label="评论数"
            prop="articleComment">
          </el-table-column>
          <el-table-column
            label="标签"
            prop="articleType">
          </el-table-column>


          <el-table-column
            label="操作"
            prop="desc">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <!--form-->
              <el-dialog title="修改文章" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="文章名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="文章内容" :label-width="formLabelWidth">
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
        name: "queryArticle",

        data(){
            return{
                name:'',
                /* 标签页触发器 */
                editableTabsValue: '1',
                editableTabs: [{
                    title:'queryArticle',
                    name: '1',
                    content: ''
                }],
                tabIndex: 1,
                tableData: [{
                    articleId: '12987122',
                    articleName: '好滋好味鸡蛋仔',
                    articleTitle: '江浙小吃、小吃零食',
                    articleDate: '荷兰优质淡奶，奶香浓而不腻',
                    articleReading: '上海市普陀区真北路',
                    articleComment: '王小虎夫妻店',
                    articleType: '10333'
                },
                    {
                        articleId:1,
                        articleName :'文章名',
                        articleTitle:'文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
                        articleDate:'2019-04-14 01:39:41',
                        articleReading:1,
                        articleComment:1,
                        articleType:'java'
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
            //分页
            handleSizeChange:function(val) {

                this.pageSize=val;
                 axios.post('http://localhost:8081/handleSizeChange',{currentPage :this.currentPage,pageSize : val,articleName:this.name})
                     .then(response=> {
                         this.tableData=response.data;
                     })
                     .catch(function (error) {
                         console.log(error);
                     });

            },
            handleCurrentChange:function(val) {

                this.currentPage = val;
                axios.post('http://localhost:8081/handleSizeChange',{currentPage :val,pageSize : this.pageSize,articleName:this.name})
                    .then(response=> {
                        this.tableData=response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                // window.location.href="showSowingDateInformation_currentPage?handleCurrentChangeVal="+val;

            },
            showConcreteContent:function(event){

                const __this = this;
                axios.all([
                    axios.post('http://localhost:8081/queryInputTitle',{articleName:this.name}),
                    axios.post('http://localhost:8081/queryArticleCount',{articleName:this.name})
                ])
                    .then(axios.spread(function(responseInputTitle,responseArticleCount){
                        console.log(responseInputTitle)
                        __this.tableData=responseInputTitle.data;
                        //评论的总数

                        console.log(responseArticleCount)
                        __this.total =responseArticleCount.data;
                    }));

            /*  axios.post('http://localhost:8081/queryInputTitle',{articleName:this.name})
                  .then(response=>{
                      // console.log(response.data.length);
                      this.tableData=response.data;
                      this.total = response.data.length;

                  })
                  .catch(error => {
                      console.log(error)
                  })*/

            },
            /*操作*/
            handleEdit:function(index, row) {

                this.id=row.articleId;
                this.form.name =row.articleName;
                this.form.title=row.articleTitle;
                this.dialogFormVisible=true;

            },
            updateArticle:function() {
                axios.post('http://localhost:8081/updateArticle',{articleId :this.id,articleName:this.form.name,articleTitle : this.form.title})
                    .then(response=> {
                        // this.tableData=response.data;
                        // alert(response)
                        alert(response.data);
                        this.dialogFormVisible=false;
                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleDelete:function(index, row) {
                this.$confirm('永久删除该文章及其相关信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8081/delArticle',{articleId :row.articleId,articleType:row.articleType})
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

            const  _this = this;
            axios.all([

                axios.post('http://localhost:8081/queryArticle',{articleName:''}),
                axios.post('http://localhost:8081/queryArticleCount',{articleName:''})
            ])
                .then(axios.spread ((responseQueryArticle,responseQueryArticleCount) => {
                    //console.log(responseQueryArticle.data);
                    this.tableData=responseQueryArticle.data;
                    _this.total =responseQueryArticleCount.data;
                }));

        }
    }
</script>

<style scoped>
  ::-webkit-scrollbar {
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
