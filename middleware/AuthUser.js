import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Mohon Login ke akun anda" });

  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const SuperAdminOnly = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "superAdmin")
    return res.status(403).json({ msg: "Akses Di Tolak" });
  next();
};
