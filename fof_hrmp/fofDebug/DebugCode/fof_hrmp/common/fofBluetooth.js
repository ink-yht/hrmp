/*
蓝牙模块开始
*/
//初始化蓝牙模块
const openBluetoothAdapter = function (success_ = undefined, fail_ = undefined) {
    uni.openBluetoothAdapter({
        success: (res) => {
            if (success_ != undefined) {
                success_(res)
            }
        }, fail: (res) => {
            if (fail_ != undefined) {
                fail_(res)
            }
        }
    });
};
//搜索蓝牙设备
const startBluetoothDevicesDiscovery = function (services, success_ = undefined, fail_ = undefined) {
    let Obj = {
        success: (res) => {
            if (success_ != undefined) {
                success_(res)
            }
        }, fail: (res) => {
            if (fail_ != undefined) {
                fail_(res)
            }
        }
    }
    if (services != undefined) {
        if (services.length >= 1) {
            Obj["services"] = services
        }
    }
    uni.startBluetoothDevicesDiscovery(Obj);
};
//蓝牙设备搜索结果
const onBluetoothDeviceFound = function (success = undefined) {
	uni.onBluetoothDeviceFound(function (devices) {
	    if (success != undefined) {
	        let RetUrn = [];
	        for (let index = 0; index < devices["devices"].length; index++) {
	            let ObjData = { "name": devices["devices"][index].name, "deviceId": devices["devices"][index]["deviceId"], "RSSI": devices["devices"][index]["RSSI"], "advertisData": devices["devices"][index]["advertisData"], "advertisServiceUUIDs": devices["devices"][index]["advertisServiceUUIDs"], "localName": devices["devices"][index]["localName"], "serviceData": devices["devices"][index]["serviceData"], "描述": "name-蓝牙名称;deviceId-设备ID;RSSI-信号强度;advertisData-ManufacturerData数据段;advertisServiceUUIDs-ServiceUUIDs数据段;localName-localName数据段;serviceData-serviceData数据段" };
	            RetUrn[RetUrn.length] = ObjData;
	        }
	        success(RetUrn)
	    }
	});  
};
//监听蓝牙适配器状态变化
const onBluetoothAdapterStateChange = function (success = undefined) {
    uni.onBluetoothAdapterStateChange(function (res) {
        if (success != undefined) {
            success(res)
        }
    })
};
//获取处于已连接状态的设备
const getConnectedBluetoothDevices = function (success_ = undefined) {
    uni.getConnectedBluetoothDevices({
        success(res) {
            if (success_ != undefined) {
                success_(res)
            }
        }
    })
};
//获取蓝牙生效期已发现设备
const getBluetoothDevices = function (success_ = undefined) {
    uni.getBluetoothDevices({
        success(res) {
            if (success_ != undefined) {
                success_(res)
            }
        }
    })
};

//停止搜索蓝牙设备
const stopBluetoothDevicesDiscovery = function (success = undefined, fail = undefined) {
    uni.stopBluetoothDevicesDiscovery({
        success: (res) => {
            if (success != undefined) {
                success(res)
            }
        }, fail: (res) => {
            if (fail != undefined) {
                success(res)
            }
        }
    });
};
//关闭蓝牙模块
const closeBluetoothAdapter = function () {
    uni.closeBluetoothAdapter({
        success: () => {

        }, fail: () => {

        }
    });
};
//连接蓝牙设备
//deviceId为蓝牙设备ID
const createBLEConnection = function (deviceId, success = undefined, fail = undefined) {
    uni.createBLEConnection({
        deviceId: deviceId,
        success: () => {
            if (success != undefined) {
                success()
            }
        }, fail: () => {
            if (fail != undefined) {
                fail()
            }
        }
    });
};
//断开蓝牙连接
const closeBLEConnection = function (deviceId, success = undefined, fail = undefined) {
    uni.closeBLEConnection({
        deviceId: deviceId,
        success: (res) => {
            if (success != undefined) {
                success(res)
            }
        }, fail: (res) => {
            if (fail != undefined) {
                fail(res)
            }
        }
    });
};
//设置蓝牙最大传输单元
//最大传输单元(22,512) 区间内，单位 bytes
const setBLEMTU = function (deviceId, mtu) {
    uni.setBLEMTU({
        deviceId: deviceId,
        mtu: mtu
    });
};
//获取蓝牙设备所有服务(service)。
const getBLEDeviceServices = function (deviceId, success = undefined, fail = undefined) {
    uni.getBLEDeviceServices({
        deviceId: deviceId,
        success: (services) => {
            let servicesArr = [];
            if (success != undefined) {
                for (let index = 0; index < services.length; index++) {
                    let ObjData = { "ServerUuid": services[index].uuid, "isPrimary": services[index].isPrimary }
                    servicesArr[servicesArr.index] = ObjData;
                }
                success({ "servicesArr": servicesArr, "services": services, "描述": "ServerUuid-服务uuid;isPrimary-是否主服务;servicesArr-列表;services-整体数据" })
            }
        }, fail: () => {
            if (fail != undefined) {
                fail()
            }
        }
    });
};

//获取蓝牙服务特征值
const getBLEDeviceCharacteristics = function (deviceId, serviceId, success = undefined, fail = undefined) {
    uni.getBLEDeviceCharacteristics({
        deviceId: deviceId,
        serviceId: serviceId,
        success: (characteristics) => {
            let characteristicsArr = [];
            if (success != undefined) {
                for (let index = 0; index < characteristics.length; index++) {
                    let ObjData = { "uuid": characteristics[index].uuid, "properties": characteristics[index].properties, "描述": "uuid-特征值uuid;properties-支持操作类型" }
                    characteristicsArr[characteristicsArr.index] = ObjData;
                }
                success(characteristicsArr)
            }
        }, fail: () => {
            if (fail != undefined) {
                fail()
            }
        }
    });
};
//发送蓝牙信息
const writeBLECharacteristicValue = function (deviceId, serviceId, characteristicId, value) {
    uni.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: value
    });
};
let IfonBLECharacteristicValueChange = false;
//读取蓝牙信息
const readBLECharacteristicValue = function (deviceId, serviceId, characteristicId, success = undefined) {
    uni.readBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
    });
    if (IfonBLECharacteristicValueChange == false) {
        IfonBLECharacteristicValueChange = true
        uni.onBLECharacteristicValueChange(function (characteristic) {
            if (success != undefined) {
                success({ "deviceId": characteristic.deviceId, "deviceId": characteristic.deviceId, "serviceId": characteristic.serviceId, "value": characteristic.value, "characteristic": characteristic, "描述": "deviceId-特征值uuid;deviceId-设备ID;serviceId-服务uuid;value-最新特征值;characteristic-整体信息" })
            }
        })
    }

};
/*
蓝牙模块结束
*/
export default {
    openBluetoothAdapter,
    startBluetoothDevicesDiscovery,
    stopBluetoothDevicesDiscovery,
    closeBluetoothAdapter,
    onBluetoothDeviceFound,
    createBLEConnection,
    closeBLEConnection,
    setBLEMTU,
    getBLEDeviceServices,
    getBLEDeviceCharacteristics,
    writeBLECharacteristicValue,
    readBLECharacteristicValue,
    onBluetoothAdapterStateChange,
    getConnectedBluetoothDevices,
    getBluetoothDevices
}