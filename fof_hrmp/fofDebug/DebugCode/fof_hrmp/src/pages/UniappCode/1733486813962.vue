<template>
    <view class="zhu3qu1kua4ibu4ju2">
        <button @click="this.dia3nji1hui2tia2o" type="primary">{{this.bia1oti2}}</button>
    </view>
</template>
<script>

    import uniappfofClass from '/common/fof.js';
    import uniappCalendar from '/common/fofCalendar.js';
    import updateManager from '/common/updateManager.js';
    
    
    
    import uniappCanvas from '/common/fofCanvas.js';
    
    import uniappBluetooth from '/common/fofBluetooth.js';
    import uniappfofGame from '/common/fofGame.js';
    import uniappfofwx from '/common/fofWx.js';
    import uniappfofPopup from '/common/fofPopup.js';
    import uniappfofRefsArr from '/common/fofRefsArr.js';
    import uniappGoodsNav from '/common/fofUniGoodsNav.js';
    
    import uniappUnifab from '/common/fofUnifab.js';
    
    
    
    
    import uniappfofwebsocket from '/common/websocketUniapp.js';
    import uniappfofDom from '/common/fofDom.js';
    
    
    
    


    export default {
        
        data() {
            return {
                
        //suo3yo3udeye4mia4nshu4ju4,qi3ngza4ibe3nchu4di4ngyi4
        bia1oti2: "可开发个人中心布局"
    
            }
        }, onLoad(obj) {
            //#ifndef H5 || APP || APP-PLUS 
            
            //#endif
            
        }, methods: {

            
        //suo3yo3uye4mia4nfa1ngfa3,qi3ngza4ibe3nchu4di4ngyi4
        dia3nji1hui2tia2o: function () {
            console.log("你好,世界");
            uniappfofClass.showToast("你好,世界");
        },
    
        }, onPullDownRefresh(obj) {
            
        }, onShow(obj) {
            
        }, onHide(obj) {
            
        }, onShareAppMessage(obj) {
            
        }, onResize(obj) {
            
        }, onUnload(obj) {
            
        }, onReachBottom(obj) {
            
        }, onTabItemTap(obj) {
            
        }, onPageScroll(obj) {
            
        }, onReady(obj) {
            
        }, created() {
			//#ifdef MP-WEIXIN
			//{{showShareMenu}}wx.showShareMenu({withShareTicket: false,menus: ['shareAppMessage', 'shareTimeline']});
			//#endif
		}, onShareTimeline(obj) {
            
        }, onBackPress(obj) {
            
        }, props:{
            
        }
    }
</script>


<style>
    .zhu3qu1kua4ibu4ju2 {
        margin-top: 100rpx;
        width:80%;
        margin-left:10%;
    }
</style>