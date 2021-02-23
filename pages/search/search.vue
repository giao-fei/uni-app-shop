<template>
	<view>
		<view class="search_content">
			<view class="search_item" v-for="(item,i) in goods" :key="item.goods_id">
				<navigator url="#" @click="nav(item.goods_id)" hover-class="none">
				  <text>{{item.goods_name}}</text>
				  <view><image :src="item.goods_small_logo?item.goods_small_logo:'http://image3.suning.cn/uimg/b2c/newcatentries/0070082592-000000000602606780_2_400x400.jpg'" mode="widthFix"></image></view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  // ifOnShow: false // 页面刷新
			  goods: [],
			  text: '',     // 输入框的值
			  TimeId: -1
			}
		},
		methods: {
			// 搜索
			async qsearch(query) {
				const res = await this.$myRequest({url: '/goods/search', data: {query}});
				this.goods = res.data.message.goods;
				// console.log(this.goods)
			},
			// 跳转到详情页
			nav(goods_id) {
			  uni.navigateTo({
			  	url: '../classify/detial?goods_id='+goods_id
			  })
			}
		},	
		onShow() {
			// #ifdef H5
		    // if(this.ifOnShow){
		    //  setTimeout(() => {
			//	location.reload()  
			//  },0.1)
		    // }
			// #endif
		},
		onHide(){
			// #ifdef H5
		    // this.ifOnShow = true
			// #endif
		},
		// 搜索 监听原生标题栏按钮点击事件，参数为Object
		onNavigationBarButtonTap() {
			// 1、获取输入框的值
			const {text} = this.text;
			// 2、检测合法性
			if(!text.trim()) {
				this.goods = ''
				// 不合法
				return;
			}
			this.qsearch(text)
		},
		// 监听原生标题栏搜索输入框输入内容变化事件
		onNavigationBarSearchInputChanged(val) {
			this.text = val;
			// // 1、获取输入框的值
			const {text} = val;
			// 2、检测合法性
			if(!text.trim()) {
				// 不合法
				this.goods = '';
				return;
			} else {
				// 3、准备发送请求获取数据
				clearTimeout(this.TimeId);
				   // 防抖
				this.TimeId=setTimeout(() => {
				    this.qsearch(text);	   
				},600);	
			}			
		},
		// 	监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
		onNavigationBarSearchInputConfirmed(val) {
			// 1、获取输入框的值
			const {text} = this.text;
			// 2、检测合法性
			if(!text.trim()) {
				this.goods = '';
				// 不合法
				return;
			}
			this.qsearch(text)
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
		
	}
	.search_content {
		.search_item {
			background: #fff;
			font-size: 26rpx;
			align-items: center;
			width: 93%;
			margin: auto;
			padding: 25rpx 0 25rpx 0;
			border-bottom: 1px solid #ccc;
            font-size: 30rpx;
			color: #666;
			overflow: hidden;
			navigator {
				display: flex;
				flex-wrap: wrap;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
                    display: -webkit-box;					
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
				image {
					margin-left: 5%;
					margin-top: 30rpx;
				}
			}
		}
	}
</style>
