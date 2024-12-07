import uniappfofClass from '/common/fof.js';
import fofGameRocker from '/common/fofGameRocker.js';
var fofGameObj = {
	"timer": 0,
	"SpiritArrObj": {},//精灵列表信息
	"SpiritGroupArrObj": {},//精灵组列表信息
	"Fps": 60,//FPS
	"FpsGet": 0,
	"Seconds": 0,//秒数
	"Alpha": 1,//全局透明度
	"MapDataObj": {},//地图数据
	"宽度": 0,
	"高度": 0,
	"当前地图": [],
	"主角名称":"",
};
var fofGame = JSON.parse(JSON.stringify(fofGameObj));
//层级-1-10 越高绘制越高
//注意：精灵没有虚拟坐标！
let SpiritData = {
	"精灵名称": "",
	"图片地址": "",
	"x坐标": 0,
	"y坐标": 0,
	"渲染宽度": 0,
	"渲染高度": 0,
	"透明度": 1,
	"缩放倍数": 1,
	"层级": 1,
	"像素相似度": 0
};
let SpiritDataGroup = {
	"精灵名称": "",
	"图片地址": [],
	"x坐标": 0,
	"y坐标": 0,
	"渲染宽度": [],
	"渲染高度": [],
	"像素相似度": [],
	"透明度": 1,
	"缩放倍数": 1,
	"当前播放位置": 0,
	"当前播放帧": 0,//当前的播放帧
	"移动速度": 5,
	"中心点偏移X": 0,
	"中心点偏移Y": 0,
};
let MapData = {
	"地图名称": "",
	"图片地址": [],
	"x坐标": 0,
	"y坐标": 0,
	"渲染宽度": 0,
	"渲染高度": 0,
	"格子数据": []
};
//游戏引擎层开始=========================
//初始化游戏引擎
var canvasId;
const OpenfofGame = function (canvasId_, undate, FpsSize = 60, width, height) {
	canvasId = canvasId_;
	fofGame.Seconds = timestamp();
	uniappfofClass.createCanvasContext(canvasId_)
	fofGame.timer = setInterval(() => {
		fofGame.Fps = fofGame.Fps + 1;
		if (timestamp() != fofGame.Seconds) {
			fofGame.Seconds = timestamp();
			fofGame.FpsGet = fofGame.Fps;
			fofGame.Fps = 0;
		}
		undate()
	}, FpsSize);
	fofGame["宽度"] = width + 1;//+1也就是小数移位，防止屏幕多出一点
	fofGame["高度"] = height + 1;//+1也就是小数移位，防止屏幕多出一点
};
//结束游戏引擎
const DeletefofGame = function () {
	clearInterval(fofGame.timer)
	fofGame = JSON.parse(JSON.stringify(fofGameObj));
	uniappfofClass.draw();
};
//渲染更新
const UpdateRendering = function () {
	uniappfofClass.draw();
}
//设置全局透明度,0-1
const setGlobalAlpha = function (Alpha = 1) {
	fofGame.Alpha = Alpha;
	uniappfofClass.setGlobalAlpha(Alpha)
}
//画图片
const ImageSpirit = function (image, X, Y, dWidth = 0, dHeight = 0, sx = 0, sy = 0) {
	if (sx != 0 && sy != 0) {
		uniappfofClass.drawImage(image, X, Y, dWidth, dHeight, sx, sy);
	} else {
		if (dWidth != 0 && dHeight != 0) {
			uniappfofClass.drawImage(image, X, Y, dWidth, dHeight);
		} else {
			uniappfofClass.drawImage(image, X, Y);
		}
	}
}
//获取FPS
const GetFps = function () {
	return fofGame.FpsGet;
}
//游戏引擎层结束=========================
//精灵层开始=========================
//加入精灵信息
const addSpirit = function (SpiritTitle, image, x, y, scale, dWidth = 0, dHeight = 0) {
	if (dWidth != 0 && dHeight != 0) {
		let SpiritDataLet = JSON.parse(JSON.stringify(SpiritData));
		SpiritDataLet["精灵名称"] = SpiritTitle;
		SpiritDataLet["x坐标"] = x;
		SpiritDataLet["y坐标"] = y
		SpiritDataLet["渲染宽度"] = dWidth * scale;
		SpiritDataLet["渲染高度"] = dHeight * scale;
		SpiritDataLet["缩放倍数"] = scale;
		SpiritDataLet["图片地址"] = image;
		fofGame.SpiritArrObj[SpiritTitle] = SpiritDataLet;
		uni.canvasGetImageData({
			canvasId: canvasId,
			x: x,
			y: y,
			width: dWidth * scale,
			height: dHeight * scale,
			success(res) {
				fofGame.SpiritArrObj[SpiritTitle]["像素相似度"] = res.data.length;
			}
		})
	} else {
		uniappfofClass.getImageInfo(image, function (data) {
			if (data["图片宽度"] != undefined && data["图片高度"] != undefined) {
				let SpiritDataLet = JSON.parse(JSON.stringify(SpiritData));
				SpiritDataLet["精灵名称"] = SpiritTitle;
				SpiritDataLet["x坐标"] = x;
				SpiritDataLet["y坐标"] = y
				SpiritDataLet["渲染宽度"] = data["图片宽度"] * scale;
				SpiritDataLet["渲染高度"] = data["图片高度"] * scale;
				SpiritDataLet["缩放倍数"] = scale;
				SpiritDataLet["图片地址"] = image;
				fofGame.SpiritArrObj[SpiritTitle] = SpiritDataLet;
				uni.canvasGetImageData({
					canvasId: canvasId,
					x: x,
					y: y,
					width: data["图片宽度"] * scale,
					height: data["图片高度"] * scale,
					success(res) {
						fofGame.SpiritArrObj[SpiritTitle]["像素相似度"] = res.data.length;
					}
				})
			}
		})
	}
}
//获取整体精灵
const GetSpiritList = function () {
	return fofGame.SpiritArrObj;
}
//设置整体精灵-按照获取到的精灵整体格式填写到本参数中
const SetSpiritList = function (SpiritArrObj) {
	fofGame.SpiritArrObj = SpiritArrObj;
}
//设置精灵位置
const SetSpiritPosition = function (SpiritTitle, PositionX, PositionY) {
	if (fofGame.SpiritArrObj[SpiritTitle] != undefined) {
		fofGame.SpiritArrObj[SpiritTitle]["x坐标"] = PositionX;
		fofGame.SpiritArrObj[SpiritTitle]["y坐标"] = PositionY;
	}
}
//获取精灵位置
const GetSpiritPosition = function (SpiritTitle) {
	if (fofGame.SpiritArrObj[SpiritTitle] != undefined) {
		return { "x坐标": fofGame.SpiritArrObj[SpiritTitle]["x坐标"], "y坐标": fofGame.SpiritArrObj[SpiritTitle]["y坐标"] };
	} else {
		return {};
	}
}
//设置精灵层级-Hierarchy：1-10，越高绘制越上层
const SetSpiritHierarchy = function (SpiritTitle, Hierarchy = 1) {
	if (fofGame.SpiritArrObj[SpiritTitle] != undefined) {
		fofGame.SpiritArrObj[SpiritTitle]["层级"] = Hierarchy;
	}
}
//获取精灵层级
const GetSpiritHierarchy = function (SpiritTitle) {
	if (fofGame.SpiritArrObj[SpiritTitle] != undefined) {
		return fofGame.SpiritArrObj[SpiritTitle]["层级"];
	}
	return 1;
}
//设置精灵透明度-透明度0-1
const SetSpiritAlpha = function (SpiritTitle, Alpha) {
	if (fofGame.SpiritArrObj[SpiritTitle] != undefined) {
		fofGame.SpiritArrObj[SpiritTitle]["透明度"] = Alpha;
	}
}
//删除某个精灵
const DelSpirit = function (SpiritTitle) {
	delete fofGame.SpiritArrObj[SpiritTitle];
}
//播放精灵动画
const VidoeSpirit = function (SpiritTitle) {
	if (fofGame.SpiritArrObj[SpiritTitle] != undefined) {
		let MapTitle = fofGame["当前地图"][0];
		if (fofGame.MapDataObj[MapTitle] != undefined) {
			let ImageSpiritData = fofGame.SpiritArrObj[SpiritTitle];
			uniappfofClass.setGlobalAlpha(ImageSpiritData["透明度"])
			ImageSpirit(ImageSpiritData["图片地址"], ImageSpiritData["x坐标"] - fofGame.MapDataObj[MapTitle]["x坐标"], ImageSpiritData["y坐标"] - fofGame.MapDataObj[MapTitle]["y坐标"], ImageSpiritData["渲染宽度"], ImageSpiritData["渲染高度"])
			uniappfofClass.setGlobalAlpha(fofGame.Alpha)
		}
	}
}
//播放所有精灵动画
const VidoeSpiritAll = function () {
	var keys1 = [];
	for (var p1 in fofGame.SpiritArrObj) {
		if (fofGame.SpiritArrObj.hasOwnProperty(p1)) {
			keys1.push(p1);
		}
	}
	for (let Hierarchyindex = 0; Hierarchyindex < 10; Hierarchyindex++) {
		for (let index = 0; index < keys1.length; index++) {
			if (fofGame.SpiritArrObj[keys1[index]]["层级"] == Hierarchyindex + 1) {
				VidoeSpiritObj(Hierarchyindex + 1)
			}
		}
	}
}
//精灵层结束=========================
//精灵组层开始=========================
//加入精灵组信息
const addSpiritGroup = function (SpiritTitle, image = [], x, y, scale, MovingSpeed = 5, deviationX = 0, deviationY = 0) {
	let SpiritDataLet = JSON.parse(JSON.stringify(SpiritDataGroup));
	SpiritDataLet["精灵名称"] = SpiritTitle;
	SpiritDataLet["x坐标"] = x;
	SpiritDataLet["y坐标"] = y
	SpiritDataLet["缩放倍数"] = scale
	SpiritDataLet["移动速度"] = MovingSpeed
	SpiritDataLet["中心点偏移X"] = deviationX
	SpiritDataLet["中心点偏移Y"] = deviationY
	fofGame.SpiritGroupArrObj[SpiritTitle] = SpiritDataLet;
	for (let index = 0; index < image.length; index++) {
		uniappfofClass.getImageInfo(image[index], function (data) {
			if (data["图片宽度"] != undefined && data["图片高度"] != undefined) {
				let w = fofGame.SpiritGroupArrObj[SpiritTitle]["渲染宽度"];
				fofGame.SpiritGroupArrObj[SpiritTitle]["渲染宽度"][w.length] = data["图片宽度"] * scale
				let h = fofGame.SpiritGroupArrObj[SpiritTitle]["渲染高度"];
				fofGame.SpiritGroupArrObj[SpiritTitle]["渲染高度"][h.length] = data["图片高度"] * scale
				let image_ = fofGame.SpiritGroupArrObj[SpiritTitle]["图片地址"];
				fofGame.SpiritGroupArrObj[SpiritTitle]["图片地址"][image_.length] = image[index]
				let Box1 = [fofGame.SpiritGroupArrObj[SpiritTitle]["x坐标"], fofGame.SpiritGroupArrObj[SpiritTitle]["y坐标"], data["图片宽度"] * scale, data["图片高度"] * scale];
				uni.canvasGetImageData({
					canvasId: canvasId,
					x: Box1[0],
					y: Box1[1],
					width: Box1[2],
					height: Box1[3],
					success(res) {
						let length = fofGame.SpiritGroupArrObj[SpiritTitle]["像素相似度"].length;
						fofGame.SpiritGroupArrObj[SpiritTitle]["像素相似度"][length] = res.data.length;
					}
				})
			}
		})
	}
}
//获取整体精灵组
const GetSpiritListGroup = function () {
	return fofGame.SpiritGroupArrObj;
}
//设置整体精灵组-按照获取到的精灵整体组格式填写到本参数中
const SetSpiritListGroup = function (SpiritGroupArrObj) {
	fofGame.SpiritGroupArrObj = SpiritGroupArrObj;
}
//设置精灵组位置
const SetSpiritPositionGroup = function (SpiritTitle, PositionX, PositionY) {
	if (fofGame.SpiritGroupArrObj[SpiritTitle] != undefined) {
		fofGame.SpiritGroupArrObj[SpiritTitle]["x坐标"] = PositionX;
		fofGame.SpiritGroupArrObj[SpiritTitle]["y坐标"] = PositionY;
	}
}
//碰撞检测-SimilarityData检测碰撞概率【1-10】,越大检测越放松,当为10时,只要宽高任何边界碰撞上都会为真,默认7
//success-参数：对象类，储存对应碰撞精灵组、精灵等信息，以对象类中的【类型】属性区分，分别为：精灵组、精灵
const CollisionDetectionGroup = function (SpiritTitle, SimilarityData = 7, success = undefined) {
	if (fofGame.SpiritGroupArrObj[SpiritTitle] != undefined) {
		var keys1 = [];
		for (var p1 in fofGame.SpiritGroupArrObj) {
			if (fofGame.SpiritGroupArrObj.hasOwnProperty(p1)) {
				keys1.push(p1);
			}
		}
		for (let index = 0; index < keys1.length; index++) {
			if (keys1[index] != SpiritTitle) {
				let keys1Obj = fofGame.SpiritGroupArrObj[keys1[index]];
				if (keys1Obj["渲染宽度"].length >= keys1Obj["当前播放帧"] + 1) {
					//盒子
					let Box = [keys1Obj["x坐标"], keys1Obj["y坐标"], keys1Obj["渲染宽度"][keys1Obj["当前播放帧"]], keys1Obj["渲染高度"][keys1Obj["当前播放帧"]]];
					let Box1 = [fofGame.SpiritGroupArrObj[SpiritTitle]["x坐标"], fofGame.SpiritGroupArrObj[SpiritTitle]["y坐标"], fofGame.SpiritGroupArrObj[SpiritTitle]["渲染宽度"][fofGame.SpiritGroupArrObj[SpiritTitle]["当前播放帧"]], fofGame.SpiritGroupArrObj[SpiritTitle]["渲染高度"][fofGame.SpiritGroupArrObj[SpiritTitle]["当前播放帧"]]];//获取精灵组盒子信息
					let SimilarityInt = fofGame.SpiritGroupArrObj[SpiritTitle]["像素相似度"][fofGame.SpiritGroupArrObj[SpiritTitle]["当前播放帧"]];//获取当前播放图片的像素相似度
					if (isBoxCrash(Box1, Box) == true) {
						uni.canvasGetImageData({
							canvasId: canvasId,
							x: Box1[0],
							y: Box1[1],
							width: Box1[2],
							height: Box1[3],
							success:(res)=>{
								SimilarityInt = SimilarityInt / 100;
								SimilarityInt = SimilarityInt * (SimilarityData * 10)
								if (res.data.length <= SimilarityInt) {
									if (success != undefined) {
										let DataObj = { "类型": "精灵组", "x坐标": Box[0], "y坐标": Box[1], "名称": keys1[index], "宽度": Box[2], "高度": Box[3] }
										success(DataObj)
									}
								}
							}
						})
					}
				}
			}
		}
		keys1 = [];
		for (var p1 in fofGame.SpiritArrObj) {
			if (fofGame.SpiritArrObj.hasOwnProperty(p1)) {
				keys1.push(p1);
			}
		}
		for (let index = 0; index < keys1.length; index++) {
			if (keys1[index] != SpiritTitle) {
				let keys1Obj = fofGame.SpiritArrObj[keys1[index]];
				//盒子
				let Box = [keys1Obj["x坐标"], keys1Obj["y坐标"], keys1Obj["渲染宽度"], keys1Obj["渲染高度"]];
				let Box1 = [fofGame.SpiritArrObj[SpiritTitle]["x坐标"], fofGame.SpiritArrObj[SpiritTitle]["y坐标"], fofGame.SpiritArrObj[SpiritTitle]["渲染宽度"], fofGame.SpiritArrObj[SpiritTitle]["渲染高度"]];//获取精灵组盒子信息
				let SimilarityInt = fofGame.SpiritArrObj[SpiritTitle]["像素相似度"];//获取当前图片的像素相似度
				if (isBoxCrash(Box1, Box) == true) {
					uni.canvasGetImageData({
						canvasId: canvasId,
						x: Box1[0],
						y: Box1[1],
						width: Box1[2],
						height: Box1[3],
						success:(res) =>{
							SimilarityInt = SimilarityInt / 100;
							SimilarityInt = SimilarityInt * (SimilarityData * 10)
							if (res.data.length <= SimilarityInt) {
								if (success != undefined) {
									let DataObj = { "类型": "精灵", "x坐标": Box[0], "y坐标": Box[1], "名称": keys1[index], "宽度": Box[2], "高度": Box[3] }
									success(DataObj)
								}
							}
						}
					})
				}
			}
		}
	}
}
//获取精灵组位置
const GetSpiritPositionGroup = function (SpiritTitle) {
	if (fofGame.SpiritGroupArrObj[SpiritTitle] != undefined) {
		return { "x坐标": fofGame.SpiritGroupArrObj[SpiritTitle]["x坐标"], "y坐标": fofGame.SpiritGroupArrObj[SpiritTitle]["y坐标"] };
	} else {
		return {};
	}
}
//设置精灵透明度-透明度0-1
const SetSpiritAlphaGroup = function (SpiritTitle, Alpha) {
	if (fofGame.SpiritGroupArrObj[SpiritTitle] != undefined) {
		fofGame.SpiritGroupArrObj[SpiritTitle]["透明度"] = Alpha;
	}
}
//删除某个精灵
const DelSpiritGroup = function (SpiritTitle) {
	delete fofGame.SpiritGroupArrObj[SpiritTitle];
}
//精灵移动,X和Y分别为要移动的方法，不移动则输入0，默认为0,-1后退或向上,1前进或向下
const walk = function (SpiritTitle, X = 0, Y = 0) {
	let MapTitle = fofGame["当前地图"][0];
	if (fofGame.SpiritGroupArrObj[SpiritTitle] != undefined && fofGame.MapDataObj[MapTitle] != undefined) {
		let MapDataObj = fofGame.MapDataObj[MapTitle];
		let RowObj = fofGame.SpiritGroupArrObj[SpiritTitle];
		let RowObjIfXy = [true, true];//需要需要移动角色坐标
		if (X >= 1)//向前
		{
			//如果人物的坐标本次移动大于了屏幕的中心点且地图宽度大于屏幕宽度，则触发必要的移动代码
			if (RowObj["x坐标"] + RowObj["移动速度"] + RowObj["中心点偏移X"] > fofGame["宽度"] / 2 && MapDataObj["渲染宽度"] > fofGame["宽度"]) {
				//如果地图的宽度-地图的X坐标还是大于屏幕的宽度，则证明地图还有可以移动的空间
				if (MapDataObj["渲染宽度"] - MapDataObj["x坐标"] > fofGame["宽度"]) {
					if (MapDataObj["渲染宽度"] - MapDataObj["x坐标"] - fofGame["宽度"] > RowObj["移动速度"]) {
						//代表地图的可移动空间大于移动速度
						MapDataObj["x坐标"] = MapDataObj["x坐标"] + RowObj["移动速度"];
						RowObjIfXy[0] = false;
					} else {
						MapDataObj["x坐标"] = MapDataObj["渲染宽度"] - fofGame["宽度"];
						RowObjIfXy[0] = false;
					}
				}
			}
		}
		if (X <= -1)//向后
		{
			//如果人物的坐标本次移动小于了屏幕的中心点且地图宽度大于屏幕宽度，则触发必要的移动代码
			if (RowObj["x坐标"] + RowObj["中心点偏移X"] < fofGame["宽度"] / 2 && MapDataObj["渲染宽度"] > fofGame["宽度"]) {
				//如果地图的宽度-地图的X坐标还是大于屏幕的宽度，则证明地图还有可以移动的空间
				if (MapDataObj["x坐标"] >= 1) {
					if (MapDataObj["x坐标"] > RowObj["移动速度"]) {
						//代表地图的可移动空间大于移动速度
						MapDataObj["x坐标"] = MapDataObj["x坐标"] - RowObj["移动速度"];
						RowObjIfXy[0] = false;
					} else {
						MapDataObj["x坐标"] = 0;
						RowObjIfXy[0] = false;
					}
				}
			}
		}
		if (Y >= 1)//向下
		{
			//如果人物的坐标本次移动大于了屏幕的中心点且地图宽度大于屏幕宽度，则触发必要的移动代码
			if (RowObj["y坐标"] + RowObj["移动速度"] + RowObj["中心点偏移Y"] > fofGame["高度"] / 2 && MapDataObj["渲染高度"] > fofGame["高度"]) {
				//如果地图的高度-地图的Y坐标还是大于屏幕的高度，则证明地图还有可以移动的空间
				if (MapDataObj["渲染高度"] - MapDataObj["y坐标"] > fofGame["高度"]) {
					if (MapDataObj["渲染高度"] - MapDataObj["y坐标"] - fofGame["高度"] > RowObj["移动速度"]) {
						//代表地图的可移动空间大于移动速度
						MapDataObj["y坐标"] = MapDataObj["y坐标"] + RowObj["移动速度"];
						RowObjIfXy[1] = false;
					} else {
						MapDataObj["y坐标"] = MapDataObj["渲染高度"] - fofGame["高度"];
						RowObjIfXy[1] = false;
					}
				}
			}
		}
		if (Y <= -1)//向上
		{
			//如果人物的坐标本次移动小于了屏幕的中心点且地图高度大于屏幕高度，则触发必要的移动代码
			if (RowObj["y坐标"] + RowObj["中心点偏移Y"] < fofGame["高度"] / 2 && MapDataObj["渲染高度"] > fofGame["高度"]) {
				//如果地图的宽度-地图的X坐标还是大于屏幕的宽度，则证明地图还有可以移动的空间
				if (MapDataObj["y坐标"] >= 1) {
					if (MapDataObj["y坐标"] > RowObj["移动速度"]) {
						//代表地图的可移动空间大于移动速度
						MapDataObj["y坐标"] = MapDataObj["y坐标"] - RowObj["移动速度"];
						RowObjIfXy[1] = false;
					} else {
						MapDataObj["y坐标"] = 0;
						RowObjIfXy[1] = false;
					}
				}
			}
		}
		//后期这里要做各种判断，例如：隐身块、遮挡块的判断等
		for (let index = 0; index < fofGame["当前地图"].length; index++) {
			let MapDataObj_=fofGame.MapDataObj[fofGame["当前地图"][index]];
			MapDataObj_["x坐标"]=MapDataObj["x坐标"]
			MapDataObj_["y坐标"]=MapDataObj["y坐标"]
			fofGame.MapDataObj[fofGame["当前地图"][index]]=MapDataObj_;
		}
		if (RowObjIfXy[0] == true) {
			if (X >= 1) {
				fofGame.SpiritGroupArrObj[SpiritTitle]["x坐标"] = RowObj["x坐标"] + RowObj["移动速度"];
			}
			if (X <= -1) {
				fofGame.SpiritGroupArrObj[SpiritTitle]["x坐标"] = RowObj["x坐标"] - RowObj["移动速度"];
			}
		}
		if (RowObjIfXy[1] == true) {
			if (Y >= 1) {
				fofGame.SpiritGroupArrObj[SpiritTitle]["y坐标"] = RowObj["y坐标"] + RowObj["移动速度"];
			}
			if (Y <= -1) {
				fofGame.SpiritGroupArrObj[SpiritTitle]["y坐标"] = RowObj["y坐标"] - RowObj["移动速度"];
			}
		}
	}
}
//播放精灵动画-positionBegin/positionEnd从0开始
const VidoeSpiritGroup = function (SpiritTitle, positionBegin, positionEnd) {
	if (fofGame.SpiritGroupArrObj[SpiritTitle] != undefined) {
		if (fofGame.SpiritGroupArrObj[SpiritTitle]["图片地址"].length >= 1) {
			let ImageSpiritData = fofGame.SpiritGroupArrObj[SpiritTitle];
			if (ImageSpiritData["图片地址"].length < positionEnd + 1) {
				return;
			}
			uniappfofClass.setGlobalAlpha(ImageSpiritData["透明度"])
			let position = ImageSpiritData["当前播放位置"];
			if (position < positionBegin || position > positionEnd) {
				//如果不是原来播放的帧
				position = 0
			}
			if (ImageSpiritData["图片地址"].length <= positionBegin + position) {
				position = 0
			}
			fofGame.SpiritGroupArrObj[SpiritTitle]["当前播放帧"] = positionBegin + position;
			let MapTitle = fofGame["当前地图"][0];
			let ImageSpiritDataX=ImageSpiritData["x坐标"];
			let ImageSpiritDataY=ImageSpiritData["y坐标"];
			if(fofGame.MapDataObj[MapTitle]!=undefined)
			{
				if(SpiritTitle!=fofGame["主角名称"])
				{
					ImageSpiritDataX=ImageSpiritDataX-fofGame.MapDataObj[MapTitle]["x坐标"]
					ImageSpiritDataY=ImageSpiritDataY-fofGame.MapDataObj[MapTitle]["y坐标"]
				}
			}
			ImageSpirit(ImageSpiritData["图片地址"][positionBegin + position], ImageSpiritDataX, ImageSpiritDataY, ImageSpiritData["渲染宽度"][positionBegin + position], ImageSpiritData["渲染高度"][positionBegin + position])
			if (positionBegin + position >= positionEnd) {
				fofGame.SpiritGroupArrObj[SpiritTitle]["当前播放位置"] = 0;
			} else {
				fofGame.SpiritGroupArrObj[SpiritTitle]["当前播放位置"] = position + 1;
			}
			uniappfofClass.setGlobalAlpha(fofGame.Alpha)
		}
	}
}

