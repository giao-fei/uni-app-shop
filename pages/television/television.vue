<template>
  <view class="classify">
	  <view class="topBar">
		  <view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">综合</view>
		  <view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">销量</view>
		  <view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">价格</view>
	  </view>	  
	  <view class="card">	  
		 <view class="goods_item" v-for="item in goodsList" :key="item.goods_id" v-show="Inv == 0" @click="btn(item.goods_id)">
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
		 <view class="" v-show="Inv == 1">销量</view>
		 <view class="" v-show="Inv == 2">价格</view>
	  </view>
	  <!-- 一键触顶 -->
	  <view class="top-button" @click="ToTop" :style="{'display':(topState===true? 'block':'none')}">
	    <image src="../../static/top.png"></image>
	  </view>
  </view>
</template>

<script>
  export default {
	  name: 'television',
	  data() {
		  return {
			  Inv: 0, // 选中第一个
			  QueryParams: { // 接口要的参数
				 query: '',
				 cid: '',
				 pagenum: 1,
				 pagesize: 10 
			  },
			  // 获取接口参数
			  goodsList: [],
			  // 总页数
			  totalPages: 1,
			  // 页面触顶
			  topState:false
		  }
	  },
	  methods: {
	   // 顶部选项卡切换    
	   changeTab(e) {
		   this.Inv = e                             
	   },
       // 获取接口数据
	   async getGoodsList() {
		   const res = await this.$myRequest({
			   url: '/goods/search',
			   data: this.QueryParams
		   })
		   // 获取总条数
		   const total = res.data.message.total;
		   // 获取接口参数
		   this.goodsList = [...this.goodsList,...res.data.message.goods];
		   
		   // 计算总页数
		   this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
		   
		   console.log(res.data.message)
	   },
	   // 一键触顶
	   ToTop() {
	     uni.pageScrollTo({
	       scrollTop: 0,
	       duration: 300
	     })
	   },
	   // 跳转到详情页
	   btn(goods_id) {
		   // 传参
		   uni.navigateTo({
		   	 url: '../detial/detial?goods_id='+goods_id
		   })
	   }
	  },
	  onPageScroll(e){ //根据距离顶部距离是否显示回到顶部按钮
	      if(e.scrollTop>600){ //当距离大于600时显示回到顶部按钮
	          this.topState = true
	      }else{ //当距离小于600时显示回到顶部按钮
	          this.topState = false
	      }
	  },
	  onLoad(keyword) {
		console.log(keyword)
		// 动态设置导航栏搜索框内容
		// #ifdef APP-PLUS
		let webView = this.$mp.page.$getAppWebview();
		webView.setTitleNViewSearchInputText(keyword.name);
		// #endif
		// #ifdef H5
          	let inputSearch=document.querySelector('.uni-input-input[type=search]');
          	var evt = new InputEvent('input', {
          		inputType: 'insertText',
          		data: keyword,
          		dataTransfer: null,
          		isComposing: false
          	});
          	if(inputSearch){
          		inputSearch.value = keyword.name;
          		inputSearch.dispatchEvent(evt);
          	}
          	// #endif
		this.QueryParams.cid = keyword.id;	// 接收分类传过来的cat_id等于商品列表里面的cat_id
		this.getGoodsList();
	  },
	  // 点击输入框跳转页面
	  onNavigationBarSearchInputClicked() {
	  	uni.navigateTo({
	  		url: '../search/search'
	  	})
	  },
	  // 页面默认返回按钮事件
	  onBackPress() {},
	  // 下拉刷新
	  onPullDownRefresh() {
		setTimeout(() => {
			// 停止下拉动画
			uni.stopPullDownRefresh()
		},400) 
		uni.showLoading({
		    title: '加载中'
		});
		setTimeout(() => {
			// 重置数组
			this.goodsList = []
			// 重置页面
			this.QueryParams.pagenum = 1;
			// 重新发送请求
			this.getGoodsList()
		    uni.hideLoading();
		}, 1000);
	  },
	  // 滚动条触底事件
	  onReachBottom() {
		// 判断还有没有下一页数据
		if(this.QueryParams.pagenum>=this.totalPages) {
			uni.showToast({
				title: '到底了~~~',
				duration: 1500
			})
		} else {
			this.QueryParams.pagenum++;
			this.getGoodsList();
		}
	  }
   }
</script>

<style lang="less" scoped>
	@border: 1px red solid;
	.classify {
		width: 100%;
		// 一键触顶
		.top-button {
		   position: fixed;
		   right: 23rpx;
		   bottom: 80rpx;
		   z-index: 9999;
		   image {
			   width: 90rpx;
			   height: 90rpx;
		   }
		}
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
	    // 选项卡内容
		.card{
		  width: 100%;
		  position: relative;
		  top: 100rpx;
			  .goods_item {
				display: flex;				
				width: 100%;
				border-bottom: 1rpx solid #ccc;
				.good_img_wrap {
					flex: 2;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 70%;
					}
				}
				.goods_info_wrap {
					flex: 3;
					display: flex;
					flex-direction: column;
                    justify-content: space-around; 
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
</style>
