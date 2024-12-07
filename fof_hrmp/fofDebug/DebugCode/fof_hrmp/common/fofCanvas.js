/*
画板操作开始
*/
var CanvasContextObj = [];
const createCanvasContext = function (canvasId) {
	let CvID = CanvasContextObj.length;
	CanvasContextObj[CvID] = uni.createCanvasContext(canvasId);
	return CvID;
};
const draw = function (CvID = 0)//渲染内容
{
	CanvasContextObj[CvID].draw()
}
const fillRect = function (X, Y, width, height, CvID = 0)//绘制填充矩形
{
	CanvasContextObj[CvID].fillRect(X, Y, width, height)
}
const rect = function (X, Y, width, height, CvID = 0)//画矩形
{
	CanvasContextObj[CvID].rect(X, Y, width, height)
}
const setFillStyle = function (Style = "", CvID = 0)//填充样式
{
	CanvasContextObj[CvID].setFillStyle(Style);
}
const fill = function (CvID = 0)//开始填充
{
	CanvasContextObj.fill();
}
//创建渐变
const createLinearGradient = function (X, Y, X1, Y2, ColorArr, CvID = 0) {
	var my_gradient = CanvasContextObj[CvID].createLinearGradient(X, Y, X1, Y2);
	for (let index = 0; index < ColorArr.length; index++) {
		my_gradient.addColorStop(ColorArr[index]["渐变度"], ColorArr[index]["渐变色"]);
	}
	return my_gradient;
}
//创建字体渐变
const createLinearGradientText = function (ColorArr, CvID = 0) {
	var my_gradient = CanvasContextObj[CvID].createLinearGradient(0, 0, this.canvasObjDom.width, 0);
	for (let index = 0; index < ColorArr.length; index++) {
		my_gradient.addColorStop(ColorArr[index]["渐变度"], ColorArr[index]["渐变色"]);
	}
	return my_gradient;
}
//清除矩形
const clearRect = function (X, Y, width, height, CvID = 0) {
	CanvasContextObj[CvID].clearRect(X, Y, width, height)
}
//创建图像对象
//img-图像路径
//directionType-0正常状态,1重复平铺,2X坐标重复平铺,3Y坐标重复平铺
const createPattern = function (image, directionType, CvID = 0) {
	let direction = "no-repeat";
	if (directionType == 0) {
		direction = "no-repeat";
	}
	if (directionType == 1) {
		direction = "repeat";
	}
	if (directionType == 2) {
		direction = "repeat-x";
	}
	if (directionType == 3) {
		direction = "repeat-y";
	}
	var pat = CanvasContextObj[CvID].createPattern(image, direction, CvID = 0);
	return pat;
}
//设置全局画笔透明度
const setGlobalAlpha = function (alpha, CvID = 0) {
	CanvasContextObj[CvID].setGlobalAlpha(alpha);
}
//画图片
//image-某个本地图片的路径
const strokeImage = function (image, X, Y, CvID = 0) {
	CanvasContextObj[CvID].drawImage(image, X, Y);
}
//画图片2
//image-某个本地图片的路径
const drawImage = function (image, X, Y, dWidth, dHeight, sx, sy, sWidth, sHeight, CvID = 0) {
	CanvasContextObj[CvID].drawImage(image, X, Y, dWidth, dHeight, sx, sy, sWidth, sHeight);
}
//画文本
//Iffill-是否填充，默认真
//Style-样式，字体的样式单独设置，可以是字体渐变、颜色等
const strokeText = function (Text, x, y, Iffill = true, Style = "", CvID = 0) {
	if (Iffill == true) {
		if (Style != "" && Style != null && Style != undefined) {
			CanvasContextObj[CvID].setFillStyle(Style);
		}
		CanvasContextObj[CvID].fillText(Text, x, y);
	} else {
		if (Style != "" && Style != null && Style != undefined) {
			CanvasContextObj[CvID].setStrokeStyle(Style);
		}
		CanvasContextObj[CvID].strokeText(Text, x, y);
	}
}
//1	文本的中心被放置在指定的位置。
//2	文本在指定的位置开始。
//3	文本在指定的位置结束。
const setTextAlign = function (Align = 0, CvID = 0) {
	let AlignText = "center";
	if (Align == 1) {
		AlignText = "center";
	}
	if (Align == 2) {
		AlignText = "left";
	}
	if (Align == 3) {
		AlignText = "right";
	}
	CanvasContextObj[CvID].setTextAlign(AlignText);
}
//设置画笔颜色
const setStrokeStyle = function (Style, CvID = 0) {
	CanvasContextObj[CvID].setStrokeStyle(Style);
}
//设置线线条宽度
const setLineWidth = function (Size = 0, CvID = 0) {
	CanvasContextObj[CvID].setLineWidth(Size);
}
//设置字体字号
const setFontSize = function (Size = 0, CvID = 0) {
	CanvasContextObj[CvID].setFontSize(Size);
}
//绘制无填充矩形
const strokeRect = function (X, Y, width, height, CvID = 0) {
	CanvasContextObj[CvID].strokeRect(X, Y, width, height)
}
//设置画笔阴影
const shadowColor = function (x, y, Color, shadowColor, CvID = 0) {
	if (isObject(Color) == true) {
		CanvasContextObj[CvID].setShadow(Color[0], Color[1], Color[2], Color[3])
	} else {
		CanvasContextObj[CvID].setShadow(x, y, shadowColor, Color)
	}
}
function isObject(value) {
	return value !== null && typeof value === 'object';
}
//设置画笔阴影偏移
const shadowOffset = function (X, Y, CvID = 0) {
	CanvasContextObj[CvID].shadowOffsetX(X);
	CanvasContextObj[CvID].shadowOffsetY(Y);
}
//末端样式
//C_lineCap-0默认直线,1圆角,2四角直边
const lineCap = function (C_lineCap = -1, CvID = 0) {
	let lineCap = 'butt';
	if (C_lineCap == 0) {
		lineCap = 'butt'
	}
	if (C_lineCap == 1) {
		lineCap = 'round'
	}
	if (C_lineCap == 2) {
		lineCap = 'square'
	}
	CanvasContextObj[CvID].setLineCap(lineCap);
}
//绘制直线
const DrawAstraightLine = function (X1, Y1, X2, Y2, CvID = 0) {
	CanvasContextObj[CvID].beginPath();
	CanvasContextObj[CvID].moveTo(X1, Y1);
	CanvasContextObj[CvID].lineTo(X2, Y2);
	CanvasContextObj[CvID].stroke();
}
//最大斜接长度
//Limit-数值类
const setMiterLimit = function (Limit = -1, CvID = 0) {
	CanvasContextObj[CvID].setMiterLimit(Limit);
}
//初始化坐标
const beginPath = function (CvID = 0) {
	CanvasContextObj[CvID].beginPath();
}
const closePath = function (CvID = 0) {
	CanvasContextObj[CvID].closePath();
}
//绘制完毕
const stroke = function (CvID = 0) {
	CanvasContextObj[CvID].stroke();
}
//起始绘制坐标
const moveTo = function (X, Y, CvID = 0) {
	CanvasContextObj[CvID].moveTo(X, Y);
}
//追加绘制节点
const lineTo = function (X, Y, CvID = 0) {
	CanvasContextObj[CvID].lineTo(X, Y);
}
//剪切
//方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。
const clip = function (CvID = 0) {
	CanvasContextObj[CvID].clip()
}
//二次贝塞尔曲线
//cpx-贝塞尔控制点的 x 坐标。
//cpy-贝塞尔控制点的 y 坐标。
//x-结束点的 x 坐标。
//y-结束点的 y 坐标。
const quadraticCurveTo = function (cpx, cpy, x, y, CvID = 0) {
	CanvasContextObj[CvID].beginPath();
	CanvasContextObj[CvID].moveTo(cpx, cpx);
	CanvasContextObj[CvID].quadraticCurveTo(cpx, cpy, x, y);
	CanvasContextObj[CvID].stroke();
}
//三次贝塞尔曲线
//cp1x-第一个贝塞尔控制点的 x 坐标。
//cp1y-第一个贝塞尔控制点的 y 坐标。
//cp2x-第二个贝塞尔控制点的 x 坐标。
//cp2y-第二个贝塞尔控制点的 y 坐标。
//x-结束点的 x 坐标。
//y-结束点的 y 坐标。
const bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y, CvID = 0) {
	CanvasContextObj[CvID].beginPath();
	CanvasContextObj[CvID].moveTo(cp1x, cp1x);
	CanvasContextObj[CvID].bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
	CanvasContextObj[CvID].stroke();
}
//画圆
//x-圆的中心的 x 坐标。
//y-圆的中心的 y 坐标。
//r-圆的半径。
//sAngle-起始角，以弧度计（弧的圆形的三点钟位置是 0 度）。
//eAngle-结束角，以弧度计。
const arc = function (x, y, r, sAngle, eAngle, CvID = 0) {
	CanvasContextObj[CvID].beginPath();
	CanvasContextObj[CvID].arc(x, y, r, sAngle, eAngle);
	CanvasContextObj[CvID].stroke();
}
//画弧
//x1-两切线交点的横坐标。
//y1-两切线交点的纵坐标。
//x2-第二条切线上一点的横坐标。
//y2-第二条切线上一点的纵坐标。
//r-弧的半径。
const arcTo = function (x1, y1, x2, y2, r, CvID = 0) {
	CanvasContextObj[CvID].arcTo(x1, y1, x2, y2, r);
}
//缩放
//scaleheight-缩放当前绘图的宽度（1=100%，0.5=50%，2=200%，依次类推）。
//scaleheight-缩放当前绘图的高度（1=100%，0.5=50%，2=200%，依次类推）。
const scale = function (scalewidth, scaleheight, CvID = 0) {
	CanvasContextObj[CvID].scale(scalewidth, scaleheight);
}
//旋转
//angle-宣传角度
const rotate = function (angle, CvID = 0) {
	CanvasContextObj[CvID].rotate(angle);
}
//重置映射位置
//方法重新映射画布上的 (0,0) 位置。
//注意：当使用本方法之后调用诸如 绘制填充矩形() 之类的方法时，值会添加到 x 和 y 坐标值上。
const translate = function (x, y, CvID = 0) {
	CanvasContextObj[CvID].translate(x, y);
}
//重置单位矩阵
//a-水平缩放绘图。
//b-水平倾斜绘图。
//c-垂直倾斜绘图。
//d-垂直缩放绘图。
//e-水平移动绘图。
//f-垂直移动绘图。
const setTransform = function (a, b, c, d, e, f, CvID = 0) {
	CanvasContextObj[CvID].setTransform(a, b, c, d, e, f);
}
//保存到栈
const save = function (CvID = 0) {
	CanvasContextObj[CvID].save();
}
//从栈中恢复
const restore = function (CvID = 0) {
	CanvasContextObj[CvID].restore();
}
//保存画板图片
const canvasToTempFilePath = function (success = undefined, canvasId, x = 0, y = 0, width = undefined, height = undefined) {
	if (width != undefined && height != undefined) {
		uni.canvasToTempFilePath({
			x: x,
			y: y,
			width: width,
			height: height,
			canvasId: canvasId,
			success: (res) => {
				if (success != undefined) {
					success(res.tempFilePath)
				}
			}
		})
	} else {
		uni.canvasToTempFilePath({
			x: x,
			y: y,
			canvasId: canvasId,
			success: (res) => {
				if (success != undefined) {
					success(res.tempFilePath)
				}
			}
		})
	}
}
/*
画板操作结束
*/
export default {
	createCanvasContext,//初始化画板-画板
	fillRect,//绘制填充矩形-画板
	rect,//画矩形-画板
	setFillStyle,//填充样式-画板
	fill,//开始填充-画板
	createLinearGradient,//创建渐变-画板
	createLinearGradientText,//创建字体渐变-画板
	clearRect,//清除矩形-画板
	strokeImage,//画图片-画板
	createPattern,//创建图像对象-画板
	strokeText,//画文本-画板
	setTextAlign,//画板相关
	setStrokeStyle,//设置画笔颜色-画板
	setLineWidth,//设置线线条宽度-画板
	setFontSize,//设置字体字号-画板
	strokeRect,//绘制无填充矩形-画板
	shadowColor,//设置画笔阴影-画板
	shadowOffset,//设置画笔阴影偏移-画板
	lineCap,//末端样式-画板
	DrawAstraightLine,//绘制直线-画板
	setMiterLimit,//最大斜接长度-画板
	beginPath,//初始化坐标-画板
	stroke,//绘制完毕-画板
	moveTo,//起始绘制坐标画板
	lineTo,//绘制直线-画板
	clip,//剪切-画板
	quadraticCurveTo,//二次贝塞尔曲线-画板
	bezierCurveTo,//三次贝塞尔曲线-画板
	arc,//画圆-画板
	arcTo,//画弧-画板
	scale,//缩放-画板
	rotate,//旋转-画板
	translate,//重置映射位置-画板
	setTransform,//重置单位矩阵-画板
	save,//保存到栈-画板
	restore,//从栈中恢复-画板
	draw,//渲染内容-画板
	drawImage,//画图片2-画板
	closePath,//画板相关
	canvasToTempFilePath,//保存画板图片-画板
	setGlobalAlpha//设置全局画笔透明度-画板
}
