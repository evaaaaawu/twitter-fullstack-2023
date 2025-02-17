const helpers = require('../_helpers')

const authenticated = (req, res, next) => {
  const isUser = helpers.getUser(req)?.role === 'user'
  if (helpers.ensureAuthenticated(req)) {
    if (isUser) {
      return next()
    }
    return res.redirect('/admin/tweets')
  } else {
    req.flash('error_messages', '請先登入!')
    return res.redirect('/signin')
  }
}

const authenticatedAdmin = (req, res, next) => {
  const isAdmin = helpers.getUser(req)?.role === 'admin'
  if (helpers.ensureAuthenticated(req)) {
    if (isAdmin) {
      return next()
    }
    req.flash('error_messages', '請至前台登入!')
    return res.redirect('/admin/signin')
  } else {
    req.flash('error_messages', '請先登入!')
    return res.redirect('/admin/signin')
  }
}

const redirectAdminTweet = (req, res, next) => {
  const isAdmin = helpers.getUser(req)?.role === 'admin'
  if (helpers.ensureAuthenticated(req)) {
    if (isAdmin) {
      return next()
    }
    req.flash('error_messages', '請至後台登入!')
    return res.redirect('/signin')
  } else {
    req.flash('error_messages', '請先登入!')
    return res.redirect('/signin')
  }
}

module.exports = {
  authenticated,
  authenticatedAdmin,
  redirectAdminTweet
}
