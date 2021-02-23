<template>
	<view class="cates">
        <view class="cates_container">
        	<!-- 左侧菜单 -->
			<scroll-view scroll-with-animation="true" show-scrollbar scroll-y class="left_menu">
			   <view class="menu_item" v-for="(item,index) in leftMenuList" :key="item" :class="{active:index===currentIndex}" @click="changeColor(index)">
				   {{item}}
			   </view>
			</scroll-view>
			<!-- 右侧商品内容 -->
			<scroll-view :scroll-top="scrollTop" scroll-with-animation="true" show-scrollbar scroll-y class="right_content">
				<view class="goods_group" v-for="item in rightContent" :key="item.cat_id">
					<view class="goods_title">
						<text class="delimiter">/</text>
						<text class="title">{{item.cat_name}}</text>
						<text class="delimiter">/</text>
					</view>
					<view class="goods_list">
					  <view class="navigator" @click="nav(list.cat_id,list.cat_name)" v-for="list in item.children" :key="list.cat_id">
						  <image mode="widthFix" :src="list.cat_icon"></image>
						  <view class="goods_name">{{list.cat_name}}</view>
					  </view>
					</view>
				</view>			
			</scroll-view>
        </view>
	</view>
</template>                                                                              

<script>
	export default {
		data() {
			return {
				// 左侧的菜单数据
				leftMenuList: [],
				// 右侧的商品数据
				rightContent: [],
				// 被点击的左侧菜单
				currentIndex: 0,
				// 右侧内容的滚动条距离顶部的距离
				scrollTop: 0,
				// 页面刷新 
				ifOnShow: false,
			}	
		},
		// 接口的返回数据
		Cates: [],
		
		methods: {
			// 请求数据
            async getCates() {
				const res = await this.$myRequest({
					url: '/categories'
				});
				this.Cates = res.data.message;				
				// 把接口数据存入到本地存储中
				uni.setStorageSync("cates", {time:Date.now(), data: this.Cates});
				
				// 构造左侧的大菜单数据
				let leftMenuList = this.Cates.map(v => v.cat_name);
				// 构造右侧的商品数据
				let rightContent = this.Cates[0].children;
				
				// 赋值
				this.leftMenuList = leftMenuList;
				this.rightContent = rightContent;
				// console.log(this.rightContent)
				//console.log(res.data.message);
			},
		    // 左侧菜单的点击事件
			changeColor(index) {
				// 隔行变色
				this.currentIndex = index;
				// 联动
				let rightContent = this.Cates[index].children;
				this.rightContent = rightContent;
				// 重新设置右侧scroll-view到顶部的距离				
				this.scrollTop == 0;
				this.scrollTop--;
			},
		    nav(id, name) {
				// 传参
				uni.navigateTo({
					// 页面跳转并传参	
					url: "../television/television?"+'id='+id+'&'+'name='+name
				})
			}
		},
		onLoad() {		
		  // 1 获取本地存储中的数据
		  const Cates = uni.getStorageSync("cates");
		  // 判断是否有本地存储好的数据
		  if(!Cates) {
				// 没有，调用接口，渲染页面
			this.getCates();
		  } else {
			// 有旧数据 定义过期时间 10s
			if(Date.now()-Cates.time>1000*1){
				// 重新发送请求
				this.getCates();
			}else{
				// 使用旧数据渲染页面
				this.Cates = Cates.data;
				let leftMenuList = this.Cates.map(v => v.cat_name);
				let rightContent = this.Cates[0].children;				
				this.leftMenuList = leftMenuList;
				this.rightContent = rightContent;
			}
		  }		
		},
        // 点击输入框跳转页面
        onNavigationBarSearchInputClicked () {
        	uni.navigateTo({
        		url: '../search/search'
        	})
        },
		onNavigationBarButtonTap(val) {
			console.log(val.float)
			uni.switchTab({
				url: '../home/home'
			})
		},		
		onShow() {
			// #ifdef H5
     //      	if(this.ifOnShow){
     //      	  setTimeout(() => {
				 //  location.reload()
			  // },4)      				  
     //      	}
			// #endif
		},
		onHide(){
			// // #ifdef H5
		 //    this.ifOnShow = true
   //          this.rightContent = ''
			// this.leftMenuList = ''
			// // #endif
		}
	}
</script>

<style lang="less">
	.cates {
		height: 100%;
		.cates_container {
			height: ~'calc(100vh - 10rpx)';
			display: flex;
			// 左侧菜单
			.left_menu {
				flex: 2;
				background-color: #f2f2f2;
				border: 1px #f2f2f2 solid;
				.menu_item {
					height: 80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;					
				}
			    .active {
					color: red;
					background-color: #FFFFFF;
				}
			}
			// 右侧商品
			.right_content {
				flex: 5;
				.goods_group {					
					.goods_title{
						height: 80rpx;
						display: flex;
						justify-content: center;
                        align-items: center;
						.delimiter {
							color: #ccc;
							padding: 0 10rpx;
						}
					}
					.goods_list {
					   width: 100%;					   
					   display: flex;
					   flex-wrap: wrap;
					   .navigator {
						   width: 32%;
                           margin-bottom: 20rpx;
						   text-align: center;
						   image {
						   	 width: 70%;				   
						   }
						 
					   }
					}
				}
			}
		}
	}
	@media screen and (min-width: 1024px){ 
	.cates {
		height: 100%;
		.cates_container {
			// 左侧菜单 
			.left_menu {
				flex: 2;
				background-color: #f2f2f2;
				border: 1px #f2f2f2 solid;
				.menu_item {
					height: 150rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 60rpx;					
				}
			  }
			}
		}
	  }	
	
	.goods_list .navigator{
		background-color: #FFFFFF;
	}
</style>
