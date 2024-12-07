let updateManager = uni;
/*
请求新版本信息回调
*/
const onCheckForUpdate = function (Fun = undefined) {
  updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    if (Fun != undefined) {
      Fun(res)
    }
  });
}
//新版本更新准备完毕回调
const onUpdateReady = function (Title_, content_) {
  updateManager.onUpdateReady(function (res) {
    uni.showModal({
      title: Title_,
      content: content_,
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate();
        }
      }
    });
  });
}
//新版本下载失败
const onUpdateFailed = function (Fun = undefined) {
  updateManager.onUpdateFailed(function (res) {
    if (Fun != undefined) {
      Fun(res)
    }
  });
}


export default {
  onCheckForUpdate,
  onUpdateReady,
  onUpdateFailed
}