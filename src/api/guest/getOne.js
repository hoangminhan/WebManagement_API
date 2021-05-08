const GuestModel = require('../../models/guest')

const getOne = (req, res, next) => {
    const { _id } = req.params

    GuestModel.findOne({ _id })
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    guest: resData
                })
            } else {
                req.err = 'Không tìm thấy khách hàng!'
                next('last')
            }
        })
}

module.exports = getOne