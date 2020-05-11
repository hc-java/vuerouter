<template>
    <div>queryabout</div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "queryabout",
        data(){
            return{

            }
        },created() {
            /*axios.post('http://localhost:8081/queryArticle')
                .then((response)=>{
                    console.log()
                })*/
            let  _this=this;

            _this.$axios.post('http://localhost:8081/queryAbout',{},{
                headers: {
                    "Content-Type":"application/json;charset=utf-8"
                },
                withCredentials : true
            })

               .then((response)=>{
                   console.log(response)
               })
               .catch ((error)=>{
                   console.log(error)
               })
        }

    }
</script>

<style scoped>

</style>
