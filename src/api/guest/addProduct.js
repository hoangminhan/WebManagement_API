const GuestModel = require('../../models/guest')
const ProductModel = require('../../models/product')

const addProduct = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { productId, totalMoney, quantity } = data

  GuestModel.updateOne({
    _id
  }, {
    totalMoney: parseInt(totalMoney),
    $push: {
      bought: { product: { _id: productId }, quantity, buyTime: Date.now() }
    }
  })
    .then(resData => {
      if (resData) {
        ProductModel.findOneAndUpdate({
          _id: productId
        }, { $inc: { sold: 1 } })
          .then((status) => {
            res.json({
              status: true,
              message: 'Cập nhật khách hàng thành công!'
            })
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

module.exports = addProduct