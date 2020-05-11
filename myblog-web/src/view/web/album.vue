<template>
  <el-container>


    <el-main>
      <div class="Modular">
        <h2>相册</h2>
        <div v-for="(item,index) in album" class="album">
          <img :src="item.album_url">

        </div>
      </div>

    </el-main>


  </el-container>

</template>

<script>
  import axios from 'axios'


    export default {

        name: "album",
        data(){
            return {

                //相册
                album : [
                    {album_url:require('@/assets/images/photo.jpg')},
                    {album_url:require('@/assets/images/vegetable.png')},
                    {album_url:require('@/assets/images/vegetable1.png')}
                ]
            }
        }
   /*     created() {
/!*            axios.get('http://localhost:8081/getMessage')
                .then(function (response) {
                    console.log(response.data)
                })
                .catch (function(error){
                    console.log(error)
                });*!/

            let _this = this;
            axios({
                method: 'get',
                url: 'http://localhost:8081/getMessage',
              /!*  headers : {
                    token:window.sessionStorage.getItem("mytoken")
                },*!/
                xhrFields: {
                    withCredentials: true
                }
            });
        }*/
    }
</script>

<style scoped>
.el-main{

  text-align:center;
}
  img{
    margin: 0 auto;
  }

</style>
