const getMenuButtonBoundingClient = function () {
	const capsuledata = wx.getMenuButtonBoundingClientRect()
	const result = capsuledata.top + capsuledata.height * 0.2
	return result
}
const getMenuButtonBoundingClientRect = function () {
	const capsuledata = wx.getMenuButtonBoundingClientRect()
	return capsuledata
}
const getUserProfile = function (success_ = undefined, desc_ = "") {
	if (desc_ == "") {
		desc_ = "Wexin"
	}
	uni.getUserProfile({
		desc: desc_,
		success: (res) => {
			if (success_ != undefined) {
				success_(res)
			}
		}
	});
}
const decryptPhoneNumber = function (e, Url, FunData) {
	if (e.detail.code) {
		uni.request({
			url: Url,
			method: 'get',
			data: {
				code: e.detail.code
			},
			success: (res) => {
				FunData({
					"状态": "成功",
					"type": "成功",
					"type_en": "yes",
					"data": res,
					"数据": res,
					"描述": "本数据中所有中文都有对应的英文键名"
				})
			},
			fail: (err) => {
				FunData({
					"状态": "失败",
					"type": "失败",
					"type_en": "no",
					"data": res,
					"数据": err,
					"描述": "本数据中所有中文都有对应的英文键名"
				})
			}
		});
	} else {
		FunData({
			"状态": "开放能力进行中",
			"type": "开放能力进行中",
			"type_en": "Open capability in progress",
			"data": e.detail,
			"数据": e.detail,
			"描述": "本数据中所有中文都有对应的英文键名"
		})
	}
}
//触发分享小程序事件时需要返回的信息
const SharingPage = function (title_, path_, Parameter_ = "id=1", ifType = 1) {
	if (ifType == 2) {
		return { title: title_, query: path_ + '?' + Parameter_ }
	}
	return {
		title: title_,
		path: path_ + '?' + Parameter_
	}
}
//微信登陆
const login = function (fun_ = undefined) {
	uni.login({
		provider: "weixin",
		success: function (loginRes) {
			fun_({
				"状态": "成功",
				"type": "成功",
				"type_en": "yes",
				"data": loginRes,
				"数据": loginRes,
				"描述": "本数据中所有中文都有对应的英文键名"
			})
		},
		fail: function (err) {
			fun_({
				"状态": "失败",
				"type": "失败",
				"type_en": "no",
				"data": err,
				"数据": err,
				"描述": "本数据中所有中文都有对应的英文键名"
			})
		}
	});
}


export default {
	getMenuButtonBoundingClient,
	getMenuButtonBoundingClientRect,
	getUserProfile,
	decryptPhoneNumber,
	SharingPage,
	login
}