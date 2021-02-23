const BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 同时发送异步代码的次数
let ajaxTimes = 0;
export const myRequest = (options) => {
	ajaxTimes++;
	// 显示加载中效果
	uni.showLoading({
	    title: '加载中',
		mask: true
	});
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res);
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			},
			complete() {
				ajaxTimes--;
				if (ajaxTimes === 0) {
				   // 关闭loading效果
				   uni.hideLoading();
				}
				
			}
		})
	})
}