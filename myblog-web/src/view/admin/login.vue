<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
    <el-form-item label="账号" prop="username">
      <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import axios from 'axios'
    export default {
        name: "login",
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                userToken: '', //token

                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {

                let _this=this;

                //console.log(_this.ruleForm);
                axios.post('http://localhost:8081/login?',_this.ruleForm)
                    .then(function (response) {
                        //console.log(response.data);
                        if(response.data.token !=null){
                            //登录成功后，JWT给的token
                            //console.log(response.data.token);

                            //把token存储起来，并取名为 mytoken
                            var storage = window.sessionStorage;
                            storage.setItem("mytoken", response.data.token);

                            _this.$router.push('/main');//登录成功后，跳转到主页面
                        }else {
                            alert("账号、密码错误！")
                        }

                    }).catch(function (error) {
                    console.log(error);
                });



            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>
  .el-form{
    width: 40%;
    margin: 0 auto;
  }

</style>
