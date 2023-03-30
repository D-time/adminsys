<template>
  <div class="about">
    <h1>{{type}}</h1>
	<h2>{{username}}</h2>
	<h2>{{password}}</h2>
  </div>
</template>
<script>
	export default {
		data(){
			return {
				username:'',
				password:'',
				type:''
			}
		},
		mounted() {
			// 进到这个页面会执行下面的逻辑 $route 为上个页面传过来的参数
			this.username = this.$route.params.username
			this.password = this.$route.params.password
			this.type = this.$route.params.type
			console.log(this.$route)
		}
	}
</script>
