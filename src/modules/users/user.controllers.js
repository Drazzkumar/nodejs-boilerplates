import User from './user.model';

export async function signUp(req, res) {
  try {
    const oldUser = await User.find({
      $or: [
        { "email": req.body.email },
        { 'userName': req.body.userName }
      ]
    })
    if (oldUser && oldUser.length > 0) {
      res.status(409).json({ "message": "user exitst" })
    } else {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    }
  } catch (e) {
    return res.status(500).json(e);
  }
}

export function login(req, res, next) {
  res.status(200).json(req.user);

  return next();
}