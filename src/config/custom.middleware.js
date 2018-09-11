export default function fixCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept,Authorization"
  );
  if (req.method === 'OPTIONS') {
    req.header('Access-Control-Allow-Methods', "PUT,PATCH,POST,DELETE,GET");
    return res.status(200).json({})
  }
  next();
}