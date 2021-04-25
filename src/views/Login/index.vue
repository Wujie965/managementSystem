//login
<template>
	<div class="login">
		<div class="login-warp">
			<ul class="menu-tab">
				<li v-for="item in menuTab" :key="item.id" :class="{'menu-tab-selected': item.isSelected}" @click="menuChange(item, 'account')">{{item.text}}</li>
			</ul>
			<el-form :model="account" status-icon :rules="login_check" ref="loginForm" class="form-login" size="medium">
				<el-form-item prop="username" class="form-login-item">
					<label>账户：</label>
					<el-input type="text" v-model="account.username" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item prop="password" class="form-login-item">
					<label>密码：</label>
					<el-input type="password" v-model="account.password" autocomplete="off" maxlength="20"></el-input>
				</el-form-item>

				<el-form-item prop="surepwd" class="form-login-item" v-if="model != 'login'">
					<label>确认密码：</label>
					<el-input type="password" v-model="account.surepwd" autocomplete="off" maxlength="20"></el-input>
				</el-form-item>

				<el-form-item prop="code" class="form-login-item">
					<label>验证码：</label>
					<el-row :gutter="10">
						<el-col :span="15"><el-input v-model="account.code" autocomplete="off"  maxlength="6"></el-input></el-col>
						<el-col :span="9"><el-button type="success" class="form-login-button" @click="getSms()" :disabled="codeButton.status">{{codeButton.text}}</el-button></el-col>
					</el-row>
				</el-form-item>

				<el-form-item>
					<el-button type="danger" @click="submitLogin('loginForm')" class="form-login-button form-submit" :disabled="submitButton">{{model == "login" ? "登录" : "注册"}}</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { GetSms, Register, Login } from "@/api/login"
