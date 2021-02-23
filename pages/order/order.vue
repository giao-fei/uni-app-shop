<template>
	<view class="order">
		<view class="topBar">
		  <view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">全部</view>
		  <view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">待付款</view>
		  <view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">待发货</view>
		  <view :class="['inv-h',Inv==4?'inv-h-se':'']" @click="Inv=4">退款/退货</view>
		</view>
		<view class="card">
		  <view class="" v-show="Inv == 1">全部</view>
		  <view class="" v-show="Inv == 2">待付款</view>
		  <view class="" v-show="Inv == 3">待发货</view>
		  <view class="" v-show="Inv == 4">退款/退货</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Inv: 0
			}
		},
		methods: {
			// 顶部选项卡切换
			changeTab(e) {
			    this.Inv = e                             
			},
		    async getOrders(options) {
				// 接收参数
				this.Inv = options.type;
				const token = uni.getStorageSync('token');
				if(token) {
				  const res = await this.$myRequest({
				    url: '/my/orders/all',
				    data: options.type
				  })
				  console.log(res)
				}
			}
		},
		onLoad:function(options) {
			this.getOrders(options);
			
		}
	}
</script>

<style lang="less">
	// 顶部TabBar
	.topBar {
	  width: 100%;
	  height: 100rpx;
	  border-bottom: 3rpx lightgray solid;
	  display: flex;
	  position: fixed;
	  background-color: white;
	  box-shadow: 0px 1px 1px -1px #5E5E5E; 
	  z-index: 99;
	  .inv-h {
		font-size: 30rpx;
		flex: 1;
		text-align: center;
		color: black;
		height: 100rpx;
		letter-spacing: 5rpx;
		line-height: 100rpx;
	  }
	  .inv-h-se {
		color: red;
		border-bottom: 3rpx solid red;
	  }
	}
    .card {
		width: 100%;
		position: relative;
		top: 100rpx;
	}
</style>
