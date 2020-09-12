module.exports = {
  verifyOrigin: (req, res, next) => {
    // console.log(req.headers.referer)
    // if (!req.headers.referer && req.headers.referer !== 'http://localhost:3000')
    //   return res.status(403).json({ msg: 'Unauthorized' })
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  }
}
