<template>
	<view>
		<!-- 遮罩 -->
		<view class="modal" @click="modal" v-show="isDomal" :style="{ height: this.app_height * 0.99 + 'rpx' }"></view>
		<!-- 轮播图 -->
		<view class="detail_swiper">
			<swiper indicator-dots="true" circular autoplay interval="3000">
				<swiper-item v-for="item in goodsObj.pics" :key="item.pics_id">
					<image mode="widthFix" :src="item.pics_big" @click="previewImage" data-url="item.pics_mid"></image>
				</swiper-item>
			</swiper>
		</view>
	    <!-- 价格 -->
		<view class="goods_price">￥{{goodsObj.goods_price}}</view>
	    <!-- 商品名称 -->
		<view class="goods_name_row">
			<view class="goods_name">{{goodsObj.goods_name}}</view>
		    <view class="goods_collect">
				<view @click="collect">
				  <image mode="widthFix" src="../../static/yishoucang.png" v-if="isCollect"></image>
				  <image mode="widthFix" src="../../static/weishoucang.png" v-else></image>		
				</view>		
				<view class="collect-text">收藏</view>
			</view>
		</view>
	    <!-- 图文详情 -->
		<view class="goods_info">
			<view class="goods_info_title">图文详情</view>
			<view class="goods_info_content">
				<!-- 富文本 -->
				<rich-text :nodes="goodsObj.goods_introduce"></rich-text>
			</view>
		</view>
	    <!-- 底部栏 -->
		<view class="btm_tool">
			<view class="tool_item">
				<view class="iconfont icon-service"></view>
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/kefu.png"></image>
				<!-- #endif -->
				<view class="text">客服</view>
				<button open-type="contact"></button>
			</view>
			<view class="tool_item">
				<view class="iconfont icon-fenxiang"></view>
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/fenxiang.png"></image>
				<!-- #endif -->
				<view class="text">分享</view>
				<button @click="share" :class="{'share-box': shareState}"></button>
			</view>
			<view class="tool_item" @click="cart">
				<view class="iconfont icon-gouwuche"></view>
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/gouwuche.png"></image>
				<!-- #endif -->
				<view class="num">
					<span style="font-size: 20rpx; letter-spacing: 1rpx;">{{totalNum}}</span>
				</view>
				<view class="text" style="position: relative;">购物车</view>
			</view>
			<view class="tool_item btn_cart" @click="handleCartAdd">
				加入购物车
			</view>
			<view class="tool_item btn_buy">
				立即购买
			</view>
		</view>
	    <!-- 分享弹出框 -->
		<view class="share-item" :class="{'share-show': shareState}">
			<view class="share-to">
				<text>分享到</text>
			</view>
			<view class="content">
				<view class="block" v-for="(item, index) in shareList" :key="index">
					<image :src="item.image" mode="widthFix" @click="img(index)"></image>
					<text>{{item.content}}</text>
				</view>
			</view>
			<view class="cancel" @click.stop="handleHiddenShare">
				<text>取消</text>
			</view>
		</view>	   
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsObj: [], // 定义一个数组
				shareList: [
					{image: "/static/weixin.png", content: '微信好友'},
					{image: '/static/pengyouquan.png', content: '朋友圈'},
					{image: '/static/qq.png', content: 'QQ好友'},
					{image: '/static/qqkongjian.png', content: 'QQ空间'},
					{image: '/static/weibo.png', content: '新浪微博'},
					{image: '/static/fuzhilianjie.png', content: '复制链接'},
				],
				shareState: false,
				app_height: 0, 
				isDomal: false,
				totalNum: '',
				isCollect: false
			}
		},
		GoodsInfo: {}, // 商品对象
		methods: {
			// 获取商品详情数据
			async getGoodsDetail(goods_id) {
				const res = await this.$myRequest({
					url: '/goods/detail',
					data: { goods_id }  // 将接收过来的商品id作为请求接口的条件
				});
				this.GoodsInfo = res.data.message;
				// 1、获取缓存中的商品收藏的数组
				let collect = uni.getStorageSync('collect')||[];
				// 2、判断商品是否被收藏
				let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
				this.isCollect = isCollect;
				this.goodsObj = {
					goods_name: res.data.message.goods_name,
					goods_price: res.data.message.goods_price,
					goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
					pics: res.data.message.pics
				}
			},
			// 收藏图标切换
			collect() {
				this.isCollect = !this.isCollect;
				let isCollect = false;
				// 获取缓存中收藏的商品数组
				let collect = uni.getStorageSync("collect")||[];
				// 判断商品是否被收藏过
				let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
				// 当index != -1表示已经收藏过了
				if (index!==-1) {
					// 收藏过了
					collect.splice(index,1);
					isCollect=false;
					uni.showToast({
						title: '取消收藏~',
						image: '../../static/quxiaoshoucang.png',
						duration: 1000
					})
				} else {
					// 没有收藏
					collect.push(this.GoodsInfo);
					isCollect=true;
					uni.showToast({
						title: '已收藏',
						image: '../../static/yishoucang.png',
						duration: 1000
					})
				}
				// 把数组存入缓存中
				uni.setStorageSync('collect', collect);
				// 修改data中的属性
				this.isCollect = isCollect;
			},
			// 图片预览
			previewImage(e) {
				const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
				const current = e.currentTarget.dataset.url;
				uni.previewImage({
					urls: urls,
					current: current,
					loop: "true",
					indicator: "Number"
				})
				console.log('123')
			},
			// 跳转到购物车页面
			cart() {
				uni.switchTab({
					url: '../cart/cart'
				})
			},
			// 点击遮罩层
			modal() {
				this.isDomal = false
				this.shareState = false
			},
			// 分享
			share() {
				this.shareState = true
				this.isDomal = true  // 遮罩层关闭
			},
			// 取消分享
			handleHiddenShare() {
				this.shareState = false	
				this.isDomal = false
			},
			// 分享给微信好友
			img(index) {
			    console.log(index)
			},
			// 加入购物车
			handleCartAdd() {
                const token = uni.getStorageSync('token');
				if(token) {
					// 1、先获取缓存中的购物车
					let cart = uni.getStorageSync("cart") || [];
					// 2、判断 商品对象是否存在购物车中
					let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id);
					if(index === -1) {
						// 3、不存在 第一次添加
						this.GoodsInfo.num = 1;
						this.GoodsInfo.checked = true;
						cart.push(this.GoodsInfo);
					} else {
						// 4、已经存在购物车数据 执行 num++
						cart[index].num++;
					}
					// 5、把购物车重新添加回缓存中
					uni.setStorageSync("cart", cart);
					// 6、弹窗提示
					uni.showToast({
						title: '加入成功',
						icon: 'success',
						mask: true,
						duration: 500
					})
					this.totalNum++;
					uni.setStorageSync('allNum', this.totalNum)
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			}
		},
		onLoad() { // 接收参数
		  // 高度
		  uni.getSystemInfo({
			  success: res => {
				  // console.log('手机可用高度:' + res.windowHeight * 2 + 'rpx');
				  this.app_height = res.windowHeight * 2;
			  }
		  });
		},
		onShow: function() {
		  let pages = getCurrentPages();
		  let currentPage = pages[pages.length-1];
		  let options = currentPage.options;
		  const {goods_id} = options;
		  this.getGoodsDetail(goods_id); // 将goods_id赋值给getGoodsDetail方法中
		  
		  const a = uni.getStorageSync('allNum')
		  this.totalNum = a
		  console.log(a)
		}
	}
