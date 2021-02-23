<template>
	<view class="login">
		<form @submit="formSubmit" class="form">
			<view class="img">
				<image style="width: 80px; height: 80px;" mode="widthFix" src="../../static/jd.png"></image>
			</view>
			<view class="username">
				<input type="text"  v-model.trim="model.username" placeholder="手机号/邮箱/会员名" style="position: relative;" />
				<block v-if="model.username!==''">
					<image @click="delUsername" src="../../static/qingkong.png" mode="widthFix" style="width: 35rpx; height: 35rpx; position: absolute; right: 60rpx; margin-top: -40rpx;"></image>
				</block>
			</view>
			<view class="password">
				<input type="password" v-if="showPassword" maxlength="40" v-model.trim="model.password" placeholder="请输入登录密码" style="position: relative;" />
				<input type="text" v-else maxlength="40" v-model.trim="model.password" placeholder="请输入登录密码" style="position: relative;" />
				<block v-if="model.password!==''">
					<image @click="delPassword" src="../../static/qingkong.png" mode="widthFix" style="width: 35rpx; height: 35rpx; position: absolute; right: 130rpx; margin-top: -40rpx;"></image>
				    <text @click="ShowPsd">
				      <i v-if="isShow" class="iconfont icon-xianshimima"></i>
				      <i v-else class="iconfont icon-caozuo-yincangmima"></i>
				    </text>
					<!-- #ifdef APP-PLUS -->
					  <text @click="ShowPsd">
						 <image v-if="isShow" src="../../static/xianshimima.png" mode="widthFix" style="position: absolute; width: 45rpx; height: 45rpx; right: 60rpx; margin-top: -45rpx;"></image>
						 <image v-else src="../../static/yincangmima.png" mode="widthFix" style="width: 45rpx; height: 45rpx; position: absolute; right: 60rpx; margin-top: -45rpx;"></image>
					  </text>
					<!-- #endif -->
				</block>
			</view>
			<view class="register">
				<navigator url="#" hover-class="none">短信验证码登录</navigator>
				<navigator url="#" hover-class="none">免费注册</navigator>
			</view>
			<view class="loginBtn">
				<button form-type="submit" hover-class="none">登录</button>
			</view>
		</form>
	</view>
</template>

<script>
   export default {
	   data() {
		   return {
			   model: {
				  username: '',
				  password: ''
			   },
			   isShow: false,
			   showPassword: true
		   }
	   },
	   methods: {
		   delUsername() {
			 this.model.username = ''  
		   },
		   delPassword() {
			 this.model.password = ''  
		   },
		   // 密码显示与隐藏
		   ShowPsd() {
			 this.isShow = !this.isShow  
			 this.showPassword = !this.showPassword
		   },
		   async formSubmit() {
			 if(this.model.username == '') {
				 uni.showToast({
				 	title: '请输入账号~',
					image: '../../static/alert.png'	
				 })
			 } else if (this.model.password == '') {
				 uni.showToast({
				 	title: '请输入密码~',
					image: '../../static/alert.png'	
				 })
			 } else {
				 const res = await uni.request({
					 url: 'http://houtai.nihaoa.icu:27017/admin/api/login',
					 method: 'POST',
					 data: this.model,
					 success:(res) => {
					 	if (res.statusCode === 200) {
							uni.showLoading({
								title: '加载中',
								mask: true
							})
							setTimeout(() => {
							   uni.switchTab({
								url: '../myself/myself'
							   })
							},800)
							setTimeout(() => {
								uni.showToast({
									title: '登录成功',
									duration: 850
								})
							},850)
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync('username', res.data.username)
							// console.log(res)
						} else if (res.statusCode === 422) {
							uni.showToast({
								title: res.data.message,
								image: '../../static/alert.png'	
							})
						}
					 }
				 })
			     
			 }
		   }
	   }
   }
</script>

<style lang="less">
	@border: 1px red solid;
	page {
		background-color: white;
		font-family: PingFang SC,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,Microsoft YaHei;
		overflow: hidden;
		height: auto;
	}
	.login {	
		padding: 0 20px;
		.form {
		  width: 100%;
		  view {
			  margin: 60rpx 0 0 0; 
		  }
		  .img {
			  width: 100%;
			  display: flex;
			  justify-content: center;
			  margin-top: 80rpx;
		  }
		  .username {
			  letter-spacing: 1rpx;
			  padding-bottom: 15rpx;
			  border-bottom: 1rpx red solid;
		  }
		  .password {
			  letter-spacing: 1rpx;
			  padding-bottom: 15rpx;
			  border-bottom: 1rpx red solid;
			  i {
				 position: absolute;
				 right: 65rpx;
				 margin-top: -45rpx;
				 font-size: 40rpx;
			  }
		  }
		  .register {
			  display: flex;
			  justify-content: space-between;
			  color: #555;
			  margin-top: 30rpx;
			  font-size: .9rem;
		  }
		  .loginBtn button{
			  border-radius: 40rpx 40rpx 40rpx 40rpx;
			  border: none;
			  background-image: linear-gradient( 90deg ,#f10000,#ff2000 73%,#ff4f18);
			  letter-spacing: 5rpx;
			  color: white;
		  }
		}
	}
</style>
