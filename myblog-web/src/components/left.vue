<template>
  <el-main class="left">

    <div class="Modular">
      <h2>关于我</h2><hr>
      <div class="myphoto">
        <el-avatar :src="photo" :size="100"></el-avatar><br>
      </div>
      {{introduce}}



    </div>


    <div class="Modular">
      <h2>相册</h2>
      <div v-for="item in album" class="album">
        <img :src="item.album_url">
      </div>
    </div>

    <div class="friendHref Modular">

      <h2>Github</h2>
      <a :href="url" target="_blank">友情链接</a>
    </div>
  </el-main>

</template>

<script>
  import axios from 'axios'

    export default {
        name: "left",
        data(){
            return {
                //关于我
                photo:require('@/assets/images/photo.jpg'),
                introduce:'这是简介',
                url:'https://github.com/hc-java',
                //相册
                album : [
                    {album_url:require('@/assets/images/photo.jpg')},
                    {album_url:require('@/assets/images/vegetable.png')},
                    {album_url:require('@/assets/images/vegetable1.png')}
                ],
            }
        }/*,
        created() {

            let _this=this;
            axios.all([
                axios.post('http://localhost:8081/about')
                // axios.post('http://localhost:8081/photo')

            ])
                .then(axios.spread(function (responseAbout,responsePhoto) {
                    // 三个请求现在都执行完成后

                    // console.log(responseArticles);
                    // console.log(responseClassify);

                    _this.introduce=responseAbout.data.introduce;
                   // _this.photo=responseAbout.data.photo;
                    // _this.articles=responseArticles.data;
                    // _this.classify=responseClassify.data;

                    // console.log(responseHome.data+"---"+ responseArticles.data+"---"+responseClassify.data);
                }));
        }*/
    }
</script>

<style scoped>

</style>
