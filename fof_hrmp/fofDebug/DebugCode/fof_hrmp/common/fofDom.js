/*
获取元素信息
*/
const boundingClientRect = function (this_, select, Fun = undefined) {
    const query = uni.createSelectorQuery().in(this_);
    query.select(select).boundingClientRect((data) => {
        if (Fun != undefined) {
            Fun(data)
        }
    }).exec();
}
export default {
    boundingClientRect
}