const AccountModel = require('../../models/account')
const uploadImage = require('../../utils/uploadImage')
const removeImage = require('../../utils/removeImage')

const editAvt = (req, res, next) => {
  const { userId } = req
  const { _id } = req.params
  const data = req.body || {}
  const { oldImage, newImage } = data
  let image = {}

  if (userId !== _id) {
    return next('last')
  }

  if (newImage) {
    uploadImage(newImage, {}, (err, result) => {
      if (err) {
        req.err = 'Lỗi upload ảnh! ' + err
        return next('last')
      }

      if (result && result.url) {
        image = {
          url: result.url,
          publicId: result.public_ids || result.public_id
        }

        AccountModel.updateOne({
          _id
        }, {
          image
        })
          .then(resData => {
            if (resData) {
              if (oldImage.publicId) {
                removeImage(oldImage.publicId, {}, (err, result) => {
                  if (err) {
                    console.log('Lỗi xóa ảnh!')
                  }
                  if (result) {
                    console.log('Xóa ảnh thành công')
                  }
                })
              }

              res.json({
                status: true,
              })
            }
          })
      }
    })
  }

}

module.exports = editAvt