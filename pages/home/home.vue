<template>
	<view class="home"> 
	   <!-- 顶部导航栏 -->
	   <view class="topBar">
	   	  <view class="left">
	   	  	 <b><text class="iconfont icon-caidan2"></text></b>
			 <!-- #ifdef APP-PLUS -->
             <view style="margin-top: 60rpx; font-size: 1.3rem;">三</view>
             <!-- #endif -->
	   	  </view>
		  <view class="mid" @click="search">
			 <i class="iconfont icon-sousuo"></i>
			 <!-- #ifdef APP-PLUS -->
			 <image src="../../static/sousuo.png" mode="widthFix"
			  style="width: 40rpx; height: 40rpx; position: absolute; z-index: 9;margin-left: 30rpx; margin-top: 16rpx;"></image>
			 <!-- #endif -->
		  	 <input type="text" hover-class="none" disabled/>
			 <text>iphone12</text>
		  </view>
		  <view class="right">
			 <block v-if="token==''">
				 <navigator url="../login/login" hover-class="none" class="login">登录</navigator>
			 </block>
			 <block v-else>
				 <navigator open-type="switchTab" url="../myself/myself" hover-class="none"><i class="iconfont icon-yonghu"></i></navigator>
			     <!-- #ifdef APP-PLUS -->
			     <navigator open-type="switchTab" url="../myself/myself" hover-class="none">
				  <image src="../../static/yonghu.png" mode="widthFix" style="width: 50rpx; height: 50rpx; margin-top: 60rpx;"></image>
			     </navigator> 
				 <!-- #endif -->
			 </block>
		  </view>
	   </view>
	   <!-- 轮播图 -->
	   <swiper indicator-dots circular autoplay interval="3000">
		   <swiper-item v-for="(item,i) in swipers" :key="item.goods_id">
			  <image :src="item.image_src"></image>
		   </swiper-item>
	   </swiper>
	   <!-- 导航区域 -->
	   <view class="nav" v-show="isShow">
            <image :src="category" class="category" @click="cateGory"></image>
			<image :src="seckill"></image>
			<image :src="supermarket"></image>
			<image :src="maternal"></image>
	   </view>
	   <!-- 楼层 -->
	   <view class="floor">
	      <!-- 户外活动 -->
		  <view class="womanFashion" v-for="(item, index1) in outDoor" :key="item.name">
              <view class="header_woman">
			  	  <image mode="widthFix" :src="item.floor_title.image_src"></image>
			  </view>
			  <view class="detail" style="width: 98%; margin: auto;">			 
				  <view class="detail_img" v-for="(list, index2) in item.product_list" :key="list.name">
					  <image mode="index2===1?'widthFix':'scaleToFill'" :src="list.image_src" @click="btn(index2)"></image>
				  </view>  
			  </view>
		  </view>
	   </view>
	   <!-- 一键触顶 -->
	   <view class="top-button" @click="ToTop" :style="{'display':(topState===true? 'block':'none')}">
		   <image src="../../static/top.png"></image>
	   </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  token: '',
			  swipers: [],
			  category: '', // 分类	  
              seckill: '',  // 秒杀拍
			  supermarket: '', // 超市购
			  maternal: ''  ,// 母婴品
			  outDoor: [],
			  topState:false,  // 页面触顶
			  // 页面刷新
			  ifOnShow: false,
			  isShow: true
			}
		},
		methods: {
			search() {
			  uni.navigateTo({
			  	url: '../search/search'
			  })
			},
			// 轮播图
			async getSwiper() {
				const res = await this.$myRequest({
					url: '/home/swiperdata',
				})
				this.swipers = res.data.message
				console.log(res)
			},
			// 导航区域
			async getNav() {
				const res = await this.$myRequest({
					url: '/home/catitems'
				})
				const a = res.data.message
			    this.category = a[0].image_src 
				this.seckill = a[1].image_src
				this.supermarket = a[2].image_src
				this.maternal = a[3].image_src
			},
		    // 楼层
			async getFloor() {
				const res = await this.$myRequest({
					url: '/home/floordata'
				})
				this.outDoor = res.data.message		
			},
			// 一键触顶
			ToTop() {
			  uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			  })
			},
			// 分类跳转
			cateGory() {
				uni.switchTab({
					url: '../classify/classify'
				})
			},
		    onPageScroll(e){ //根据距离顶部距离是否显示回到顶部按钮
		      if(e.scrollTop>600){ //当距离大于600时显示回到顶部按钮
		        this.topState = true
		      }else{ //当距离小于600时显示回到顶部按钮
		        this.topState = false
		    }	 
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				this.getFloor();
				this.getNav();
				this.getSwiper();

			}, 1500);
			
			  setTimeout(() => {
				uni.stopPullDownRefresh();
				// #ifdef H5
				location.reload()  
				// #endif
			  },1000)
			
		},
		onLoad() {
			// 轮播图
			this.getSwiper()
			// 导航栏
			this.getNav()
			// 楼层
			this.getFloor()
		},
		
		// 导航栏按钮事件
		onNavigationBarButtonTap(val) {
			if (val.text === '登录') {
				const token = uni.getStorageSync('token');
				if (token) {
					uni.switchTab({
						url: '../myself/myself'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			}
		}
		},
		onShow() {
			const token = uni.getStorageSync('token');
			this.token = token;
		}
	}
</script>

<style lang="less">
	@border: 1px red solid;
	.home {
		width: 100%;
		// 顶部导航栏
		.topBar {
			width: 100%;
			height: 90rpx;
			/* #ifdef APP-PLUS */
			height: 135rpx;
			/* #endif */
			background-color: rgb(181, 14, 3);
			position: fixed;
			z-index: 9;
			top: 0;
			display: flex;
			/* #ifdef APP-PLUS */
			
			/* #endif */
			.left {
				flex: 1;
				align-self: center;
				text-align: center;
				color: #fff;
				text {
				   font-size: 40rpx;
				   opacity: 0.95;
				}
			}
			.mid {
				flex: 6;
				align-self: center;
				/* #ifdef APP-PLUS */
				margin-top: 55rpx;
				/* #endif */
				input {
				  width: 98%;
				  border-radius: 50rpx 50rpx 50rpx 50rpx;
				  background-color: #fff;
				  margin: auto;
				  height: 60rpx;
				  text-align: left;
				  position: relative;
				 
				}
				i {
				  position: absolute;
				  z-index: 9;
				  color: gray;
				  font-size: 38rpx;
				  margin-left: 30rpx;
				  margin-top: 10rpx;
				}
				text {
				  color: #232326;
				  opacity: .7;
				  position: absolute;
				  margin-top: -53rpx;
				  margin-left: 90rpx;
				  /* #ifdef APP-PLUS */
				  margin-left: 80rpx;
				  /* #endif */
				  font-size: 1rem;
				}
			}
			.right {
				flex: 1;
				align-self: center;
				text-align: center;
				color: #fff;
				font-size: 14px;
				opacity: 0.95;
				.iconfont {
				   font-size: 40rpx;
				}
				/* #ifdef APP-PLUS*/
				.login {
				   margin-top: 55rpx;
				   font-size: 1rem;
				}
				/* #endif */
			}
		}
		// 导航轮播
		swiper {
			width: 100%;
			height: 400rpx;
			margin-top: 91rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		// 导航区域
		.nav {
			width: 100%;
			margin-top: 40rpx;
			margin-bottom: 60rpx;
			display: flex;
			image {
				height: 200rpx;
			}
		}
	    // 时尚女装
		.womanFashion {	  
		  .header_woman {	 
			  padding: 10rpx 0;
			  image {
				  width: 100%;
			  }
		  }
		  .detail {
			overflow: hidden;
			.detail_img {		  
			  float: left;
			  width: 33.33%;
			  // 对后四张图片操作
			  :nth-last-child(-n+5) {
				 margin-left: 10rpx;
			  }
			  &:nth-child(1){
			      height: 57vw;
				  margin-left: -15rpx;
			  }
			  &:nth-child(2) {
				  border-bottom: 10rpx solid #fff;
				  height: 33.33vw * 386 / 232 / 2; 		  
			  }
			  &:nth-child(3){
				  border-bottom: 10rpx solid #fff;
				  height: 33.33vw * 386 / 232 / 2;
			  }
			  &:nth-child(4) {
				  border-bottom: 10rpx solid #fff;
				  height: 33.33vw * 386 / 232 / 2;
			  }
			  &:nth-child(5) {
				  height: 33.33vw * 386 / 232 / 2;
			  }
			  image {
				 width: 100%;
				 height: 100%;
			  }
			 }
			}
		}
	    // 一键触顶
		.top-button {
	       position: fixed;
	       right: 23rpx;
	       bottom: 150rpx;
	       z-index: 9999;
		   image {
			   width: 90rpx;
			   height: 90rpx;
		   }
	    }
	}
    @media screen and (min-width: 1024px){
    	.home {
    		width: 100%;
    		// 导航轮播
    		swiper {
    			width: 100%;
    			height: 900rpx;
    			image {
    				width: 100%;
    				height: 100%;
    			}
    		}
    		// 导航区域
    		.nav {
    			width: 100%;
    			margin-top: 55rpx;
    			display: flex;
    			justify-content: space-around;
    			image {
    				height: 570rpx;
    			}
    		}
    	    // 楼层
    		.floor {
    			width: 100%;
				margin-top: 130rpx;	
				// 时尚女装
				.womanFashion {	  
				  .header_woman {	 
					  // padding: 40rpx 0 20rpx 0;
					  image {
						  width: 100%;
					  }
				  }
				  .detail {
					overflow: hidden;
					.detail_img {		  
					  float: left;
					  width: 33.33%;
					  // 对后四张图片操作
					  :nth-last-child(-n+4) {
					     // height: 33.33vw * 386 / 232 / 2;
						 margin-left: 10rpx;
					  }
					  &:nth-child(1){
					     height: 55.8vw;
					  }
					  &:nth-child(2) {
						  border-bottom: 10rpx solid #fff;
						  height: 33.33vw * 386 / 232 / 2; 
						  
					  }
					  &:nth-child(3){
						  border-bottom: 10rpx solid #fff;
						  height: 33.33vw * 386 / 232 / 2;
					  }
					  &:nth-child(4) {
						  border-bottom: 10rpx solid #fff;
						  height: 33.33vw * 386 / 232 / 2;
					  }
					  &:nth-child(5) {
						  height: 33.33vw * 386 / 232 / 2;
					  }
					  image {
						 width: 100%;
						 height: 100%;
					  }
					 }
					}
				}
    	}
       }
	}
</style>

