//初始坐标
let InitialCoordinates = {
    "X坐标": 0,
    "Y坐标": 0
}
//摇杆坐标
let RockerCoordinates = {
    "X坐标": 0,
    "Y坐标": 0
}
//按下坐标
let PressCoordinates = {
    "X坐标": 0,
    "Y坐标": 0
}
//摇杆区域
let RockerArea = {
    "X坐标": 0,
    "Y坐标": 0
}
//摇杆宽高
let RockerWH = {
    "宽度": 0,
    "高度": 0
}
let Image;//摇杆图像地址
let WhetherToPress = false//是否按下摇杆
let zoom;//缩放度
const InitializeRocker = function (uniappfofClass,Image_, X, Y,zoom_=1.0) {
    zoom=zoom_;
    Image = Image_;
    uniappfofClass.getImageInfo(Image_, function (data) {
        if (data["图片宽度"] != undefined && data["图片高度"] != undefined) {
            RockerCoordinates["X坐标"] = X
            RockerCoordinates["Y坐标"] = Y
            InitialCoordinates["X坐标"] = X
            InitialCoordinates["Y坐标"] = Y
            RockerArea["X坐标"] = data["图片宽度"]*zoom
            RockerArea["Y坐标"] = data["图片高度"]*zoom
            RockerWH["宽度"] = data["图片宽度"]*zoom;
            RockerWH["高度"] = data["图片高度"]*zoom;
            PressCoordinates["X坐标"] = 0;
            PressCoordinates["Y坐标"] = 0;
        }
    })
};
//开始绘制摇杆，success只有一个参数，字符串类；传递当前的触发情况【上、下、左、右、上右、上左、下右、下左】
const DrawRocker = function (uniappfofClass,success = undefined) {
    let CenterPoint = {
        "X坐标": 0,
        "Y坐标": 0
    }
    CenterPoint["X坐标"] = InitialCoordinates["X坐标"] + RockerWH["宽度"] / 2
    CenterPoint["Y坐标"] = InitialCoordinates["Y坐标"] + RockerWH["高度"] / 2
    if (CenterPoint["X坐标"] < RockerCoordinates["X坐标"]) {
        RockerCoordinates["X坐标"] = CenterPoint["X坐标"]
    }
    if (CenterPoint["X坐标"] - RockerArea["X坐标"] > RockerCoordinates["X坐标"]) {
        RockerCoordinates["X坐标"] = CenterPoint["X坐标"] - RockerArea["X坐标"]
    }
    if (CenterPoint["Y坐标"] < RockerCoordinates["Y坐标"]) {
        RockerCoordinates["Y坐标"] = CenterPoint["Y坐标"]
    }
    if (CenterPoint["Y坐标"] - RockerArea["Y坐标"] > RockerCoordinates["Y坐标"]) {
        RockerCoordinates["Y坐标"] = CenterPoint["Y坐标"] - RockerArea["Y坐标"]
    }
    uniappfofClass.drawImage(Image, RockerCoordinates["X坐标"], RockerCoordinates["Y坐标"],RockerWH["宽度"]*zoom,RockerWH["高度"]*zoom);
    if (WhetherToPress == true) {
        let Rockerdeviation = 5;//摇杆偏移
        if (RockerCoordinates["X坐标"] > InitialCoordinates["X坐标"] + RockerArea["X坐标"] / Rockerdeviation && RockerCoordinates["Y坐标"] > InitialCoordinates["Y坐标"] + RockerArea["Y坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("下右")
                return;
            }
        }
        if (RockerCoordinates["X坐标"] > InitialCoordinates["X坐标"] + RockerArea["X坐标"] / Rockerdeviation && RockerCoordinates["Y坐标"] < InitialCoordinates["Y坐标"] - RockerArea["Y坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("上右")
                return;
            }
        }
        if (RockerCoordinates["X坐标"] < InitialCoordinates["X坐标"] - RockerArea["X坐标"] / Rockerdeviation && RockerCoordinates["Y坐标"] > InitialCoordinates["Y坐标"] + RockerArea["Y坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("下左")
                return;
            }
        }
        if (RockerCoordinates["X坐标"] < InitialCoordinates["X坐标"] - RockerArea["X坐标"] / Rockerdeviation && RockerCoordinates["Y坐标"] < InitialCoordinates["Y坐标"] - RockerArea["Y坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("上左")
                return;
            }
        }
        if (RockerCoordinates["X坐标"] < InitialCoordinates["X坐标"] - RockerArea["X坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("左")
                return;
            }
        }
        if (RockerCoordinates["X坐标"] > InitialCoordinates["X坐标"] + RockerArea["X坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("右")
                return;
            }
        }
        if (RockerCoordinates["Y坐标"] < InitialCoordinates["Y坐标"] - RockerArea["Y坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("上")
                return;
            }
        }
        if (RockerCoordinates["Y坐标"] > InitialCoordinates["Y坐标"] + RockerArea["Y坐标"] / Rockerdeviation) {
            if (success != undefined) {
                success("下")
                return;
            }
        }
    }
}
//抬起
const RockerLiftEventFun = function () {
    RockerCoordinates["X坐标"] = InitialCoordinates["X坐标"]
    RockerCoordinates["Y坐标"] = InitialCoordinates["Y坐标"]
    PressCoordinates["X坐标"] = 0
    PressCoordinates["Y坐标"] = 0
    WhetherToPress = false;
}
//滑动
const RockerSlideEventFun = function (changedTouches) {
    for (let index = 0; index < changedTouches.length; index++) {
        let X=changedTouches[index]["x"];
        let Y=changedTouches[index]["y"];
        if (RockerCollisionDetection(X, Y, RockerWH["宽度"] / 2, RockerWH["高度"] / 2) == true) {
            if (WhetherToPress == false) {
                PressCoordinates["X坐标"] = X
                PressCoordinates["Y坐标"] = Y
                RockerCoordinates["X坐标"] = InitialCoordinates["X坐标"]
                RockerCoordinates["Y坐标"] = InitialCoordinates["Y坐标"]
                WhetherToPress = true;
                return;
            }
            if (X > PressCoordinates["X坐标"] || X < PressCoordinates["X坐标"]) {
                //最原始右边X坐标
                let rightX = RockerCoordinates["X坐标"] + RockerWH["宽度"];  // 得到最原始最右边X坐标
                //按下处离最右边坐标偏移值
                let rightDeviationX = rightX - PressCoordinates["X坐标"];
                let LeftDeviationX = RockerWH["宽度"] - rightDeviationX;
                RockerCoordinates["X坐标"] = X - LeftDeviationX;
                PressCoordinates["X坐标"] = X;
    
            }
            if (Y > PressCoordinates["Y坐标"] || Y < PressCoordinates["Y坐标"]) {
                //最原始下边X坐标
                let lowerX = RockerCoordinates["Y坐标"] + RockerWH["高度"];  // 得到最原始最右边X坐标
                //按下处离最下边坐标偏移值
                let lowerDeviationX = lowerX - PressCoordinates["Y坐标"];
                //按下处离最顶边坐标偏移值
                let upperDeviationX = RockerWH["高度"] - lowerDeviationX;
                RockerCoordinates["Y坐标"] = Y - upperDeviationX;
                PressCoordinates["Y坐标"] = Y;
            }
        }
    }
}
export default {
    InitializeRocker,
    DrawRocker,
    RockerLiftEventFun,
    RockerSlideEventFun
}
function RockerCollisionDetection(x, y, deviationx, deviationy) {
    if (CollisionDetection(x, y) == true) {
        return true;
    }
    if (CollisionDetection(x + deviationx, y) == true) {
        return true;
    }
    if (CollisionDetection(x - deviationx, y) == true) {
        return true;
    }
    if (CollisionDetection(x, y + deviationy) == true) {
        return true;
    }
    if (CollisionDetection(x, y - deviationy) == true) {
        return true;
    }
    if (CollisionDetection(x + deviationx, y + deviationy) == true) {
        return true;
    }
    if (CollisionDetection(x - deviationx, y - deviationy) == true) {
        return true;
    }
    if (CollisionDetection(x + deviationx, y - deviationy) == true) {
        return true;
    }
    if (CollisionDetection(x - deviationx, y + deviationy) == true) {
        return true;
    }
    return false;
}
function CollisionDetection(x, y) {
    var isClick = false;
    if (x >= RockerCoordinates["X坐标"] && x <= RockerCoordinates["X坐标"] + RockerWH["宽度"] && y >= RockerCoordinates["Y坐标"] && y <= RockerCoordinates["Y坐标"] + RockerWH["高度"]) {
        isClick = true;
    }
    return isClick;
}