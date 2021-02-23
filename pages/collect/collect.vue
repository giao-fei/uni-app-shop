<template>
 <view>
  <view class="topBar">
  	<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">关注店铺</view>
  	<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">商品收藏</view>
  	<view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">品牌收藏</view>
  	<view :class="['inv-h',Inv==4?'inv-h-se':'']" @click="Inv=4">我的足迹</view>
  </view>
  <view class="card">
    <view class="" v-show="Inv == 1">店铺收藏</view>
    <view class="" v-show="Inv == 2">
		<view class="collect_main">
		    <view class="collect_title">
		    	<text class="collect_tips active" :class="{'now':index==1}" @click="index=1">全部</text>
				<text class="collect_tips" :class="{'now':index==2}" @click="index=2">正在热卖</text>
				<text class="collect_tips" :class="{'now':index==3}" @click="index=3">即将上线</text>
		    </view>
			<view class="collect_content">
				<view v-show="index==1" class="goods_item" v-for="item in collect" :key="item.goods_id" @click="btn(item.goods_id)">
					<!-- 左侧 图片容器 -->
					<view class="good_img_wrap">
						<image mode="widthFix" :src="item.goods_small_logo?item.goods_small_logo:'http://image3.suning.cn/uimg/b2c/newcatentries/0070082592-000000000602606780_2_400x400.jpg'"></image>
					</view>
					<!-- 右侧 商品容器 -->
					<view class="goods_info_wrap"> 
						<view class="goods_name">
							  {{item.goods_name}}
						</view>
						<view class="goods_price">
							  {{'￥'}}&nbsp;{{item.goods_price ? item.goods_price : '4580'}}{{'.00'}}
						</view>
					</view>
				</view> 
			    <view v-show="index==2">正在热卖</view>
				<view v-show="index==3">即将上线</view>
			</view>
		</view>
	</view>
    <view class="" v-show="Inv == 3">关注的商品</view>
    <view class="" v-show="Inv == 4">我的足迹</view>
  </view>
 </view>
</template>

<script>
  export default {
	  data() {
		  return {
			Inv: 0,
			collect: [],
			index: 1
		  }
	  },
	  methods: {
		// 顶部选项卡切换
		changeTab(e) {
		    this.Inv = e                             
		},  
		getCollect(options) {
			this.Inv = options.type;
		},
		btn(goods_id) {
			// 传参
			uni.navigateTo({
				 url: '../detial/detial?goods_id='+goods_id
			})	
		}
	  },
	  onLoad:function(options) {
		this.getCollect(options);	
	  },
	  onShow() {
		  const collect = uni.getStorageSync('collect')||[];
		  this.collect = collect;
		  
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
		.collect_main {
			background-color: #f3f4f6;
			.collect_title {
				padding: 40rpx 0;
				.collect_tips {
				   	padding: 15rpx;
					border: 1rpx solid #ccc;
					margin-left: 25rpx;
					background-color: #fff;
				}
				.active {
					color: red;
					border-color: red;
				}
			}
			.collect_content {
				background-color: #fff;
				padding: 0 25rpx;
				.goods_item {
					display: flex;				
					width: 100%;
					border-bottom: 1rpx solid #ccc;
					background-color: #fff;
					.good_img_wrap {
						flex: 2;
						display: flex;
						justify-content: left;
						align-items: center;
						image {
							width: 100%;
						}
					}
					.goods_info_wrap {
						flex: 3;
						display: flex;
						flex-wrap: wrap;
						// flex-direction: column;
				        align-items: center;
						.goods_name {
						  display: -webkit-box;
						  overflow: hidden;
						  -webkit-box-orient: vertical;
						  -webkit-line-clamp: 2;
						}
						.goods_price {
							color: red;
							font-size: 38rpx;
						}
					}
				}
			}
		}
	}
</style>
