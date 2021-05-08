const ProductModel = require('../../models/product')
const uploadImage = require('../../utils/uploadImage')
const toSlug = require('../../utils/toSlug')

const create = (req, res, next) => {
  const data = req.body

  ProductModel.findOne({
    slug: toSlug(data.name)
  })
    .then(resData => {
      if (resData) {
        req.err = 'Sản phẩm đã tồn tại!'
        next('last')
      } else {
        const newData = {
          ...data
        }

        const newProduct = new ProductModel(newData)
        newProduct.save(err => {
          if (err === null) {
            res.json({
              status: true,
              message: 'Thêm sản phẩm thành công!',
              newProduct: newProduct
            })
          } else {
            req.err = 'Thêm sản phẩm thất bại!'
            console.log(err)
            next('last')
          }
        })
      }
    })
}

module.exports = create