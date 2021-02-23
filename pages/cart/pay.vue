<template>
  <view class="pay">
	  <!-- 收货地址 -->
	  <view class="address_text" @click="handleChooseAddress">
		  <view style="height: auto; display: flex; align-items: center;" class="icon1"><image src="../../static/shouhuo.png" style="margin-left: 20rpx; width: 35px; height: 35px;"></image></view>
		  <view class="getAddress">{{address}}</view>
		  <view style="height: auto; display: flex; align-items: center;" class="icon2"><image src="../../static/right-2.png"  style="width: 25px; height: 25px;"></image></view>
	  </view>
      <!-- 物品信息 -->
	  <view class="cart_content">
		  <view class="cart_main">
			<view class="cart_item" v-for="(item, index) in cart" :key="item.index"> 
				<!-- 商品图片 -->
				<view class="cart_img_wrap">  
				  <image mode="widthFix" :src="item.goods_small_logo"></image>	
				</view>
				<!-- 商品信息结构 -->
				<view class="cart_info_wrap">
				  <view class="goods_name">{{item.goods_name}}</view>
				  <view class="goods_price_wrap">
					  <view class="goods_price">
						{{item.goods_price}}
					  </view>
					  <view class="cart_num_tool">
						<text class="goods_num">
							x{{item.num}}
						</text>
					  </view>
				  </view>
				</view>
			</view>
		  </view>
	  </view>
      <!-- 底部工具栏 -->
      <view class="footer_tool">
		<!-- 总价格 -->
		<view class="total_price_wrap">
			<view class="total_price">
			<span style="font-size: 13px; color: rgb(153, 153, 153);">共{{totalNum}}件，</span>合计：<text class="total_price_text">￥{{totalPrice}}</text>	
			</view>
		</view>
		<!-- 结算 -->
		<view class="order_pay_wrap" @click="pay">提交订单</view>
      </view>
  </view>
</template>
  
<script>
  export default {
	name: 'pay',
	data() {
	  return {
		address: {},  // 收货地址	
		cart: [],      // 购物车数据
		totalPrice: 0,
		totalNum: 0
      }
	},
	methods: {
		// 获取上一个页面的收货地址
		getAddress() {
		  const a = uni.getStorageSync('address');
		  this.address = a;
		},
		// 更改收货地址
		handleChooseAddress() {  // 获取当前位置
			uni.chooseLocation({
				success: (res) => {
				   const info = res.name + res.address
				   uni.setStorageSync("address", info)  
				   this.getAddress()
				}
			})
		},
	    // 创建订单
		async pay() {
			const token = uni.getStorageSync('token');
			// 准备请求头参数
			const header = {Authorization: token}
			const order_price = this.totalPrice;
			const consignee_addr = this.address.all;
			const cart = this.cart;
			let goods = [];
			cart.forEach(v=>goods.push({
				goods_id: v.goods_id,
				goods_number:v.num,
				goods_price:v.goods_prices
			}))
			const orderParams={order_price,consignee_addr,goods}
			// 创建订单获取订单编号
			const res = await this.$myRequest({
				url: '/my/orders/create',
				method: 'POST',
				data: orderParams,
				header
			})
			console.log(res)
		}
	},
	onLoad() {
		// 地址
		this.getAddress();
		// 获取缓存中的购物车信息
		let cart = uni.getStorageSync('cart') || [];
		// this.cart = cart;  
		// 过滤后的购物车数组
		cart = cart.filter(v=>v.checked);
		// 总价格 总数量
		let totalPrice = 0;
		let totalNum = 0;
		cart.forEach(v => {
			totalPrice+=v.num*v.goods_price;
			totalNum+=v.num;
		})
		this.totalNum = totalNum;
		this.totalPrice = totalPrice;
		this.cart = cart;

	}
  }
</script>

