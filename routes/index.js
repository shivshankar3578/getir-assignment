const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const marked = require('marked');
const RecordModel = mongoose.model("Record");

/* GET home page. */
router.get('/records', function (req, res, next) {
  const { startDate, endDate, minCount, maxCount } = req.query
  RecordModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      $project: {
        totalCount: {
          $sum: "$counts"
        },
        key: "$value",
        createdAt: 1
      }
    },
    {
      $match: {
        totalCount: {
          $gte: parseInt(minCount),
          $lte: parseInt(maxCount)
        }
      }
    },
  ])
    .exec()
    .then(records => {
      res.json({
        code: 0,
        msg: "Success",
        records,
      })
    }).catch(next)

});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(marked(fs.readFileSync(process.cwd() +"/readme.md").toString()));
});
module.exports = router;
