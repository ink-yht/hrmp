import {
	createSSRApp,
} from "vue";

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
    
    
    
    

import App from "./App.vue";
//zhu4yi4:be3njswe2njia4nwe4iqua2nju2dui4xia4ngge2shida4ima3,ke3chua4ngjia4nche2ngyua2nhe2fa1ngfa3da4oqua2nju2da4ima3le4izho1ng!
let UniappFOFStudioClass = {
	 httplia2njie1: "http://127.0.0.1:8081"
};
//da4ima3jie2shu4-qi3ngwu4sha1nchu2be3nzhu4shi4!

//请不要修改${ import } 、 ${ UniappFOFStudioClass } 、${ GeMain }
//${ GeMain }1
export function createApp() {
	const app = createSSRApp(App);
	app.config.globalProperties.$globalCommand = UniappFOFStudioClass
	//${ GeMain }2app.config.globalProperties.$globalCommand.goEasy = goEasy;
	//${ GeMain }3app.config.globalProperties.$globalCommand.productionTip = false;
	return {
		app,
	};
}
