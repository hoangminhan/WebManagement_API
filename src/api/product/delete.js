const ProductModel = require("../../models/product");

const remove = (req, res, next) => {
  const { _id } = req.params;
  console.log("id: ", _id);
  ProductModel.deleteOne({
    _id: _id,
  })
    .then((resData) => {
      if (resData) {
        res.json({
          status: true,
          message: "Xoá sản phẩm thành công!",
        });
      } else {
        req.err = "Không thể xóa";
        next("last");
      }
    })
    .catch((err) => {
      req.err = "Lỗi xóa sản phẩm! " + err;
      next("last");
    });
};

module.exports = remove;
