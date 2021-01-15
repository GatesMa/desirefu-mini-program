const app = getApp();

function uploadFile(path, type) {

  return new Promise((resolve, reject) => {
    console.log('uploadFile')
    wx.uploadFile({
      url: app.globalData.baseUrl + '/desire_fu/v1/upload/upload_file',
      filePath: path,
      name: 'file',
      header: {
        'Accept': 'application/json'
      },
      formData: {
        'account_id': 1,
        'account_type': 1,
        'file_type': type
      },
      success (res){
        // console.log(JSON.parse(res.data).data.file_url)
        //do something
        resolve(JSON.parse(res.data).data.file_url);
      },
      fail: err => {
        reject(err)
      }
    })
  })

}

module.exports = {
  uploadFile: uploadFile
}