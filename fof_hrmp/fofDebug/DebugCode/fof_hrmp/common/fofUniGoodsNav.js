/*
生成组件参数数据
*/
const options = function (icon, text, info, infoBackgroundColor, infoColor) {
    {
        let options = {
            icon: icon,
            text: text,
        }
        if (info != undefined) {
            options["info"] = info;
        }
        if (infoBackgroundColor != undefined) {
            options["infoBackgroundColor"] = infoBackgroundColor;
        }
        if (infoColor != undefined) {
            options["infoColor"] = infoColor;
        }
        return options;
    }
}
/*
生成组件按钮组数据
*/
const buttonGroup = function (text, backgroundColor, color) {
    return {
        text: text,
        backgroundColor: backgroundColor,
        color: color
    };
}
export default {
    options,
    buttonGroup
}