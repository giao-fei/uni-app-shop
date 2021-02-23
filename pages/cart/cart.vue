<template>
   <view class="active">
	   <!-- 购物车标题 -->
	   <view class="cart_top">
		   <view class="cart_title">购物车({{allCommodities}})</view>
		   <view class="cart_mangement" @click="mangement">管理</view>
	   </view>
	   <!-- 收货地址 -->
	   <view class="revice_address_row">
		   <!-- 当收货地址不存在时按钮显示 -->
		  <view class="address_btn" v-if="show">
		  	<button plain type="primary" @click="handleChooseAddress">添加收货地址</button>
		  </view> 
		  <!-- 当收货地址存在时隐藏按钮 -->
		  <view class="address_text" v-else @click="handleChooseAddress">
			  <view class="getAddress">收货地址：{{address}}</view>
			  <view><image style=" width: 40rpx; height: 40rpx; " src="../../static/right.png"></image></view>
		  </view>
	   </view>
	   <!-- 购物车内容 -->
       <view class="cart_content">
		  <view class="cart_main">
			<block v-if="cart.length!==0">
				<view class="cart_item" v-for="(item, index) in cart" :key="item.index">
				    <!-- 复选框 -->
					<view class="cart_chk_wrap">
					  <checkbox-group @change="handeItemChange(item.goods_id)">
						  <checkbox :checked="item.checked"></checkbox>
					  </checkbox-group>	
					</view>   
					<!-- 商品图片 -->
					<view class="cart_img_wrap" @click="cartContent(item.goods_id)">  
					  <image mode="widthFix" :src="item.goods_small_logo"></image>	
					</view>
					<!-- 商品信息结构 -->
					<view class="cart_info_wrap">
					  <view class="goods_name" @click="cartContent(item.goods_id)">{{item.goods_name}}</view>
					  <view class="goods_price_wrap">
						  <view class="goods_price">
						  	{{item.goods_price}}
						  </view>
						  <view class="cart_num_tool">
						  	<button class="num_edit" @click="handleItemNumEdit(item.goods_id,del)">-</button>
							<text class="goods_num">
								{{item.num}}
							</text>
							<button class="num_edit" @click="handleItemNumEdit(item.goods_id,add)">+</button>
						  </view>
					  </view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="cartNull">
					<image mode="widthFix" src="http://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png"></image>
					<view>购物车空空如也，去逛逛吧~</view>
				</view>
			</block>
		  </view>
	   </view>
       <!-- 底部工具栏 -->
	   <view class="footer_tool">
			<!-- 全选 -->
			<view class="all_chk_wrap">
				<checkbox-group @change="handleItemAllCheck">
					<checkbox :checked="allChecked">全选</checkbox>
				</checkbox-group>
			</view>
			<!-- 总价格 -->
			<view class="total_price_wrap" :style="isShow ? '' : 'display:none;'" >
				<view class="total_price">
				  合计：<text class="total_price_text">￥{{totalPrice}}</text>	
				</view>
				<view>包含运费</view>
			</view>
			<!-- 结算 -->
            <view class="order_pay_wrap" :style="isShow ? '' : 'display:none;'" @click="handlePay">结算{{totalNum}}</view>
			<!-- 移入收藏夹 -->
			<view class="collection" :style="isDel ? '' : 'display:none;'" ></view>
			<!-- 删除 -->
			<view class="del" :style="isDel ? '' : 'display:none;'"  @click="delte">删除</view>
	   </view>
   </view>
