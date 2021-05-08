const GuestModel = require("../../models/guest");
const getPage = require("../../utils/getPage");
const PAGE_SIZE = 10;

const getAll = (req, res, next) => {
  const { cmnd, page, search } = req.query;
  const { skip, limit } = getPage(page, PAGE_SIZE);
  const query = {};

  let start = req.query.start && parseInt(req.query.start);
  let end = req.query.end && parseInt(req.query.end);

  if (!start || start < 0) start = 0;
  if (!end || end === 0) end = 99999999999999999999;
  if (cmnd && cmnd !== "null") query.cmnd = cmnd;
  if (search && search !== "null")
    query.text = { $regex: search, $options: "gi" };

  GuestModel.find(query)
    .populate("bought.product")
    .where("totalMoney")
    .gte(parseInt(start))
    .lt(parseInt(end))
    .skip(skip)
    .limit(limit)
    .then((resData) => {
      if (resData) {
        GuestModel.countDocuments(query)
          .where("totalMoney")
          .gte(parseInt(start))
          .lt(parseInt(end))
          .then((count) => {
            if (count || count === 0) {
              res.json({
                status: true,
                message: "Lấy khách hàng thành công!",
                guests: resData,
                currentPage: parseInt(page),
                totalPage: Math.ceil(count / PAGE_SIZE),
                totalGuests: count,
              });
            } else {
              req.err = "Lỗi lấy khách hàng!";
              next("last");
            }
          });
      } else {
        req.err = "Lỗi lấy khách hàng!";
        next("last");
      }
    })
    .catch((err) => {
      req.err = `Lỗi lấy khách hàng! + ${err}`;
      next("last");
    });
};

module.exports = getAll;
