<template>
	<div class="home">
		<div class="items">
			<input type="text" v-model='username' placeholder="请输入账号">
		</div>
		<div class="items">
			<input type="password" v-model='password' placeholder="请输入密码">
		</div>
		<div class="items">
			<span style="color: red;">{{mes}}</span>
		</div>
		<div class="items">
			<button @click='logins'>登录</button>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		name: 'App',
		data() {
			return {
				username: '',
				password: '',
				mes: ''
			}
		},
		methods: {
			// 点击登录按钮
			logins() {
				let p = {
					username: this.username,
					password: this.password
				}
				// 调用后端接口
				axios.post(this.$http+'/api/login', p).then(res => {
					console.log(res)
					this.mes = res.data.mes	//mes是后端返回的提示
					if(res.data.code==1){	//code等于1为登录成功
						this.$cookies.set("username", res.data.data.username, {expires: "7D"}); //存储用户名到cookie
						this.$message({
							type:'success',
							message:'登录成功'
						})
						setTimeout(()=>{
							this.$router.push({	//登录成功后会跳转到about这个页面，并把后端返回的用户信息带到另一个页面
								name:'list',
								params:res.data.data
							})
						},1500)
					}
				})
			}
		},
		components: {}
	}
</script>
<style>
	.items {
		padding: 10px 0;
	}
</style>
