const ProductModel = require('../../models/product')

const update = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  
  ProductModel.findOneAndUpdate({
    _id
  }, data, { new: true })
    .then((resData) => {
      if (resData) {
        res.json({
          status: true,
          message: 'Cập nhật thành công!',
          newProduct: resData
        })
      } else {
        req.err = 'Lỗi cập nhật!'
        return next('last')
      }
    })
    .catch(err => {
      next('last')
    })
}

module.exports = update