import { reactive, ref, onMounted } from "@vue/composition-api";
import { stripscript, checkUname, checkPwd, checkCod } from "@/utils/check";
export default {
	name: "Login",
	setup(props, context) {	//该方法放置 data 数据、生命周期、自定义函数等
		//验证用户名是否为空及其规范性
		let checkUsername = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('用户名不能为空！'));
			}
			else if(checkUname(value)) {
				callback(new Error('用户名格式有误，请核对后重新输入！'));
			}
			else {
				callback();
			}
		};
		//验证密码是否为空及其规范性
		let checkPassword = (rule, value, callback) => {
			account.password = value = stripscript(value);		//数据过滤
			if (value === '') {
				callback(new Error('密码不能为空！'));
			}
			else if(checkPwd(value)) {
				callback(new Error('密码格式有误，请核对后重新输入！'));
			}
			else {
				callback();
			}
		};
		//验证确认密码是否为空及其规范性
		let checkSurepwd = (rule, value, callback) => {
			account.surepwd = value = stripscript(value);		//数据过滤
			if (value === '') {
				callback(new Error('密码不能为空！'));
			}
			else if(value != account.password) {
				callback(new Error('确认密码不匹配，请核对后重新输入！'));
			}
			else {
				callback();
			}
		};
		//验证验证码是否为空及其规范性
		let checkCode = (rule, value, callback) => {
			account.code = value = stripscript(value);
        	if (value == '') {
				callback(new Error('验证码不能为空！'));
			}
			else if(checkCod(value)) {
				callback(new Error('验证码格式有误，请核对后重新输入！'));
			}
			else {
				callback();
			}
		};

		//reactive 用于声明对象等类型，可直接访问属性值
		const menuTab = reactive([
			{ text: "登录", isSelected: true, type: "login" },
			{ text: "注册", isSelected: false, type: "register" }
		]);
		const account = reactive({
			username: '',
			password: '',
			surepwd: '',
			code: ''
		});
		const login_check = reactive({
			username: [
				{ validator: checkUsername, trigger: 'blur' }
			],
			password: [
				{ validator: checkPassword, trigger: 'blur' }
			],
			surepwd: [
				{ validator: checkSurepwd, trigger: 'blur' }
			],
			code: [
				{ validator: checkCode, trigger: 'blur' }
			]
		});
		const codeButton = reactive({
			status: false,
			text: "获取验证码"
		});	//验证码获取按钮的状态

		//ref用于声明基础类型，需通过 .value 访问属性值
		const model = ref("login");		//表单属性
		const submitButton = ref(true);	//提交按钮
		const timer = ref(null);		//倒计时

		/**
		 * 改变邮件发送按钮状态
		 */
		const updateButtonStatus = ((status, text) => {
			codeButton.status = status;
			codeButton.text = text;
		})

		/**
		 * 切换菜单
		 */
		const menuChange = ((data) => {
			menuTab.forEach(el => {
				el.isSelected = false;
			});	//循环遍历将 menuTab 下所有 isSelected 初始化为 false
			data.isSelected = true;	//将单击到的元素的背景改为选中类型

			model.value = data.type;	//添加确认密码项

			context.refs['loginForm'].resetFields();	//重置表单

			clearInterval(timer.value);	//清除计时器

			updateButtonStatus(false, "获取验证码");	//将验证码发送按钮激活
		});

		/**
		 * 获取验证码
		 */
		const getSms = (() => {
			if(!account.username) {
				context.root.$message.error("邮箱不能为空！");
				return false;
			}

			if(checkUname(account.username)) {
				context.root.$message.error("邮箱地址不规范，请核对后重新输入！");
				return false;
			}

			codeButton.status = true;
			codeButton.text = "发送中";

			setTimeout(() => {
				GetSms({
					username: account.username,
					module: account.value
				})
				.then(res => {
					//提示发送成功的消息
					context.root.$message({
						message: res.data.message,
						type: 'success'
					});
					
					submitButton.value = false;	//启用登录注册按钮

					countdown(60);		//开启一个定时器，为再次获取验证码倒计时
				})
				.catch(error => {
					console.log(error);
				});
			}, 3000);
		});

		/**
		 * 注册请求
		 */
		const reigster = (() => {
			Register({
				username: account.username,
				password: account.password,
				code: account.code,
				moudle: "register"
			})
			.then(res => {
				//提示注册成功的消息
				context.root.$message({
					message: res.data.message,
					type: 'success'
				});

				menuChange(menuTab[0], 'account');	//将界面切换至登录页面
				
				resetCutdown();						//重置验证码获取按钮，并清除倒计时
				
				submitButton.value = true;			//禁用登录按钮
			})
			.catch(error => {
				console.log(error)
			});
		})

		/**
		 * 登录请求
		 */
		const login = (() => {
			Login({
				username: account.username,
				password: account.password,
				code: account.code,
				moudle: "login"
			}).then(res => {
				//提示登录成功的消息
				context.root.$message({
					message: res.data.message,
					type: 'success'
				});
			}).catch(error => {
				console.log(error)
			});
		});

		/**
		 * 提交表单
		 */
		const submitLogin = (formName => {
			context.refs[formName].validate((valid) => {
				if (valid) {
					model.value == "login" ? login() : reigster();
				}
				else {
					console.log('error submit!!');
					return false;
				}
			});
		});

		const countdown = ((num) => {
			if(timer.value) { clearInterval(timer.value); }	//提前预判定时器是否已存在，只开启一个定时器，避免定时器过多造成资源浪费
			timer.value = setInterval(() => {
				//改变验证码获取按钮状态
				codeButton.text = `倒计时${num --}秒`;
				if(num === 0) {		//判断倒计时是否已完成
					clearInterval(timer.value);
					updateButtonStatus(false, "重新获取");
				}
			},1000);
		});

		const resetCutdown = (() => {
			//重置验证码获取按钮
			updateButtonStatus(false, "获取验证码");
			//清除定时器
			clearInterval(timer.value);
		});

		/**
		 * 生命周期
		 * 挂在完成之后
		 */
		onMounted(() => {
			//
			
		})

		return {
			menuTab,
			account,
			login_check,
			model,
			codeButton,
			submitButton,
			menuChange,
			getSms,
			submitLogin
		}
	}
};
</script>
<style lang="scss">
	.login {
		background-color: #344a5f;
		height: 100vh;
		.login-warp {
			width: 330px;
			margin: 0 auto;
				.menu-tab {
				text-align: center;
				li {
					display: inline-block;
					color: #fff;
					width: 88px;
					line-height: 36px;
					font-size: 14px;
					cursor: pointer;
					border-radius: 2px;
				}
				.menu-tab-selected {
					background-color: rgba(0, 0, 0, .1);
				}
			}
			.form-login {
				margin-top: 29px;
				label {
					display: block;
					margin-bottom: 3px;
					font-size: 14px;
					color: #fff;
				}
				.form-login-item {
					margin-bottom: 13px;
				}
				.form-login-button {
					display: block;
					width: 100%;
				}
				.form-submit {
					margin-top: 19px;
				}
			}
		}
	}
</style>
