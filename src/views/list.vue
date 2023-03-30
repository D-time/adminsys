<template>
	<div>
		<h1>{{username}}</h1>
		<div class="tables">
			<div style="width: 800px;margin: 10px auto;display: flex;align-items: center;">
				<el-input v-model="gjz" placeholder="请输入关键字"></el-input>
				<el-button type="primary" @click="sousuo">搜索</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="username" label="用户名" width="180">
				</el-table-column>
				<el-table-column prop="password" label="密码" width="180">
				</el-table-column>
				<el-table-column prop="create_time" label="注册日期">
				</el-table-column>
			</el-table>
		</div>
	</div>

</template>

<script>
	import axios from "axios"
	export default {
		data() {
			return {
				tableData: [],
				username:'',
				gjz:''
			}
		},
		methods:{
			// 搜索
			sousuo(){
				if(this.gjz == ''){
					this.getList()
				}else{
					axios.post(this.$http+'/api/sousuo',{username:this.gjz}).then(res => {
						console.log(res)
						if(res.data.code==1){	
							this.tableData = res.data.data
						}else{
							this.$message.error(res.data.mes)	//弹出提示框
						}
					})
				}
			},
			// 获取列表
			getList(){
				axios.post(this.$http+'/api/list').then(res => {
					console.log(res)
					if(res.data.code==1){	
						this.tableData = res.data.data
					}else{
						this.$message.error(res.data.mes)	//弹出提示框
					}
				})
			}
		},
		mounted() {
			if(this.$cookies.get('username')){	//获取cookie下的用户名
				this.username = this.$cookies.get('username')
			}else{
				this.username = '请登录'
			}
			this.getList()	//调用列表接口
		}
	}
</script>

<style scoped>
.tables{
	width: 800px;
	margin: auto;
}
</style>
