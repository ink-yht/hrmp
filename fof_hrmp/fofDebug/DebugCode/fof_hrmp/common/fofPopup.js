/*
打开弹出层
*/
const open = function (this_,ref) {
    this_.$refs[ref].open()
}
/*
关闭弹出层
*/
const close = function (this_,ref) {
    this_.$refs[ref].close()
}
export default {
    open,
    close
}