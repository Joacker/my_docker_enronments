function isAuthenticated(req, res, next) {
  const access_token = req.headers.access_token;
  if (!access_token) {
    return res.status(403).json({ success: false, message: 'User is not authorized' });
  }
  const user = verifyAuthToken(access_token); 
  if (!user) {
    return res.status(403).json({ success: false, message: 'User is not authorized' });
  }
  req.user = user;
  next();
}

function verifyAuthToken(token) {
  var user = null;
  try {
    user =  jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  } 
  return user;
}

module.exports = isAuthenticated;