//精灵组层结束=========================

//地图层开始=========================
//加入地图信息
const addMap = function (MapTitle, image, lattice = []) {
	uniappfofClass.getImageInfo(image, function (data) {
		if (data["图片宽度"] != undefined && data["图片高度"] != undefined) {
			let MapDataObjLet = JSON.parse(JSON.stringify(MapData));
			MapDataObjLet["地图名称"] = MapTitle;
			MapDataObjLet["渲染宽度"] = data["图片宽度"];
			MapDataObjLet["渲染高度"] = data["图片高度"];
			MapDataObjLet["图片地址"] = image;
			MapDataObjLet["格子数据"] = lattice;
			fofGame.MapDataObj[MapTitle] = MapDataObjLet;
		}
	})
}
//置当前地图
//SpiritTitle-必须是精灵组名称
//MapTitle的第一个成员必须是主地图！不管有多少背景，坐标都以主地图为主
const SetMap = function (MapTitle=[], SpiritTitle) {
	fofGame["当前地图"] = MapTitle;
	fofGame["主角名称"] = SpiritTitle;
}
//删除某个地图
const DelMap = function (MapTitle) {
	delete fofGame.MapDataObj[MapTitle];
}
//显示地图
//RowTitle-必须是精灵组名称
const ShowMap = function () {
	let MapTitle = fofGame["当前地图"];
	for (let index = 0; index < MapTitle.length; index++) {
		if (fofGame.MapDataObj[MapTitle[index]] != undefined) {
			let MapData = fofGame.MapDataObj[MapTitle[index]];
			ImageSpirit(MapData["图片地址"], ~MapData["x坐标"], ~MapData["y坐标"], MapData["渲染宽度"], MapData["渲染高度"])
		}
	}
}
//精灵层结束=========================
//摇杆层开始=========================
//初始化摇杆,必须在启动引擎后才能进行初始化
const InitializeRocker = function (Image_, X, Y) {
	fofGameRocker.InitializeRocker(uniappfofClass, Image_, X, Y, 0.8)
}
//绘制摇杆
const DrawRocker = function (success = undefined) {
	fofGameRocker.DrawRocker(uniappfofClass, success)
}
//摇杆抬起
const RockerLiftEventFun = function () {
	fofGameRocker.RockerLiftEventFun()
}
//摇杆滑动
const RockerSlideEventFun = function (changedTouches) {
	fofGameRocker.RockerSlideEventFun(changedTouches)
}

