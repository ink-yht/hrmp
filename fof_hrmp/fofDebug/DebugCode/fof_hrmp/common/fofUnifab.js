/*
生成按钮样式
*/
const pattern = function (color, backgroundColor, selectedColor, buttonColor, iconColor, icon) {
    {
        return {
            color: color,
            backgroundColor: backgroundColor,
            selectedColor: selectedColor,
            buttonColor: buttonColor,
            iconColor: iconColor,
            icon: icon
        };
    }
}
/*
生成展开菜单
*/
const content = function (iconPath, selectedIconPath, text, active) {
    return {
        iconPath: iconPath,
        selectedIconPath: selectedIconPath,
        text: text,
        active: active
    };
}
export default {
    pattern,
    content
}