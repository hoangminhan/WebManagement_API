const GuestModel = require('../../models/guest')

const update = (req, res, next) => {
  const { _id } = req.params
  const data = req.body

  GuestModel.findOneAndUpdate({
    _id
  }, data, { new: true })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Cập nhật thành công!',
          newGuest: resData
        })
      } else {
        req.err = 'Lỗi cập nhật!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi cập nhật! ' + err
      next('last')
    })
}

module.exports = update