<style lang="less">
  page {
	 background-color: #f2f2f2;
  }
  .pay {
	 margin: 24rpx 24rpx 24rpx 24rpx;
	 /* #ifdef APP-PLUS */
	 margin: 80rpx 24rpx 24rpx 24rpx;
	 /* #endif */
	  // 收货地址
	  .address_text {
		letter-spacing: 5rpx;
		line-height: 50rpx;
		color: #000000;
		margin: auto;
		display: flex;
		align-items: center;
		background-color: rgb(255, 255, 255);
		height: 150rpx;
		border-radius: 24rpx;
		.getAddress {
		  margin-left: 20rpx;
		  font-size: 14px;
		}
		/* #ifdef APP-PLUS */
		.icon1 {
			flex: 1;
		}
		.icon2 {
		    flex: 1;
		}
		.getAddress {
		   flex: 9;
		}
	    /* #endif */
	 }
	 // 物品列表
	 .cart_content {
	 	  position: relative;
	 	  padding-bottom: 130rpx;
	 	  .cart_main {
	 		.cartNull {
	 		   width: 100%;
	 		   display: flex;
	 		   flex-direction: column;
	 		   margin-top: 250rpx;
	 		   image {
	 			   width: 200rpx;
	 			   height: 200rpx;
	 			   flex: 1;
	 			   margin: auto;
	 		   }
	 		   view {
	 			   font-size: 40rpx;
	 			   letter-spacing: 4rpx;
	 			   margin-top: 40rpx;
	 			   flex: 1;
	 			   text-align: center;
	 		   }	
	 		}
	 		.cart_item {
	 		  background-color: white;
	 		  margin-top: 30rpx;
	 		  display: flex;
	 		  padding: 20rpx;
	 		  border-top-left-radius: 15rpx;
	 		  border-top-right-radius: 15rpx;
	 		  border-bottom-left-radius: 15rpx;
	 		  border-bottom-right-radius: 15rpx;
	 		  .cart_img_wrap {
	 			  flex: 2;
	 			  display: flex;
	 			  justify-content: space-between;
	 			  align-items: center;
	 			  image {
	 				width: 80%; 
	 			  }
	 		  }
	 		  
	 		  .cart_info_wrap {
	 			  flex: 4;
	 			  display: flex;
	 			  flex-direction: column;
	 			  justify-content: space-around;
	 			  .goods_name {
	 				display: -webkit-box;
	 				overflow: hidden;
	 				-webkit-box-orient: vertical;
	 				-webkit-line-clamp: 2;
	 				color: #666;
	 			  }
	 				  
	 		     .goods_price_wrap {
	 			  display: flex;
	             justify-content: space-between;
	 			  padding-top: 25rpx;
	 			  .goods_price {
	 				color: red;
	 				font-size: 34rpx;
	 				padding-top: 18rpx;
	 			  }
	 			  
	 			  .cart_num_tool {
	 				  display: flex;
	 				  .num_edit {
	 					width: 55rpx;
	 					height: 55rpx;
	 					display: flex;
	 					justify-content: center;
	 					align-items: center;
	 					border: 1rpx solid #ccc; 
	 				  }
	 				  
	 				  .goods_num {
	 					width: 50rpx;
	 					height: 50rpx;
	 					display: flex;
	 					justify-content: center;
	 					align-items: flex-end;
	 					margin: 8rpx 5rpx 0rpx 5rpx;
	 				  }
	 			  }
	 		  }
	 		}  
	 	  }
	 	}
	 }
	 // 底部工具栏
	 .footer_tool {
		  z-index: 999;
	 	  position: fixed;
	 	  bottom: 0;
	 	  left: 0;
	 	  width: 100%;
	 	  height: 100rpx;
	 	  background-color: #fff;
	 	  display: flex;
	 	  border-top: 1rpx solid #ccc;
	 	  .total_price_wrap {
	 		  flex: 4;
	 		  padding-right: 50rpx;
	 		  text-align: right;
			  align-self: center;
	 		  .total_price {
	 			  .total_price_text {
	 				font-size: 34rpx;
	 				font-weight: bold;
	 				color: red;
	 			  }
	 		  }
	 	  }
	 	  
	 	  .order_pay_wrap {
	 		  flex: 3;
	 		  background-color: red;
	 		  color: #fff;
	 		  font-size: 32rpx;
	 		  font-weight: bold;
	 		  display: flex;
	 		  justify-content: center;
	 		  align-items: center;
	 		  letter-spacing: 5rpx;
	 	  }
	 }
  }
</style>
