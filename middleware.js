malformedUrl = (req, res, next) => {
  var err = null;
  try {
    decodeURIComponent(req.path)
  }
  catch (e) {
    err = e;
  }
  if (err) {
    console.log(err, req.url);
    return res.redirect(['https://', req.get('Host'), '/404'].join(''));
  }
  //Once the error handler is done, next() will jump to the next function
  next()
}

module.exports = {
  malformedUrl
}
