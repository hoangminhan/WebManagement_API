const GuestModel = require('../../models/guest')
const mongoose = require('mongoose')

const create = (req, res, next) => {
  const myId = mongoose.Types.ObjectId()
  const data = req.body
  data._id = myId

  GuestModel.findOne({
    cmnd: data.cmnd
  })
    .then(resData => {
      if (resData) {
        req.err = 'chứng minh nhân dân đã tồn tại!'
        next('last')
      } else {
        const newGuest = new GuestModel(data)
        newGuest.save(err => {
          if (err === null) {
            res.json({
              status: true,
              newGuest: newGuest,
              message: 'Thêm khách hàng thành công!'
            })
          } else {
            req.err = `Thêm khách hàng thất bại! + ${err}`
            next('last')
          }
        })
      }
    })
    .catch(err => {
      req.err = `Thêm khách hàng thất bại! + ${err}`
      next('last')
    })
}

module.exports = create