</template>
<script>
	export default {
		data() {
			return {
			  allNum: '',        // 商品的总数量
			  address: '',  // 收货地址
			  show: false,
			  cart: [],      // 购物车数据
			  allChecked: false, 
			  totalPrice: 0,
			  totalNum: 0,
			  add: 1,
			  del: -1,
			  isShow: true,
			  isDel: false,
			  allCommodities: '', // 购物车商品件数
			  selectCommodities: []   // 选中商品的id数
			}
		},
		methods: {
			handleChooseAddress() {  // 获取当前位置
				uni.chooseLocation({
					success: (res) => {
					   const info = res.name + res.address
					   uni.setStorageSync("address", info)  
					}
				})
			},
			// 商品的选中
			handeItemChange(e) {				
				// 1、获取当前要修改的商品的id
				const goods_id = e;
				// 2、获取购物车数组
				let cart = this.cart;
				// 3、找到被修改的商品对象
				let index = cart.findIndex(v => v.goods_id === goods_id);
				// 4、选中状态取反
				cart[index].checked = !cart[index].checked;
				this.setCart(cart); 
			},
		    // 设置购物车状态同时 重新计算 底部栏的数据 全新总价格 购买数量
			setCart(cart) {				
				// 3、总价格 总数量
				let totalPrice = 0;
				let totalNum = 0;
				let allNum = 0;
				let allChecked = true;
				this.allCommodities = cart.length; // 重新计算购物车总的件数
				cart.forEach(v => {
					if(v.checked) {  // 如果为选中状态
						totalPrice+=v.num*v.goods_price;
						totalNum+=v.num;
					} else {
						allChecked = false
					}	
					allNum+=v.num;
				})
				// 判断数组是否为空
				allChecked = cart.length!=0?allChecked:false;		
				this.allNum = allNum;
			    uni.setStorageSync("allNum", this.allNum)
				this.totalPrice = totalPrice;
				this.totalNum = totalNum;
				this.allChecked = allChecked;
				uni.setStorageSync("cart", cart);
			    this.cart = cart;
				
			},
			// 商品的全选和反选
			handleItemAllCheck() {
				// 1、获取data中的数据
				let cart = this.cart;
				let allChecked = this.allChecked;
				// 2、修改值
				allChecked = !allChecked;
				// 3、循环修改cart数组中的商品选中状态
				cart.map(v=>v.checked = allChecked);
				// 4、把修改后的值 填充回data中或者缓存中
				this.setCart(cart);
			},
			// 商品数量编辑
			handleItemNumEdit(e,s) {
				// 1、获取传递过来的参数
				const operation = s;
				const id = e;
				// 2、获取购物车数组
				let cart = this.cart;
				// 3、找到需要修改的商品索引
				const index = cart.findIndex(v=>v.goods_id===id);
				// 4、如果数量小于1则禁用按钮
				if (cart[index].num === 1 && operation === -1) {
					uni.showModal({
						title: '提示',
						content: '您是否要删除?',
						success: (res) => {
						  if (res.confirm) {
							  cart.splice(index, 1)
							  this.setCart(cart);
						  } else if (res.cancel) {
							  console.log('我再想想');
						  }
						}
					}) 
				} else {
					// 5、进行修改数量
					cart[index].num+=operation;
					// 6、设置回缓存和data中
					this.setCart(cart);
				}
				
			},
			// 管理
			mangement() {
			  this.isShow = !this.isShow;
			  this.isDel = !this.isDel;
			},
			// 批量删除
			delte() {
			  // 1、获取选中当前要删除的商品id
			  let cart = this.cart;
			  // 2、删除商品对象
			  cart.forEach(v => {
				  if (v.checked === true) {
					uni.showModal({
						title: '提示',
						content: '您是否要删除?',
						success: (res) => {
						  if (res.confirm) {
							   cart = this.cart.filter((item) => {
								   return item.checked != true   
							   })
							   this.setCart(cart);
						  } else if (res.cancel) {
							  
						  }
						}
					})
				  }
			  })  				  
				  
			},
			// 结算
			handlePay() {
			  // 1、判断收货地址
			  const address = this.address;
			  const totalNum = this.totalNum;
			  if (!address) {
				 uni.showToast({
				 	title: '请选择收货地址~',
					image: '../../static/alert.png'
				 }) 
			  }
			  else if (totalNum === 0) {
				  uni.showToast({
				  	title: '请选择宝贝~',
				    image: '../../static/alert.png'	
				 })
			  }
			  else if (totalNum && address != 0) {
				  // 2、跳转到支付界面
				  uni.navigateTo({
				  	url: 'pay'
				  })
			  }
			  
			},
			// 点击进入详情
			cartContent(goods_id) {
			   // 传参
			   uni.navigateTo({
			   	 url: '../detial/detial?goods_id='+goods_id
			   })	
			}
		},
		onShow() {
			// 1、获取收货地址的信息
			const address = uni.getStorageSync("address");
			this.address = address;
			if (address) { // 如果存在收货地址
				this.show = false;
			} else {
				this.show = true;
			}
			
			// 2、获取缓存中的购物车信息
			const cart = uni.getStorageSync('cart') || [];
		    this.address = address;
			this.allCommodities = cart.length;
			this.setCart(cart);
		}
	}
