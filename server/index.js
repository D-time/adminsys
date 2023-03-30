var express = require('express')
var app = express()
var mysql = require('mysql')	//数据库模块
var moment = require('moment')	//时间模块
// 操作数据的方法我做了个封装，增删改查的方法
// 数据库查询封装
function selectX(sql, params) {
	let data = {
		code: 0,
		mes: '请求失败'
	}
	return new Promise((resolve, reject) => {
		db.query(sql, params, (errr, ddd) => {
			if (errr) {
				console.log(222, errr,'服务器错误')
				reject(0)
			} else {
				console.log(111)
				resolve(ddd)
			}
		})
	})
}
// 数据库删除封装
function deleteX(sql, params) {
	let data = {
		code: 0,
		mes: '请求失败'
	}
	return new Promise((resolve, reject) => {
		db.query(sql, params, (errr, ddd) => {
			if (errr) {
				reject('服务器错误')
			} else {
				resolve(1)
			}
		})
	})
}
// 数据库修改封装
function updataX(sql, params) {
	let data = {
		code: 0,
		mes: '请求失败'
	}
	return new Promise((resolve, reject) => {
		db.query(sql, params, (errr, ddd) => {
			if (errr) {
				reject('服务器错误')
			} else {
				if (ddd.affectedRows == 1) {
					resolve(1)
				} else {
					resolve(0)
				}
			}
		})
	})
}
// 数据库添加封装
function insertInto(sql, params) {
	return new Promise((resolve, reject) => {
		db.query(sql, params, (errr, ddd) => {
			if (errr) {
				reject('服务器错误')
			} else {
				if (ddd.affectedRows == 1) {
					resolve(ddd)
				}
			}
		})
	})
}
// 数据库配置
var db = mysql.createPool({
	host: 'localhost',
	user: 'node_test',
	port: '3306',
	password: '123456',
	database: 'node_test'
})
app.use(express.json())
app.all("*", function(req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	// res.header("Access-Control-Allow-Headers","content-type:application/x-www-form-urlencoded");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	// :application/x-www-form-urlencoded
	// application/json
	//跨域允许的请求方式
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	res.header("Content-Type", "application/json;charset=utf-8");
	// res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	next();
})
app.post('/login',(req,res)=>{
	let data = {
		code:0,
		mes:'登录失败'
	}
	let {username,password} = req.body
	if(username=='admin'&&password=='123456'){
		data.code = 1
		data.data = {
			username:'admin',
			password:'123456',
			type:'管理员'
		}
		data.mes = '登录成功'
	}else{
		data.mes = '账号密码不正确'
	}
	res.json(data)
})
// 登录
app.post('/api/login',async (req,res)=>{
	let data = {
		code:0,
		mes:'登录失败'
	}
	let {username,password} = req.body
	let sql = 'select * from user where username=?&&password=?'
	let sj = await selectX(sql,[username,password])
	if(sj.length>0){
		data.code = 1
		data.mes = '登录成功'
		data.data = sj[0]
	}
	res.json(data)
})
// 注册
app.post('/api/zhuce',async (req,res)=>{
	let data = {
		code: 0,
		mes: '注册失败'
	}
	let {
		username,
		password
	} = req.body
	if (!username) {	//判断参数是否为空
		data.mes = '用户名不能为空'
	} else if (!password) {
		data.mes = '密码不能为空'
	} else {
		let sql = 'select username from user where username=?'
		let sj = await selectX(sql, [username, password])
		if (sj.length > 0) {
			data.mes = '此用户名已注册'
		} else {
			let create_time = moment().format("YYYY-MM-DD HH:mm:ss")	//注册用户获取当前注册时间
			let cr = await insertInto('insert into user (username,password,create_time) values (?,?,?)', [
				username, password, create_time
			])
			if (cr) {
				data.code = 1
				data.mes = '注册成功'
			} else {
				data.mes = '服务器错误'
			}
		}
	}
	res.json(data)
})
// 获取列表
app.post('/api/list',async (req,res)=>{
	let data = {
		code: 0,
		mes: '请求失败'
	}
	let sql = 'select * from user'
	let sj = await selectX(sql, [])
	data.code = 1
	data.data = sj
	res.json(data)
})
// 用户搜索
app.post('/api/sousuo',async (req,res)=>{
	let data = {
		code:0,
		mes:'查询失败'
	}
	let {username} = req.body
	// "%"+username+"%"
	let sj = await selectX(`select * from user where username like ?`,["%"+username+"%"])
	if(sj.length>0){
		data.code = 1
		data.mes = '查询成功'
		data.data = sj
	} else {
		data.mes = '无搜索到相关用户'
	}
	res.json(data)
})
app.listen(3000,()=>{
	console.log('服务器已启动')
})