</script>

<style lang="less">
	// 遮罩层
    .modal {
		width: 100%;
		background-color: rgba(0,0,0,.3);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
	.detail_swiper {
		swiper {
			height: 68vw;
			text-align: center;
			image {
				width: 60%;
			}
		}
	}
	.goods_price {
		padding: 15rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: red;
	}
	.goods_name_row {
		display: flex; 
		border-top: 5rpx solid #dedede;
		border-bottom: 5rpx solid #dedede;
		padding: 10rpx 0;
		.goods_name {
		  flex: 5;			
		  color: #000;
		  font-size: 30rpx;
		  padding: 0 10rpx;
		  letter-spacing: 3rpx;
		  display: -webkit-box;
		  overflow: hidden;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 10;
		}
		.goods_collect {
		  flex: 1;
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  align-items: center;
		  border-left: 1rpx black solid;
			image {
				width: 45rpx;
				height: 45rpx;
			}
			.collect-text {
				font-size: .9rem;
			}
		}
	}
	.goods_info {
	   .goods_info_title {
		   font-size: 32rpx;
		   color: red;
		   font-weight: 600;
		   padding: 20rpx;
	   }
	   .goods_info_content {
		   margin-bottom: 100rpx;
	   }				
	}
	.btm_tool {
		  border-top: 1rpx solid #ccc;
		  position: fixed;
		  left: 0;
		  bottom: 0;
		  width: 100%;
		  height: 100rpx;
		  background-color: #fff;
		  display: flex;
		  letter-spacing: 5rpx;
		    .iconfont {
			  font-size: 40rpx;
		    }
			.text {
			  margin-top: 5rpx;
			}
			.tool_item {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;	
				font-size: 27rpx;	
			    position: relative;
				.num {
					display: flex; 
					align-items: center; 
					justify-content: center; 
					color: #fff; 
					position: absolute; 
					border-radius: 50%; 
					right: 20rpx; 
					top: 0; 
					width: 30rpx; 
					height: 30rpx; 
					background-color: red;
				}
				button {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				/* #ifdef APP-PLUS*/
				image {
					width: 40rpx;
					height: 40rpx;
				}
				/* #endif */
			}
			.btn_cart {
				flex: 2;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #ffa500;
				color: #fff;
				font-size: 30rpx;
				font-weight: 600;
			}
			.btn_buy {
				flex: 2;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #eb4450;
				color: #fff;
				font-size: 30rpx;
				font-weight: 600;
			}
		}	
	
	// 进入分享动画
	.share-show {
		transition: all 0.3s ease;
		transform: translateY(0%) !important;
	}
	// 离开分享动画
	.share-item {
		position: fixed;
		left: 0;
		bottom: -0.1rpx;
		width: 100%;
		height: auto;
		background-color: #FFF;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 1999;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 25rpx;
		.share-to {
			width: 100%;
			height: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			letter-spacing: 5rpx;
			&::after {
				content: '';
				width: 240rpx;
				height: 0rpx;
				border-top: 1px solid #E4E7ED;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				margin-left: 30rpx;
			}
			&::before {
				content: '';
				width: 240rpx;
				height: 0rpx;
				border-top: 1px solid #E4E7ED;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				margin-right: 30rpx;
			}
		}
		.content {
			width: 100%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			.block{
				width: 33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 180rpx;
				image {
					width: 90rpx;
					height: 90rpx;
				}
				text {
					margin-top: 16rpx;
					font-size: 28rpx;
					color: black;
					letter-spacing: 3rpx;
				}
			}
		}
		.cancel {
			width: 100%;
			height: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			letter-spacing: 5rpx;
			border-top: 1rpx lightgray solid;
		}
	}
    
</style>
