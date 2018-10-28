import User from "./user.model";
import Transaction from "../transaction/transaction.model";
import Load from "../transaction/load.model";
export async function signUp(req, res) {
  try {
    const oldUser = await User.find({
      $or: [
        {
          email: req.body.email
        },
        {
          userName: req.body.userName
        }
      ]
    });
    if (oldUser && oldUser.length > 0) {
      res.status(200).json({ message: "user exitst", registered: false });
    } else {
      const user = await User.create(req.body);
      return res
        .status(201)
        .json({ message: "User Created!!", registered: true });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
}

export async function login(req, res, next) {
  res.status(200).json(req.user);
  return next();
}

export async function profile(req, res, next) {
  res.status(200).json(req.user.toAuthJSON());
  return next();
}
export async function getUserByEmail(req, res, next) {
  const userName = req.params.username;
  let user = await User.findOne({ userName });
  if (user) {
    res.status(200).json(user.toReceiverJSON());
  } else {
    res.status(404);
  }
  return next();
}

export async function send(req, res, next) {
  try {
    const { id, amount, remark, purpose } = req.body;
    let receiver = await User.findByIdAndUpdate(id);

    receiver.credits += Number(amount);
    req.user.credits -= Number(amount);
    let updateReceiver = await receiver.save();
    let updateUser = await req.user.save();

    if (updateReceiver && updateUser) {
      let detail = {
        receiver: id,
        sender: req.user.id,
        amount,
        remark,
        purpose
      };
      const transaction = new Transaction(detail);
      const saveTransaction = await transaction.save();
      res.status(200).json(req.user);
    }
    return next();
  } catch (e) {}
}

export async function load(req, res, next) {
  const { bank, amount, remark, account } = req.body;
  let data = {
    user: req.user.id,
    bank,
    account,
    amount,
    remark
  };
  let load = new Load(data);
  let loaded = await load.save();
  if (loaded) {
    req.user.credits += Number(amount);
    let updatedUser = await req.user.save();
    if (updatedUser) {
      res.status(200).json(req.user.toAuthJSON());
    } else {
      res.status(500);
    }
  } else {
    res.status(500);
  }
  return next();
}
