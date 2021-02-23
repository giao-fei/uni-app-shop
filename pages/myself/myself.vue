<template>
  <view>
	  <!-- 头像 -->
	  <view class="user_info_wrap">
		 <view class="user_img_wrap" v-if="isShow">
			<image class="user_bg" :src="icon" mode="widthFix"></image>
			<view class="user_info">
				<image class="user_icon" :src="icon" mode=""></image>
				<view class="user_name">
					{{name}}
				</view>
			</view>
		 </view>
         <view class="login" v-else style="display:flex; justify-content: center; align-items: center; background-color: rgb(181, 14, 3); color: #fff; width: 150rpx; height: 80rpx; border-radius: 15rpx 15rpx 15rpx 15rpx; position: absolute; top: 15%; left: 40%;">
         	<navigator url="../login/login" hover-class="none" >登录</navigator>
         </view>
	  </view>
	  <view class="user_content">
	  	 <view class="user_main">
	  	 	<!-- 历史足迹 -->
			<view class="history_wrap">
			   <navigator url="/pages/collect/collect?type=1" hover-class="none">
				   <view class="his_num">
				   	0
				   </view>
				   <view class="his_name">
				   	关注店铺
				   </view>
			   </navigator>
			   <navigator url="/pages/collect/collect?type=2" hover-class="none">
				   <view class="his_num">
					{{collectNums}}
				   </view>
				   <view class="his_name">
					商品收藏
				   </view>
			   </navigator>
			   <navigator url="/pages/collect/collect?type=3" hover-class="none">
				   <view class="his_num">
					0
				   </view>
				   <view class="his_name">
					品牌收藏
				   </view>
			   </navigator>
			   <navigator url="/pages/collect/collect?type=4" hover-class="none">
				   <view class="his_num">
					0
				   </view>
				   <view class="his_name">
					我的足迹
				   </view>
			   </navigator>
			</view>
	  	    <!-- 我的订单 -->
			<view class="orders_wrap">
				<view class="orders_title">
					我的订单
				</view>
				<view class="order_content">
					<navigator url="/pages/order/order?type=1" hover-class="none">
						<view class="iconfont icon-dingdan"></view>
						<!-- #ifdef APP-PLUS -->
						<image src="../../static/dingdin.png" mode="widthFix" style="width: 45rpx; height:45rpx;"></image>
						<!-- #endif -->
						<view class="order_name">
							全部订单
						</view>
					</navigator>
					<navigator url="/pages/order/order?type=2" hover-class="none">
						<view class="iconfont icon-daifukuan"></view>
						<!-- #ifdef APP-PLUS -->
						<image src="../../static/daifukuan.png" mode="widthFix" style="width: 45rpx; height:45rpx;"></image>
						<!-- #endif -->
						<view class="order_name">
							待付款
						</view>
					</navigator>
					<navigator url="/pages/order/order?type=3" hover-class="none">
						<view class="iconfont icon-daishouhuo"></view>
						<!-- #ifdef APP-PLUS -->
						<image src="../../static/daishouhuo.png" mode="widthFix" style="width: 45rpx; height:45rpx;"></image>
						<!-- #endif -->
						<view class="order_name">
							待收货
						</view>
					</navigator>
					<navigator url="/pages/order/order?type=4" hover-class="none">
						<view class="iconfont icon-tuikuan"></view>
						<!-- #ifdef APP-PLUS -->
						<image src="../../static/tuikuan.png" mode="widthFix" style="width: 45rpx; height:45rpx;"></image>
						<!-- #endif -->
						<view class="order_name">
							退款/退货
						</view>
					</navigator>
				</view>
			</view>
		    <!-- 收货地址管理 -->
			<view class="address_wrap">
				<text>收货地址管理</text>
				<view class="iconfont icon-xiangyou"></view>
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/xiangyou.png" mode="widthFix" style="width: 35rpx; height: 35rpx;"></image>
				<!-- #endif -->
			</view>
			<!-- 应用信息相关 -->
			<view class="app_info_wrap ">
				<view class="app_info_item app_info_contact">
					<text>联系客服</text>
					<text>400-618-4000</text>
				</view>
				<view class="app_info_item">
					<text>意见反馈</text>
					<view class="iconfont icon-xiangyou"></view>
					<!-- #ifdef APP-PLUS -->
					<image src="../../static/xiangyou.png" mode="widthFix" style="width: 35rpx; height: 35rpx;"></image>
					<!-- #endif -->
				</view>
				<view class="app_info_item">
					<text>关于我们</text>
					<view class="iconfont icon-xiangyou"></view>
					<!-- #ifdef APP-PLUS -->
					<image src="../../static/xiangyou.png" mode="widthFix" style="width: 35rpx; height: 35rpx;"></image>
					<!-- #endif -->
				</view>
			</view>
		    <!-- 推荐 -->
			<view class="recommend_wrap">
				<text>把应用推荐给其他人</text>
				<view class="iconfont icon-xiangyou"></view>
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/xiangyou.png" mode="widthFix" style="width: 35rpx; height: 35rpx;"></image>
				<!-- #endif -->
			</view>
		    <view class="delLogin">
		     	<button @click="delToken" type="default" hover-class="none">退出登录</button>
		    </view>
		 </view>
	  </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
			  ifOnShow: false, // 页面刷新
			  icon: '',
			  name: '',
			  isShow: true,
			  userinfo: {},     // 表示被收藏的商品数量
			  collectNums: 0
			}
		},
		methods: {
			// 退出登录
			delToken() {
				uni.clearStorage()
				uni.showLoading({
					title: '退出中',
					duration: 800,
					mask: true
				})
				// #ifdef APP-PLUS
				setTimeout(() => {
					this.isShow = false;
				}, 800)
				// #endif
				// #ifdef H5
				setTimeout(() => {
					location.reload()
				},850)
				// #endif
			},
			// 登录信息详情
			async detailLogin() {	
				const res = await uni.request({
					url: 'http://houtai.nihaoa.icu:27017/admin/api/rest/admin_users',
					header: {Authorization:uni.getStorageSync('token')},
					method: 'GET'
				})
				const username = uni.getStorageSync('username');
				let v = res[1].data;
				for (let i = 0; i < v.length; i++) {
					if(v[i].username === username) {
						this.icon = v[i].icon;
						this.name = v[i].username;
					}
				}
			}
		},
		onLoad() {
			// #ifdef H5
			if(this.ifOnShow){
			  setTimeout(() => {
				location.reload()  
			  },0.1)
			}
			// #endif
			
		},
		onShow() {
			// #ifdef H5
			const token = uni.getStorageSync('token');
			this.token = token;
			if(!token) {
			   uni.navigateTo({
				  url: '../login/login'
			   })
			   setTimeout(() => {
				   uni.showToast({
				   	  title: '请先登录~',
					  image: '../../static/alert.png',
					  duration: 1000
				   },100)
			   })
			}
			// #endif
			// #ifdef APP-PLUS
            const token = uni.getStorageSync('token');
			if(token) {
				this.isShow = true;
			}
			// #endif
			this.detailLogin();
			// 显示收藏的数量
			const userinfo = uni.getStorageSync('userinfo');
			const collect = uni.getStorageSync('collect')||[];
			
			this.userinfo = userinfo;
			this.collectNums = collect.length;
		},
		onHide(){
			// #ifdef H5
		    this.ifOnShow = true
			// #endif
		}
		
	}
