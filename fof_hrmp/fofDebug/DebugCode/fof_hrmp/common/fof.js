/*
文件上传
*/
const uploadFile = function (url, filePath, name, success_ = undefined, fail_ = undefined) {
	uni.uploadFile({
		url: url,
		filePath: filePath,
		name: name,
		success: (ev) => {
			if (success_ != undefined) {
				success_(ev)
			}
		}, fail: () => {
			if (fail_ != undefined) {
				fail_()
			}
		}
	});
};
/*
文件下载
*/
const downloadFile = function (url, success = undefined, fail = undefined) {
	uni.downloadFile({
		url: url,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
网络访问
*/
const request = function (url, method = "GET", data = "", header = {}, dataType = "json", success = undefined, fail = undefined) {
	let DataObj = {
		url: url,
		method: method,
		data: data,
		header: header,
		dataType: dataType,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		},
		fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	}
	if (DataObj["header"]["Content-Type"] == undefined || DataObj["header"]["Content-Type"] == "" || DataObj[
		"header"]["content-type"] == "" || DataObj["header"]["content-type"] == "") {
		DataObj["header"]["Content-Type"] = "multipart/form-data"
	}
	uni.request(DataObj)
};
/*
选择文件
*/
const chooseFile = function (extension = ['.zip', '.doc', '.xls', '.pdf', 'docx', '.rar', '.7z', '.jpg', '.png', '.jpeg'], success = undefined, fail = undefined) {
	uni.chooseFile({
		count: 1, //默认100
		extension: extension,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
选择视频文件
*/
const chooseVideo = function (extension = ['.mp4'], success = undefined, fail = undefined) {
	uni.chooseVideo({
		count: 1, //默认100
		extension: extension,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
选择图片文件
*/
const chooseImage = function (count = 9, extension = ['.jpg', ".png"], success = undefined, fail = undefined) {
	uni.chooseImage({
		count: count, //默认100
		extension: extension,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
获取图片信息
*/
const getImageInfo = function (src, success = undefined, fail = undefined) {
	uni.getImageInfo({
		src: src,
		success: (ev) => {
			if (success != undefined) {
				let ImageType = { "图片宽度": ev.width, "width": ev.width, "图片高度": ev.height, "height": ev.height, "图片格式": ev.type, "type": ev.type, "图片方向": ev.orientation, "orientation": ev.orientation, "描述": "图片格式、图片方向只有在APP和京东小程序中有效;本数据中所有中文都有对应的英文键名", "data": ev }
				success(ImageType)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
预览图片，可放大放小
*/
const previewImage = function (src, srcAll = [], srcAllInt = 0) {
	let srcAllImage = [src]
	if (srcAll != [] && srcAll != undefined) {
		if (srcAll.length >= 1) {
			srcAllImage = srcAll
		}
	}
	wx.previewImage({
		urls: srcAllImage, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
		current: srcAllInt, // 当前显示图片的http链接，默认是第一个
		success: function (res) { },
		fail: function (res) { },
		complete: function (res) { }
	});
};
/*
预览图片并保存，可放大放小
*/
const previewImageInsert = function (src) {
	uni.previewImage({
		urls: [src], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
		current: "", // 当前显示图片的http链接，默认是第一个
		success: function (res) { },
		fail: function (res) { },
		complete: function (res) { },
		//长按保存到本地
		longPressActions: {
			itemList: ["保存图片到本地"],
			success: (data) => {
				if (data.tapIndex == 0) {
					let url = src;
					uni.saveImageToPhotosAlbum({
						filePath: url,
						success: (res) => {
							uni.showToast({
								title: "已存至系统相册",
								icon: "success",
							});
						},
						fail: (res) => {
							uni.showToast({
								title: "保存失败",
								icon: "error",
							});
						},
					});
				}
			},
			fail: function (err) {
				console.log(err.errMsg);
			},
		},
	});
};
//保存图像到相册
const saveImageToPhotosAlbum = function (filePath_, FUN = undefined) {
	uni.saveImageToPhotosAlbum({
		filePath: filePath_,
		success: function () {
			if (FUN != undefined) {
				FUN({
					"type": "保存成功"
				})
			}
		},
		fail: function () {
			if (FUN != undefined) {
				FUN({
					"type": "保存失败"
				})
			}
		}
	});
};
//保存视频到相册
const saveVideoToPhotosAlbum = function (filePath_, FUN = undefined) {
	uni.saveVideoToPhotosAlbum({
		filePath: 文件下载成功回调.tempFilePath,
		success: function () {
			//保存成功
			if (FUN != undefined) {
				FUN({
					"type": "保存成功"
				})
			}
		},
		fail: function () {
			if (FUN != undefined) {
				FUN({
					"type": "保存失败"
				})
			}
		}
	});
};
/*
写配置项
*/
const setStorageSync = function (key, data) {
	try {
		uni.setStorageSync(key, data);
		return true;
	} catch (e) {
		return false;
	}
};
/*
读配置项
*/
const getStorageSync = function (key) {
	try {
		let value = uni.getStorageSync(key);
		if (value) {
			return value;
		}
		return "";
	} catch (e) {
		return "";
	}
};
/*
删除配置项
*/
const removeStorageSync = function (key) {
	try {
		uni.removeStorageSync(key);
		return true;
	} catch (e) {
		return false;
	}
};
/*
清空配置项
*/
const clearStorageSync = function () {
	try {
		uni.clearStorageSync();
		return true;
	} catch (e) {
		return false;
	}
};
/*
写出文件
*/
const saveFile = function (tempFilePath, success = undefined, fail = undefined, FileName = "") {
	//#ifdef MP-WEIXIN
	const FileSystemManager = wx.getFileSystemManager();
	if (FileName != "") {
		FileSystemManager.saveFile({//下载成功后保存到本地
			tempFilePath: tempFilePath,
			filePath: wx.env.USER_DATA_PATH + "/" + FileName,
			success(ev) {
				if (success != undefined) {
					ev["路径"] = wx.env.USER_DATA_PATH + "/" + FileName
					success(ev)
				}
			},
			fail() {
				if (fail != undefined) {
					fail()
				}
			}
		})
	} else {
		FileSystemManager.saveFile({//下载成功后保存到本地
			tempFilePath: tempFilePath,
			success(ev) {
				if (success != undefined) {
					if (ev["savedFilePath"]) {
						ev["路径"] = ev["savedFilePath"]
					}
					success(ev)
				}
			},
			fail() {
				if (fail != undefined) {
					fail()
				}
			}
		})
	}
	//#endif
	//#ifndef MP-WEIXIN
	uni.saveFile({
		tempFilePath: tempFilePath,
		success: (ev) => {
			if (success != undefined) {
				if (ev["savedFilePath"]) {
					ev["路径"] = ev["savedFilePath"]
				}
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
	//#endif
};
/*
删除文件
*/
const removeSavedFile = function (tempFilePath, success = undefined, fail = undefined) {
	uni.removeSavedFile({
		tempFilePath: tempFilePath,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
//获取所有保存的文件
const getSavedFileList = function (success_ = undefined) {
	uni.getSavedFileList({
		success: function (res) {
			success_(res)
		}
	});
};

/*
获取文件信息
*/
const getFileInfo = function (tempFilePath, success = undefined, fail = undefined) {
	//#ifdef MP-WEIXIN
	const FileSystemManager = wx.getFileSystemManager();
	FileSystemManager.getFileInfo({
		filePath: tempFilePath,
		success(ev) {
			if (success != undefined) {
				success(ev)
			}
		},
		fail() {
			if (fail != undefined) {
				fail()
			}
		}
	})
	//#endif
	//#ifndef MP-WEIXIN
	uni.getFileInfo({
		tempFilePath: tempFilePath,
		success: function (ev) {
			if (success != undefined) {
				success(ev)
			}
		}, fail: function () {
			if (fail != undefined) {
				fail()
			}
		}
	});
	//#endif

};
/*
打开文档
*/
const openDocument = function (tempFilePath, showMenu = true, success = undefined, fail = undefined) {
	uni.openDocument({
		filePath: tempFilePath,
		showMenu: showMenu,
		success: function (res) {
			if (success != undefined) {
				success(res)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
启动时钟
*/
const setInterVal = function (time, success = undefined) {
	let timer = setInterval(() => {
		if (success != undefined) {
			success()
		}
	}, time);
	return timer;
};
/*
结束时钟
*/
const clearInterVal = function (timeID) {
	clearInterval(timeID)
};
/*
启动定时器
*/
const setTimeOut = function (time, success = undefined) {
	let timer = setTimeout(() => {
		if (success != undefined) {
			success()
		}
	}, time);
	return timer;
};
/*
结束定时器
*/
const clearTimeOut = function (timeID) {
	clearTimeout(timeID)
};
/*
websocket开始
*/
const connectSocket = function (url, success = undefined, fail = undefined) {
	uni.connectSocket({
		url: url,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
const onSocketClose = function (success = undefined) {
	uni.onSocketClose((res) => {
		if (success != undefined) {
			success(res)
		}
	});
};
const onSocketOpen = function (success = undefined) {
	uni.onSocketOpen((res) => {
		if (success != undefined) {
			success(res)
		}
	});
};
const onSocketError = function (success = undefined) {
	uni.onSocketError((res) => {
		if (success != undefined) {
			success(res)
		}
	});
};
const onSocketMessage = function (success = undefined) {
	uni.onSocketMessage((res) => {
		if (success != undefined) {
			res.data = arraybufferToStr(res.data);
			success(res)
		}
	});
};

const closeSocket = function () {
	uni.closeSocket(function (res) { });
};
const sendSocketMessage = function (data, success = undefined, fail = undefined) {
	uni.sendSocketMessage({
		data: data,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
websocket结束
*/
/*
页面路由开始
*/
//打开并保留当前页
const navigateTo = function (url, animationType_ = undefined, animationDuration_ = 300) {
	if (animationType_ == undefined) {
		uni.navigateTo({
			url: url
		});
	} else {
		uni.navigateTo({
			url: url,
			animationType: animationType_,
			animationDuration: animationDuration_
		});
	}

};
//打开并关闭当前页
const redirectTo = function (url) {
	uni.redirectTo({
		url: url
	});
};
//关闭所有页面后跳转到某一个页面
const reLaunch = function (url) {
	uni.reLaunch({
		url: url
	});
};
//跳转导航页面
const switchTab = function (url) {
	uni.switchTab({
		url: url
	});
};
const navigateBack = function (delta) {
	uni.navigateBack({
		delta: delta
	});
};
const OnPageData = function (Name, Fun = undefined) {
	uni.$on(Name, function (data) {
		if (Fun != undefined) {
			Fun({ "状态": "收到数据", "数据": data, "type": "收到数据", "type_en": "Received data", "data": data, "描述": "本数据中所有中文都有对应的英文键名" })
		}
	});
};
const SendPageData = function (Name, Data) {
	uni.$emit(Name, { "消息": Data })
};
const OffPageData = function (Name) {
	uni.$off(Name)
};
const hideShareMenu = function () {
	uni.hideShareMenu();
}
/*
页面路由结束
*/
/*
录音功能开始
*/
var recorderManagerFOF;
//初始化录音，全局只能有一个
const getRecorderManager = function () {
	recorderManagerFOF = uni.getRecorderManager();
};
//开始录音
const RecorderstartRecord = function (duration = 600000) {
	recorderManagerFOF.start({ duration: duration });
};
//暂停录音
const Recorderpause = function () {
	recorderManagerFOF.pause();
};
//继续录音
const Recorderresume = function () {
	recorderManagerFOF.resume();
};
//停止录音
const Recorderstop = function () {
	recorderManagerFOF.stop();
};
//停止录音事件
const RecorderonStop = function (success = undefined) {
	recorderManagerFOF.onStop((res) => {
		success(res)
	});
};
/*
录音功能结束
*/
/*
音频播放器开始
*/
var innerAudioContext;
//初始化音频播放器，全局只能有一个
const createInnerAudioContext = function () {
	innerAudioContext = uni.createInnerAudioContext();
	return innerAudioContext;
};
//设置音乐地址,用于直接播放【微信小程序不支持本地路径】
const innerAudioContextsrc = function (src, innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		innerAudioContext.src = src;
	} else {
		innerAudioContextObj.src = src;
	}
};
//设置初始化播放位置
const innerAudioContextstartTime = function (startTime, innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		innerAudioContext.startTime = startTime;
	} else {
		innerAudioContextObj.startTime = startTime;
	}
};
//获取播放状态,真代表没有播放，假代表正在播放
const innerAudioContextpaused = function (innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		return innerAudioContext.paused;
	} else {
		return innerAudioContextObj.paused;
	}
};
//获取当前播放的音乐长度
const innerAudioContextduration = function (innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		return innerAudioContext.duration;
	} else {
		return innerAudioContextObj.duration;
	}
};
//获取当前播放的位置
const innerAudioContextcurrentTime = function (innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		return innerAudioContext.currentTime;
	} else {
		return innerAudioContextObj.currentTime;
	}
};
//设置播放音量，0-1
const innerAudioContextvolume = function (volume, innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		return innerAudioContext.volume;
	} else {
		return innerAudioContextObj.volume;
	}
};
//跳转播放位置
const innerAudioContextseek = function (seek, innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		innerAudioContext.seek(seek);
	} else {
		innerAudioContextObj.seek(seek);
	}
};
//循环播放
const innerAudioContextloop = function (loop = true, innerAudioContextObj = undefined) {

	if (innerAudioContextObj == undefined) {
		innerAudioContext.seek(loop);
	} else {
		innerAudioContextObj.seek(loop);
	}
};
//播放音频
const innerAudioContextplay = function (innerAudioContextObj = undefined) {

	if (innerAudioContextObj == undefined) {
		innerAudioContext.play();
	} else {
		innerAudioContextObj.play();
	}
};
//暂停播放
const innerAudioContextpause = function (innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		innerAudioContext.pause();
	} else {
		innerAudioContextObj.pause();
	}
};
//停止播放，请停止后必须再次赋值地址
const innerAudioContextstop = function (innerAudioContextObj = undefined) {
	if (innerAudioContextObj == undefined) {
		innerAudioContext.stop();
	} else {
		innerAudioContextObj.stop();
	}
};
/*
音频播放器结束
*/
/*
视频播放器开始
*/
var videoContext;
//初始化视频播放器，全局只能有一个
const createVideoContext = function (videoId, this_ = undefined) {
	if (this_ == undefined) {
		videoContext = uni.createVideoContext(videoId, this_)
	} else {
		videoContext = uni.createVideoContext(videoId)
	}
	return videoContext;
};
//播放视频
const Videoplay = function (videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.play()
	} else {
		videoContextObj.play()
	}
};
//暂停播放视频
const Videopause = function (videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.pause()
	} else {
		videoContextObj.pause()
	}
};
//停止视频
const Videostop = function (videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.stop()
	} else {
		videoContextObj.stop()
	}
};
//跳转指定位置
const Videoseek = function (position, videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.seek(position)
	} else {
		videoContextObj.seek(position)
	}
};
//发送弹幕
const VideosendDanmu = function (text, color, videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.sendDanmu({ text: text, color: color })
	} else {
		videoContextObj.sendDanmu({ text: text, color: color })
	}
};
//设置倍数，0.5/0.8/1.0/1.25/1.5/2.0
const VideoplaybackRate = function (playbackRate, videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.playbackRate(playbackRate)
	} else {
		videoContextObj.playbackRate(playbackRate)
	}
};
//进入全屏
const VideorequestFullScreen = function (videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.requestFullScreen()
	} else {
		videoContextObj.requestFullScreen()
	}
};
//退出全屏
const VideoexitFullScreen = function (videoContextObj = undefined) {
	if (videoContextObj == undefined) {
		videoContext.exitFullScreen()
	} else {
		videoContextObj.exitFullScreen()
	}
};
/*
视频播放器结束
*/
/*
设备操作开始
*/
//获取屏幕高度
const screenHeight = function () {
	return uni.getSystemInfoSync().windowHeight
};
//获取屏幕宽度
const screenWidth = function () {
	return uni.getSystemInfoSync().windowWidth;
};
//获取可操作页面高度
const windowHeight = function () {
	return uni.getWindowInfo().windowHeight;
};
//获取可操作页面宽度
const windowWidth = function () {
	return uni.getWindowInfo().windowWidth;
};
//手机状态栏高度
const statusBarHeight = function () {
	return uni.getWindowInfo().statusBarHeight;
};
//设备品牌
const deviceBrand = function () {
	return uni.getDeviceInfo().deviceBrand;
};
;
//设备ID
const deviceId = function () {
	return uni.getDeviceInfo().deviceId;
};
;
//设备型号
const deviceModel = function () {
	return uni.getDeviceInfo().deviceModel;
};
//设备类型
const deviceTypedeviceType = function () {
	return uni.getDeviceInfo().deviceType;
};
//手机震动
const vibrateLong = function () {
	return uni.vibrateLong();
};
//添加手机联系人
const addPhoneContact = function (firstName, remark, mobilePhoneNumber) {
	return uni.addPhoneContact({
		firstName: firstName,
		remark: remark,
		mobilePhoneNumber: mobilePhoneNumber
	});
};
/*
设备操作结束
*/
/*
网络状态开始
*/
const getNetworkType = function (success = undefined, fail = undefined) {
	uni.getNetworkType({
		success: (ev) => {
			if (success != undefined) {
				success(ev.networkType)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
网络状态结束
*/
/*
拨打电话开始
*/
const makePhoneCall = function (phoneNumber) {
	uni.makePhoneCall({
		phoneNumber: phoneNumber
	});
};
/*
拨打电话结束
*/
/*
扫码开始
*/
const scanCode = function (success = undefined, fail = undefined, Obj = undefined) {
	let Obj_ = {
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	}
	if (Obj != undefined) {
		let keys = Object.keys(Obj);
		for (let index = 0; index < keys.length; index++) {
			Obj_[keys[index]] = Obj[keys[index]]
		}
	}
	uni.scanCode(Obj_);
};
/*
扫码结束
*/
/*
剪辑版开始
*/
const setClipboardData = function (data, fun_ = undefined, fun2_ = undefined) {
	uni.setClipboardData({
		data: data,
		success: function () {
			uni.hideToast();
			if (fun_ != undefined) {
				fun_()
			}
		},
		fail: function (err) {
			if (fun2_ != undefined) {
				fun2_()
			}
			/*
			uni.showToast({
				title: '置剪辑版文本失败',
				duration: 2000,
				icon: 'none'
			});
			*/
		}
	});
};
const getClipboardData = function (success = undefined, fail = undefined) {
	uni.getClipboardData({
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				fail()
			}
		}
	});
};
/*
剪辑版结束
*/
/*
屏幕操作开始
*/
//设置屏幕亮度，取值0-1
const setScreenBrightness = function (value) {
	uni.setScreenBrightness({
		value: value
	});
};
//设置屏幕常亮
const setKeepScreenOn = function (keepScreenOn = true) {
	uni.setKeepScreenOn({
		keepScreenOn: keepScreenOn
	});
};
/*
屏幕操作结束
*/

/*
键盘操作开始
*/
const hideKeyboard = function () {
	uni.hideKeyboard();
};
const getSelectedTextRange = function (success = undefined) {
	uni.getSelectedTextRange({
		success: res => {
			if (success != undefined) {
				success({ "start": res.start, "开始坐标": res.start, "end": res.end, "结束坐标": res.end, "描述": "start-开始坐标;end-结束坐标;本数据中所有中文都有对应的英文键名" })
			}
		}
	})
};
/*
键盘操作结束
*/
/*
对话框操作开始
*/
//显示加载对话框
const showLoading = function (title_) {
	uni.showLoading({
		title: title_
	});
};
//隐藏加载对话框
const hideLoading = function () {
	uni.hideLoading()
};

//显示消息提示框
//注意：
//icon-1【显示成功图标，此时 title 文本在小程序平台最多显示 7 个汉字长度。】
//icon-2【显示错误图标，此时 title 文本在小程序平台最多显示 7 个汉字长度。】
//icon-3【显示错误图标，此时 title 文本无长度显示。】
//icon-4【显示异常图标。此时 title 文本无长度显示。】
//icon-5【不显示图标，此时 title 文本在小程序最多可显示两行，App仅支持单行显示。】
const showToast = function (title, icon = 1, duration = 2000) {
	if (icon == 1) {
		icon = "success"
	}
	if (icon == 2) {
		icon = "error"
	}
	if (icon == 3) {
		icon = "fail"
	}
	if (icon == 4) {
		icon = "exception"
	}
	if (icon == 5) {
		icon = "none"
	}

	uni.showToast({
		title: title,
		icon: icon,
		duration: duration
	})
};

//显示信息框
const showModal = function (title, content, showCancel, cancelText, confirmText, editable, placeholderText, success = undefined) {
	uni.showModal({
		title: title,
		content: content,
		showCancel: showCancel,
		cancelText: cancelText,
		confirmText: confirmText,
		editable: editable,
		placeholderText: placeholderText,
		success: (res) => {
			if (res.confirm) {
				if (editable == true) {
					success({ "type": "确认按钮", "type_en": "yesBut", "类型": "确认按钮", "input": res.content, "输入内容": res.content, "描述": "type-点击状态;input-输入内容;本数据中所有中文都有对应的英文键名" })
				} else {
					success({ "type": "确认按钮", "type_en": "yesBut", "类型": "确认按钮", "input": "无", "输入内容": "无", "描述": "type-点击状态;input-输入内容;本数据中所有中文都有对应的英文键名" })
				}
			} else if (res.cancel) {
				if (editable == true) {
					success({ "type": "取消按钮", "type_en": "noBut", "类型": "取消按钮", "input": res.content, "输入内容": res.content, "描述": "type-点击状态;input-输入内容;本数据中所有中文都有对应的英文键名" })
				} else {
					success({ "type": "取消按钮", "type_en": "noBut", "类型": "取消按钮", "input": "无", "输入内容": "无", "描述": "type-点击状态;input-输入内容;本数据中所有中文都有对应的英文键名" })
				}
			}
		}
	})
};
/*
对话框操作结束
*/
/*
导航相关API开始
*/
//修改导航标题
const setNavigationBarTitle = function (title) {
	uni.setNavigationBarTitle({
		title: title
	});
};
//修改导航样式
const setNavigationBarColor = function (frontColor, backgroundColor) {
	uni.setNavigationBarColor({
		frontColor: frontColor,
		backgroundColor: backgroundColor
	})
};
//隐藏返回按钮
const hideHomeButton = function (title) {
	uni.hideHomeButton();
};
/*
导航相关API结束
*/
/*
滚动界面开始
*/
const pageScrollTo = function (scrollTop, duration = 300, selector = "") {
	if (selector == "") {
		uni.pageScrollTo({
			scrollTop: scrollTop,
			duration: duration
		});
	} else {
		uni.pageScrollTo({
			scrollTop: scrollTop,
			duration: duration,
			selector: "#" + selector
		});
	}

};
/*
滚动界面结束
*/
/*
界面整体操作开始
*/
let windowWidthSize;
let windowHeightSize;
//获取窗口宽高
const windowResizeCallback = (res) => {
	windowWidthSize = res.size.windowWidth;
	windowHeightSize = res.size.windowHeight;
}
//获取窗口宽高
uni.onWindowResize(windowResizeCallback)
//获取窗口宽高
const GetWindowResize = function (tile) {
	return { "windowWidthSize": windowWidthSize, "窗口宽度": windowWidthSize, "windowHeightSize": windowHeightSize, "窗口高度": windowHeightSize, "描述": "windowWidthSize-窗口宽度;windowHeightSize-窗口高度；本数据中所有中文都有对应的英文键名" };
};
//停止下拉刷新
const stopPullDownRefresh = function (tile) {
	uni.stopPullDownRefresh();
};
/*
界面整体操作结束
*/
/*
编码操作转换开始
*/
const base64ToArrayBuffer = function (text) {
	return uni.base64ToArrayBuffer(text);
};
const arrayBufferToBase64 = function (data) {
	return uni.arrayBufferToBase64(data);
};
const Uint8ArrayNew = function (data) {
	return new Uint8Array(data);
};
const arraybufferToStr = function (data) {
	return new TextDecoder("utf-8").decode(new Uint16Array(data))
};
const ab2hex = function (buffer) {
	const hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),
		function (bit) {
			return ('00' + bit.toString(16)).slice(-2)
		}
	)
	return hexArr.join('')
};
/*
编码操作转结束
*/
/*
相机开始
*/
const takePhoto = function (Fun = undefined, Type = 1) {
	const ctx = uni.createCameraContext();
	if (Type == 1) {
		ctx.takePhoto({
			quality: "high",
			success: (res) => {
				if (Fun != undefined) {
					Fun(res)
				}
			}
		});
	}
	if (Type == 2) {
		ctx.startRecord({
			quality: 'low',
			success: function (res) {
				Fun({ "type": "录像回调", "type_en": "Video callback", "data": res, "状态": "录像回调", "数据": res, "描述": "本数据中所有中文都有对应的英文键名" })
			},
			fail: (err) => {
				Fun({ "type": "录像错误", "type_en": "Recording error", "状态": "录像错误", "描述": "本数据中所有中文都有对应的英文键名" })
			}
		})
	}
	if (Type == 3) {
		ctx.stopRecord({
			//compressed 是否启动视频压缩 
			compressed: true,
			success: function (res) {
				//返回结果 size 字段 是btye单位
				//console.log(res)
				// byte单位转换为 kb 单位
				let fileSize = res.size / 1024;
				let videoFile = res.tempVideoPath
				Fun({ "type": "停止录像成功", "状态": "停止录像成功", "type_en": "Successfully stopped recording", "data": res, "数据": res, "fileSize": fileSize, "文件大小": fileSize, "videoFile": videoFile, "路径": videoFile, "描述": "本数据中所有中文都有对应的英文键名" })
			},
			fail: (err) => {
				//console.log(err)
				Fun({ "type": "停止录像错误", "type_en": "Stop recording error", "状态": "停止录像错误", "描述": "本数据中所有中文都有对应的英文键名" })
			}
		})
	}
};
/*
相机结束
*/
/*
应用操作开始
*/
const exitApp = function (Fun = undefined) {
	//#ifdef MP-WEIXIN
	wx.exitMiniProgram({
		success: (res) => { }
	});
	//#endif
	//#ifdef APP-PLUS
	uni.getSystemInfo({
		success: function (res) {
			if (res.platform === 'android') {
				// 安卓设备  
				plus.runtime.quit();
			} else if (res.platform === 'ios') {
				// iOS 设备  
				plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
			} else {
				// 其他设备  
				console.log('其他设备,无法退出');
			}
		}
	});
	//#endif
}
/*
应用操作结束
*/
export default {
	uploadFile,
	request,
	chooseFile,
	getSavedFileList,
	chooseVideo,
	chooseImage,
	setStorageSync,
	getStorageSync,
	removeStorageSync,
	clearStorageSync,
	saveFile,
	removeSavedFile,
	getFileInfo,
	openDocument,
	setInterVal,
	clearInterVal,
	setTimeOut,
	clearTimeOut,
	downloadFile,
	connectSocket,
	onSocketClose,
	sendSocketMessage,
	onSocketOpen,
	onSocketError,
	closeSocket,
	onSocketMessage,
	navigateTo,
	redirectTo,
	reLaunch,
	switchTab,
	navigateBack,
	SendPageData,
	OnPageData,
	OffPageData,
	hideShareMenu,
	getRecorderManager,
	RecorderstartRecord,
	Recorderstop,
	Recorderpause,
	Recorderresume,
	RecorderonStop,
	createInnerAudioContext,
	innerAudioContextstartTime,
	innerAudioContextsrc,
	innerAudioContextpaused,
	innerAudioContextduration,
	innerAudioContextcurrentTime,
	innerAudioContextvolume,
	innerAudioContextplay,
	innerAudioContextpause,
	innerAudioContextstop,
	innerAudioContextseek,
	innerAudioContextloop,
	createVideoContext,
	Videoplay,
	Videopause,
	Videostop,
	Videoseek,
	VideosendDanmu,
	VideoplaybackRate,
	VideorequestFullScreen,
	VideoexitFullScreen,
	screenHeight,
	screenWidth,
	windowHeight,
	windowWidth,
	statusBarHeight,
	deviceBrand,
	deviceId,
	deviceModel,
	deviceTypedeviceType,
	getNetworkType,
	makePhoneCall,
	scanCode,
	setClipboardData,
	getClipboardData,
	setScreenBrightness,
	setKeepScreenOn,
	vibrateLong,
	addPhoneContact,
	hideKeyboard,
	getSelectedTextRange,
	showLoading,
	hideLoading,
	showToast,
	showModal,
	setNavigationBarTitle,
	setNavigationBarColor,
	hideHomeButton,
	pageScrollTo,
	stopPullDownRefresh,
	GetWindowResize,
	arrayBufferToBase64,
	base64ToArrayBuffer,
	Uint8ArrayNew,
	arraybufferToStr,
	ab2hex,
	getImageInfo,//获取图片信息
	previewImage,//预览图像
	previewImageInsert,//预览图像并保存
	takePhoto,//相机扫描
	saveImageToPhotosAlbum,//保存图片到系统相册
	saveVideoToPhotosAlbum,//保存视频到系统相册
	exitApp
}
