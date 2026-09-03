const { isAuthenticated } = require('./_lib/auth');

module.exports = async (req, res) => {
  res.status(isAuthenticated(req) ? 200 : 401).json({ authenticated: isAuthenticated(req) });
};
