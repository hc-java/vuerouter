<template>

  <el-container>


    <!-- Form -->


    <el-dialog title="发布文章" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="文章名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.title" autocomplete="off"  rows="20" cols="20"></el-input>
        </el-form-item>

        <el-form-item label="文章类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择文章类型">
            <el-option label="java" value="java"></el-option>
            <el-option label="sql" value="sql"></el-option>
            <el-option label="html" value="html"></el-option>

          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addArticle()">确 定</el-button>
      </div>
    </el-dialog>



  </el-container>
</template>

<script>
  import axios from 'axios'

    export default {
        name: "add",
        data(){
            return {

                dialogFormVisible: true,
                form: {
                    name: '',
                    title:'',
                    type: ''
                },

                formLabelWidth: '120px'
            }
        },
        methods : {

            addArticle:function () {

                axios.post('http://localhost:8081/addArticle',
                    {articleName : this.form.name,articleTitle:this.form.title,articleType:this.form.type})
                    .then((response)=>{
                        console.log(response)

                        if(response.data =="添加成功"){
                            this.dialogFormVisible=false;
                            alert(response.data);
                            this.$router.push('/queryArticle')
                        }else {
                            alert("添加失败")
                        }
                })
                    .catch ((error)=>{
                        console.log(error);
                    })

            }
        }

    }
</script>

<style scoped>


</style>
