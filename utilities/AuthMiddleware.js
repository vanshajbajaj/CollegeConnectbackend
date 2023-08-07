const checkAccess = async (req, res, next) => {
  console.log({
    session: req.session?.userId,
  });
  if (!req.session?.userId) {
    return res.status(401).send("You are not logged in");
  }
  next();
};

module.exports = checkAccess;
