module.exports = {
  verifyOrigin: (req, res, next) => {
    // console.log(req.headers.referer)
    // if (!req.headers.referer && req.headers.referer !== 'http://localhost:3000')
    //   return res.status(403).json({ msg: 'Unauthorized' })
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  }
}
