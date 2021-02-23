<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		onLaunch: function() {
			// #ifdef APP-PLUS
			//app关闭默认的启动 方法关闭启动图。但是这个时间不能太晚，6s 超时后依旧会主动关闭。
			setTimeout(()=>{
		        plus.navigator.closeSplashscreen();
	    	},3000)
			// #endif
		}
	}
</script>

<style scoped>
	/*每个页面公共css */
	/deep/ .uni-page-head-btn {
		text-align: center!important;
	}
	/* #ifdef APP-PLUS */
	/deep/ .uni-page-head-search-placeholder:before {
		font-size: 40rpx;
	}
	/* #endif */
	/* #ifdef H5 */
	/deep/ .uni-page-head-search-placeholder:before {
		font-size: 30rpx;
	}
	/* #endif */
	
	/deep/ uni-page-head .uni-page-head-hd {
		margin-top: 10rpx;
	}
	/* 复选框 */
	/deep/ .uni-checkbox-wrapper .uni-checkbox-input {
		width: 35rpx;
		height: 35rpx;
	}
	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		color: red;	
	}
</style>
