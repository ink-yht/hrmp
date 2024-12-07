import {
	createSSRApp,
} from "vue";
//${ import }
import App from "./App.vue";
//${ UniappFOFStudioClass }
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
