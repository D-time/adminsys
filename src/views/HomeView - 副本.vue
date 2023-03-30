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
				axios.post('http://39.105.213.163:3000/login', p).then(res => {
					console.log(res)
					this.mes = res.data.mes	//mes是后端返回的提示
					if(res.data.code==1){	//code等于1为登录成功
						console.log('登录成功')
						this.$router.push({	//登录成功后会跳转到about这个页面，并把后端返回的用户信息带到另一个页面
							name:'about',
							params:res.data.data
						})
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
