//login
<template>
	<div class="login">
		<div class="login-warp">
			<ul class="menu-tab">
				<li v-for="item in menuTab" :key="item.id" :class="{'menu-tab-selected': item.isSelected}" @click="menuChange(item)">{{item.text}}</li>
			</ul>
			<el-form :model="account" status-icon :rules="login_check" ref="account" class="form-login" size="medium">
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
						<el-col :span="9"><el-button type="success" class="form-login-button">获取验证码</el-button></el-col>
					</el-row>
				</el-form-item>

				<el-form-item>
					<el-button type="danger" @click="submitLogin('account')" class="form-login-button form-submit">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { stripscript, checkUname, checkPwd, checkCod } from "@/utils/check";
export default {
	name: "Login",
	data() {
		//验证用户名是否为空及其规范性
		var checkUsername = (rule, value, callback) => {
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
		var checkPassword = (rule, value, callback) => {
			this.account.password = value = stripscript(value);		//数据过滤
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
		var checkSurepwd = (rule, value, callback) => {
			this.account.surepwd = value = stripscript(value);		//数据过滤
			if (value === '') {
				callback(new Error('密码不能为空！'));
			}
			else if(value != this.account.password) {
				callback(new Error('确认密码不匹配，请核对后重新输入！'));
			}
			else {
				callback();
			}
		};
		//验证验证码是否为空及其规范性
		var checkCode = (rule, value, callback) => {
			this.account.code = value = stripscript(value);
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
		return {
			menuTab: [
				{ text: "登录", isSelected: true, type: "login" },
				{ text: "注册", isSelected: false, type: "register" }
			],
			model: "login",
			account: {
				username: '',
				password: '',
				surepwd: '',
				code: ''
			},
			login_check: {
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
			}
		}
	},
	created() {},
	mounted() {},
	methods: {
		menuChange(data) {
			this.menuTab.forEach(el => {
				el.isSelected = false;
			});	//循环遍历将 menuTab 下所有 isSelected 初始化为 false
			data.isSelected = true;	//将单击到的元素的背景改为选中类型

			this.model = data.type;	//添加确认密码项
		},
		submitLogin(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				}
				else {
					console.log('error submit!!');
					return false;
				}
			});
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