</script>

<style lang="less">
  // 全局样式
  .active {
	  width: 100%;
	  overflow: hidden;
   }
   page {
	  background-color: #eaeaea;
   }
  // 购物车
  .cart_top {
	  width: 100%;
	  height: 300rpx;
	  background-color: #b50e03;
	  position: absolute;
	  display: flex;
	  flex-wrap: nowrap;
	  letter-spacing: 5rpx;
	  .cart_title {
		font-size: 45rpx;
		color: white;	
		padding-left: 25rpx;
	    position: absolute;
		top: 30rpx;
		/* #ifdef APP-PLUS */
		top: 70rpx;
		font-size: 40rpx;
		/* #endif */
		font-weight: blod;
	  }
	  .cart_mangement {
		color: white;
		position: absolute;
		top: 40rpx;
		right: 25rpx;
		font-weight: blod;
		font-size: 32rpx;
		/* #ifdef APP-PLUS */
		top: 80rpx;
		font-size: 30rpx;
		/* #endif */
	  }
  }  
   // 收货地址
  .revice_address_row {
	    margin-top: 100rpx;
		/* #ifdef APP-PLUS */
		margin-top: 135rpx;
		/* #endif */
	    position: relative;
		.address_btn {
			padding: 20rpx;		
			button {
				width: 60%;
				color: white;
				border-color: white;
				letter-spacing: 10rpx;
				top: 25rpx;
			}
		}
		.address_text {
			letter-spacing: 5rpx;
			width: 93%;
			line-height: 50rpx;
			color: white;
		    margin: auto;
			display: flex;
			align-items: center;
		}
	}
  // 物品列表
  .cart_content {
	  position: relative;
	  margin-bottom: 100rpx;
	  .cart_main {
		padding: 0rpx 25rpx 20rpx 25rpx;
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
		  .cart_chk_wrap {
			  flex: 1;
			  display: flex;
			  justify-content: center;
			  align-items: center;
		  }
		  
		  .cart_img_wrap {
			  flex: 2;
			  display: flex;
			  justify-content: center;
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
					align-items: center;
					border: 1rpx solid #ccc;
					margin: 0rpx 5rpx 0rpx 5rpx;
				  }
			  }
		  }
		}  
	  }
	}
  }
  // 底部工具栏
  .footer_tool {
	  position: fixed;
	  /* #ifdef MP-WEIXIN */
	  bottom: 0;
	  /* #endif */
	  /* #ifndef MP-WEIXIN */
	  bottom: 50px;
	  /* #endif */
	  /* #ifdef APP-PLUS */
	  bottom: 0px;
	  /* #endif*/
	  left: 0;
	  width: 100%;
	  height: 90rpx;
	  background-color: #fff;
	  display: flex;
	  border-top: 1rpx solid #ccc;
	  .all_chk_wrap {
		  flex: 2;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  
	  }
	  
	  .total_price_wrap {
		  flex: 4;
		  padding-right: 15rpx;
		  text-align: right;
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
	  .collection {
		  flex: 4;
	  }
	  .del {
		  flex: 3;
		  background-color: red;
		  color: #fff;
		  font-size: 32rpx;
		  letter-spacing: 5rpx;
		  font-weight: blod;
		  display: flex;
		  justify-content: center;
		  align-items: center;
	  }
  }
   
</style>
