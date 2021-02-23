
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/classify/classify","pages/television/television","pages/detial/detial","pages/cart/cart","pages/order/order","pages/cart/pay","pages/myself/myself","pages/search/search","pages/login/login","pages/collect/collect"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"京东购物","navigationBarBackgroundColor":"#b50e03","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#b50e03","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"static/home.png","selectedIconPath":"static/home_select.png","text":"首页"},{"pagePath":"pages/classify/classify","iconPath":"static/classify.png","selectedIconPath":"static/classify_select.png","text":"分类"},{"pagePath":"pages/cart/cart","iconPath":"static/cart.png","selectedIconPath":"static/cart_select.png","text":"购物车"},{"pagePath":"pages/myself/myself","iconPath":"static/myself.png","selectedIconPath":"static/myself_select.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":false},"appname":"mobile_shop","compilerVersion":"2.9.7","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"onReachBottomDistance":10,"navigationStyle":"custom"}},{"path":"/pages/classify/classify","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"商品分类","titleNView":{"buttons":[{"text":"","fontSize":"30","float":"left","color":"#FFFFFF","width":"30px","type":"back"},{"text":"","fontSize":"16","float":"right","color":"#FFFFFF","fontWeight":"bold","width":"30px"}],"searchInput":{"align":"left","placeholder":"冬季羽绒服","borderRadius":"50rpx","backgroundColor":"#fff","disabled":"true","autoFocus":"true"}}}},{"path":"/pages/television/television","meta":{},"window":{"navigationBarTitleText":"曲面电视","enablePullDownRefresh":true,"backgroundTextStyle":"dark","titleNView":{"buttons":[{"text":"搜索","fontSize":"16","float":"right","color":"#FFFFFF","fontWeight":"bold","width":"50px"}],"searchInput":{"align":"left","placeholder":"","borderRadius":"50rpx","backgroundColor":"#fff","autoFocus":"true","disabled":"true"}}}},{"path":"/pages/detial/detial","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","navigationStyle":"custom"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"订单列表"}},{"path":"/pages/cart/pay","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/myself/myself","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的京东"}},{"path":"/pages/search/search","meta":{},"window":{"titleNView":{"buttons":[{"text":"","fontSize":"16","float":"right","color":"#FFFFFF","fontWeight":"bold","width":"50px"}],"searchInput":{"align":"left","placeholder":"请输入您要搜索的内容","borderRadius":"50rpx","backgroundColor":"#fff","autoFocus":"true"}}}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/collect/collect","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});