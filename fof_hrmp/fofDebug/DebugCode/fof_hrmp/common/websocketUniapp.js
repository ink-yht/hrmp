let SocketObj;
/*
websocket开始
*/
const connectSocket = function (url, success = undefined, fail = undefined, obj = {}) {
	let connectSocketObj = {
		url: url,
		success: (ev) => {
			if (success != undefined) {
				success(ev)
			}
		}, fail: () => {
			if (fail != undefined) {
				SocketObj = undefined
				fail()
			}
		}
	}
	if (obj["multiple"]) {
		connectSocketObj["multiple"] = obj["multiple"]
	}
	if (obj["header"]) {
		connectSocketObj["header"] = obj["header"]
	}
	if (obj["method"]) {
		connectSocketObj["method"] = obj["method"]
	}
	if (obj["protocols"]) {
		connectSocketObj["protocols"] = obj["protocols"]
	}
	SocketObj = uni.connectSocket(connectSocketObj);
};
const onSocketClose = function (success = undefined) {
	SocketObj.onClose((res) => {
		if (success != undefined) {
			success(res)
		}
	});
};
const onSocketOpen = function (success = undefined) {
	SocketObj.onOpen((res) => {
		if (success != undefined) {
			success(res)
		}
	});
};
const onSocketError = function (success = undefined) {
	SocketObj.onError((res) => {
		if (success != undefined) {
			success(res)
		}
	});
};
const onSocketMessage = function (success = undefined) {
	SocketObj.onMessage((res) => {
		if (success != undefined) {
			if (res.data instanceof ArrayBuffer) {
				res.data = arraybufferToStr(res.data);
			}
			success(res)
		}
	});
};
const closeSocket = function () {
	SocketObj.close();
};
const sendSocketMessage = function (data, success = undefined, fail = undefined) {
	SocketObj.send({
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
const arraybufferToStr = function (data) {
	return new TextDecoder("utf-8").decode(new Uint16Array(data))
};
/*
websocket结束
*/
export default {
	connectSocket,
	onSocketClose,
	sendSocketMessage,
	onSocketOpen,
	onSocketError,
	closeSocket,
	onSocketMessage
}
