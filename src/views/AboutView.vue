<template>
  <div class="about">
    <div class="ceng">
		<el-input v-model="username" placeholder="请输入用户名"></el-input>
	</div>
	<div class="ceng">
		<el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
	</div>
	<div class="ceng">
		<el-input type="password" v-model="passwords" placeholder="请再次输入密码"></el-input>
	</div>
	<div class="ceng">
		<el-button type="primary" @click='zhuce'>注册</el-button>
	</div>
  </div>
</template>
<script>
	import axios from "axios"
	export default {
		data(){
			return {
				username:'',
				password:'',
				passwords:'',
				type:''
			}
		},
		methods:{
			// 注册
			zhuce(){
				// 判断两次密码是否一致
				if(this.password!=this.passwords){
					this.$message.error('两次密码不一致')	//弹出提示框
				}else{
					let p = {
						username:this.username,
						password:this.password
					}
					// http://127.0.0.1:3000/api/zhuce
					axios.post(this.$http+'/api/zhuce', p).then(res => {
						console.log(res)
						if(res.data.code==1){	//code等于1为登录成功
							this.$message({
								type:'success',
								message:'注册成功'
							})
							setTimeout(()=>{
								this.$router.push({	//注册成功跳转登录页面
									path:'/'
								})
							},1500)
						}else{
							this.$message.error(res.data.mes)	//弹出提示框
						}
					})
				}
			}
		},
		mounted() {
		}
	}
</script>
<style scoped>
	.about{
		width: 800px;
		margin: auto;
	}
	.ceng{
		padding: 10px 0;
	}
</style>
