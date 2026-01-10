const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

module.exports = function(req,res,next){
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN
  if(!token) return res.status(401).json({ error: 'No token, auth denied' });

  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err){
    res.status(401).json({ error: 'Token is not valid' });
  }
}