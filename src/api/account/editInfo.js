const AccountModel = require('../../models/account')
const jwt = require('jsonwebtoken')

const editInfo = (req, res, next) => {
  const { userId } = req
  const { _id } = req.params

  if (userId === _id) {
    const data = req.body
    const oldPass = data.oldPass
    const newPass = data.newPass

    const newData = {}

    if(data.fullName && data.fullName.length > 0) {
      newData.fullName = data.fullName
    }
    if(data.phone && data.phone.length > 0) {
      newData.phone = data.phone
    }
    if(data.email && data.email.length > 0) {
      newData.email = data.email
    }

    let newToken

    if (oldPass) {
      if (oldPass.length > 0 && oldPass === userInfo.password) {
        newData.password = newPass
        newToken = jwt.sign({ _id: userInfo._id, username: userInfo.username, password: newPass }, 'mb1o4er') || null
      } else {
        req.err = 'Nhập sai mật khẩu cũ'
        next('last')
      }
    }

    AccountModel.updateOne({
      _id
    }, newData)
      .then(resData => {
        if (resData) {
          res.json({
            status: true,
            newInfo: newData,
            newToken
          })
        } else {
          req.err = 'Không thể thay đổi thông tin!'
          next('last')
        }
      })
      .catch(err => {
        req.err = 'Lỗi thay đổi thông tin + ' + err
        next('last')
      })
  } else {
    req.err = 'Bạn không có quyền'
    next('last')
  }

}

module.exports = editInfo