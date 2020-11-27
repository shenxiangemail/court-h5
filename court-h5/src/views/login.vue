<template>
	<div style="width: 99%; height: 100%; background-color: #0091e6;position: absolute;bottom: 0rem;" class="common">
		<div class="login_main common">
			<div class="login_login input common">
				<h1 class="login_h1 common">宁波海事法院</h1>
				<div class="login_inset common">
					<!--start-main-->
					<form class="common">
						<div class="common">
							<div style="display: flex;">
								<div style="display: flex;align-items: center;" class="login_go_back" >
									<!-- <i class="el-icon-back" style="color: #3f8fdf; padding-bottom: 28px;"></i> -->
								</div>
								<h2 class="login_h2 common" style="margin: auto;">登录</h2>
								<!-- <i class="el-icon-back" style="color: #FFFFFF;">跳过</i> -->
							</div>

							<span class="login_span common"><label>用户名</label></span>
							<span class="login_span"><input type="text" class="login_textbox inputPassword inputPasswordH" v-model="loginAccount"></span>
						</div>
						<div class="common">
							<span><label class="common login_span">密码</label></span>
							<span><input type="password" class="login_password inputPassword inputPasswordH" v-model="loginPassword"
								 maxlength="10"></span>
						</div>
						<div class="sign common">
							<input type="button" @click="loginBut" value="登录" class="login_submit" />
						</div>
					</form>
					<div style="color: #0074D9;margin-top: 1.25rem;font-size: 12px;" @click="toIndex">进入首页</div>
				</div>
				
			</div>
			<!--//end-main-->
		</div>
	</div>
</template>

<script src="../common/jquery.js"></script>
<script src="../common/security.js"></script>
<script>
	export default {

		data: function() {
			return {
				loginAccount: '',
				loginPassword: '',
				publicKeyExponent: '',
				publicKeyModulus: '',
				nonceStr:'',
			}
		},
		methods: {
			/* 点击登录按钮 */
			loginBut() {
				var that = this;
				// 判断用户名
				if (this.loginAccount == '') {
					this.$message({
						showClose: true,
						message: '用户名不能为空',
						type: 'warning'
					});

					return;
				}

				//判断密码
				if (this.loginPassword == '') {
					this.$message({
						showClose: true,
						message: '密码不能为空',
						type: 'warning'
					});
					return;
				}
				if (this.publicKeyExponent == '' || this.publicKeyModulus == '') {
					this.$message({
						showClose: true,
						message: '请刷新页面后重试',
						type: 'warning'
					});
					return;
				}
				var key = RSAUtils.getKeyPair(that.publicKeyExponent, "",
					that.publicKeyModulus);
				var encryptedPwd = RSAUtils.encryptedString(key, that.loginPassword);
				that.api.loginByPassword(that, that.loginAccount, encryptedPwd,that.nonceStr,function(res){
					that.$store.commit('setToken',res.body.data.token);
					that.$store.commit('setAdminName',res.body.data.adminName);
					that.$router.push({
						path:'/',
					})
				});
			},
			goBack() {
				this.$router.push({
					path: '/'
				})
			},toIndex() {
				this.$router.push({
					path: '/'
				})
			},

		},
		mounted: function() {
			
			var that = this;
			/* 验证token是否过期 */
			var token = this.$store.getters.getToken;
			if(token != null && token != ''){
				this.api.autoLogin(that,function(res){
					that.$router.push({
						path:'/'
					})
				})
			}else{
				var response = {}
				// 获取公钥
				that.api.publicKey(that, function(res) {
					that.publicKeyExponent = res.body.data.publicKeyExponent;
					that.publicKeyModulus = res.body.data.publicKeyModulus;
					that.nonceStr = res.body.data.nonceStr;
				});
			}
		}
	}
</script>

<style>
	/* reset */
	.common {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;
	}

	/*end reset*/
	/****-----start-body----****/
	.login_body {
		background-color: #0091e6;
	}

	.login_main {
		/* margin: 5em auto 0; */
		margin: auto;
		padding-top: 6.5em;
		width: 26.25rem;
	}

	.login_span {
		display: block;
		font-size: 1.0em;
		color: #333;
		font-weight: 400;
		text-align: left;
	}

	.login_h1 {
		font-size: 2.4em;
		padding-bottom: 28px;
		color: #fff;
		text-align: center;
	}

	.login_h2 {
		font-size: 1.5em;
		padding-bottom: 28px;
		color: #0091e6;
		text-align: center;
	}

	.login_login {
		/* padding: 2em 0; */
	}

	.login_inset {
		position: relative;
		background: #fff;
		padding: 2.5em;
		border-radius: 0.3em;
		-webkit-border-radius: 0.3em;
		-o-border-radius: 0.3em;
		-moz-border-radius: 0.3em;
		box-shadow: 0px 0px 15px #545454;
	}




	.inputPassword {
		padding: 9px;
		width: 93.4%;
		font-size: 1.1em;
		margin: 3px 0px 25px;
		color: #666666;
		background: #e7f0fe;
		border: none;
		font-weight: 400;
		outline: none;
		-webkit-transition: all 0.3s ease-out;
		-moz-transition: all 0.3s ease-out;
		-ms-transition: all 0.3s ease-out;
		-o-transition: all 0.3s ease-out;
		transition: all 0.3s ease-out;
		border-radius: 0.2em;
		-webkit-border-radius: 0.2em;
		-o-border-radius: 0.2em;
		-moz-border-radius: 0.2em;
	}

	inputPasswordH:hover,
	#active {
		border: none;
		outline: none;
	}

	.login_sign {
		padding: 10px 0 0;
		text-align: center;
	}

	.login_submit {
		margin-right: 11px;
		background: #0091e6;
		border: none;
		outline: none;
		padding: 8px 30px;
		cursor: pointer;
		color: #FFF;
		font-size: 0.9em;
		border-radius: .3em;
		-webkit-border-radius: .3em;
		-moz-border-radius: .3em;
		-o-border-radius: .3em;
		transition: 0.5s all;
		-webkit-transition: 0.5s all;
		-moz-transition: 0.5s all;
		-o-transition: 0.5s all;
		font-weight: 600;
		margin: 0 auto;
	}

	.login_submit:hover {
		background: #C5C5C5;
	}

	.copy-right {
		text-align: center;
		width: 97%;
		margin: 10em auto 0em;
	}

	.copy-right p {
		color: #FFF;
		font-size: 1em;
	}

	.copy-right p a {
		font-size: 1em;
		font-weight: 600;
		color: #1567A5;
		-webkit-transition: all 0.3s ease-out;
		-moz-transition: all 0.3s ease-out;
		-ms-transition: all 0.3s ease-out;
		-o-transition: all 0.3s ease-out;
		transition: all 0.3s ease-out;
	}

	.copy-right p a:hover {
		color: #fff;
	}

	.login_go_back:hover {
		cursor: pointer;
	}

	/*----start-responsive design-----*/
</style>