</script>

<style lang="less">
	page {
		background-color: #edece8;
	}
	// 头像
	.user_info_wrap{
		height: 35vh;
		overflow: hidden;
		.user_img_wrap {
			position: relative;
			.user_bg {
			   height: 50vh;
			   width: 100%;
			   // 高斯模糊
			   filter: blur(10rpx)
			}
			.user_info {
			   position: absolute;
			   left: 50%;
			   top: 20%;
			   transform: translateX(-50%);
			   text-align: center;
			   .user_icon {
				   width: 150rpx;
				   height: 150rpx;
				   border-radius: 50%;
			   }
			   .user_name {
				   color: #fff;
				   margin-top: 40rpx;
				   font-size: 40rpx;
			   }
			}
		}
	}
	// 主要内容
	.user_content {
		position: relative;
		.user_main {
			position: absolute;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			top: -40rpx;
			color: #666;
			height: auto;
			// 历史足迹
			.history_wrap {
				background-color: #fff;
				display: flex;
				navigator {
					flex: 1;
					text-align: center;
					padding: 10rpx 0;
					.his_num {
						color: red;
					}
					.his_name {}
				}
			}
		    // 我的订单
			.orders_wrap {
				background-color: #fff;
				margin-top: 30rpx;
				.orders_title {
					padding: 20rpx;
					border-bottom: 1rpx solid #ccc;
				}
				.order_content {
					display: flex;
					navigator {
						flex: 1;
						padding: 15rpx 0;
						text-align: center;
						.iconfont {
							color: red;
							font-size: 40rpx;
						}
						.order_name {
							font-size: .9rem;
						}
					}
				}
			}
		    // 关于我们
			.address_wrap {
				margin-top: 30rpx;
				background-color: #fff;
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
			}
			.app_info_wrap {
				margin-top: 30rpx;
				background-color: #fff;
				.app_info_item {
				   padding: 20rpx;
				   border-bottom: 1rpx solid #ccc;
				   display: flex;
				   justify-content: space-between;
				}
				.app_info_contact {
				   display: flex;
				   justify-content: space-between;
				}
			}
			.recommend_wrap {
				margin-top: 30rpx;
				background-color: #fff;
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
			}
		    // 退出登录
		    .delLogin button{
		       margin-top: 30rpx;
		       background-color: #fff;		       
			   height: 80rpx;
			   color: #666;
			   /* #ifdef H5*/
			   margin-bottom: 120rpx;
			   /* #endif */
			   /* #ifdef APP-PLUS */
			   margin-bottom: 30rpx;
			   /* #endif */
			   display: flex;
			   justify-content: center;
			   align-items: center;
		    }
		}
	}
</style>
