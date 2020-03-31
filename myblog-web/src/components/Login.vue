<template>
  <div>
    {{msg}}
      <table>
        <tr>
          <td>id</td>
          <td>name</td>
          <td>password</td>
        </tr>

        <tr v-for="item in users">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.password}}</td>
        </tr>
      </table>

  </div>
</template>

<script>

    import axios from 'axios'
    export default {
        name: "Login",
        data(){
            return {
                msg:'Login ....',
                users : [
                    {
                        id :1,
                        name :'hc',
                        password:'123'
                    },
                    {
                        id: 2,
                        name:'lisi',
                        password :'456'
                    },
                    {
                        id :3,
                        name :'wangwu',
                        password:'789'
                    }
                ]
            }
        },
        created() {

            axios.post('http://localhost:8081/test')
                 .then(function (response) {
                      console.log(response.data);
                  }).catch(function (error) {
                      console.log(error);
                  });
        }


    }
</script>

<style scoped>

</style>