//fofGameRocker
//摇杆层结束=========================
export default {
	ShowMap,
	OpenfofGame,
	ImageSpirit,
	UpdateRendering,
	addSpirit,
	DelSpirit,
	DeletefofGame,
	GetSpiritList,
	SetSpiritList,
	SetSpiritPosition,
	GetSpiritPosition,
	SetSpiritAlpha,
	SetSpiritHierarchy,
	GetSpiritHierarchy,
	GetFps,
	VidoeSpirit,
	setGlobalAlpha,
	VidoeSpiritAll,
	addSpiritGroup,
	GetSpiritListGroup,
	SetSpiritListGroup,
	SetSpiritPositionGroup,
	GetSpiritPositionGroup,
	SetSpiritAlphaGroup,
	DelSpiritGroup,
	VidoeSpiritGroup,
	CollisionDetectionGroup,
	addMap,
	DelMap,
	walk,
	InitializeRocker,
	DrawRocker,
	RockerLiftEventFun,
	RockerSlideEventFun,
	SetMap
}


//===================================
//取十位时间戳
function timestamp() {
	let outcome = Math.round(new Date().getTime() / 1000).toString();
	return outcome
}
//渲染精灵
function VidoeSpiritObj(SpiritTitle, Hierarchy) {
	if (fofGame.SpiritArrObj[SpiritTitle]["层级"] == Hierarchy) {
		let MapTitle = fofGame["当前地图"][0];
		let ImageSpiritData = fofGame.SpiritArrObj[SpiritTitle];
		uniappfofClass.setGlobalAlpha(ImageSpiritData["透明度"])
		ImageSpirit(ImageSpiritData["图片地址"], ImageSpiritData["x坐标"] - fofGame.MapDataObj[MapTitle]["x坐标"], ImageSpiritData["y坐标"] - fofGame.MapDataObj[MapTitle]["y坐标"], ImageSpiritData["渲染宽度"], ImageSpiritData["渲染高度"])
		uniappfofClass.setGlobalAlpha(fofGame.Alpha)
	}
}
//盒子碰撞检测
function isBoxCrash(obj, dobj) {
	var o = {
		x: obj[0],
		y: obj[1],
		w: obj[2],
		h: obj[3]
	}
	var d = {
		x: dobj[0],
		y: dobj[1],
		w: dobj[2],
		h: dobj[3]
	}
	var px, py;
	px = o.x <= d.x ? d.x : o.x;
	py = o.y <= d.y ? d.y : o.y;
	// 判断点是否都在两个对象中
	if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {
		return true;
	} else {
		return false;
	}
}