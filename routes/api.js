const express = require("express");
const router = express.Router();

const { ObjectId } = require("mongodb");
const User = require("../database/schemas/User");
const Question = require("../database/schemas/Question");

const { hashPassword, comparePassword } = require("../utilities/AuthFunctions");
const checkAccess = require("../utilities/AuthMiddleware");
const { getCompatibilityScore, shuffleArray } = require("../utilities/Secrets");

router.get("/questions", async (_req, res) => {
  const questions = await Question.find({});
  res.status(200).send(
    questions.map((q) => {
      return {
        id: q._id.valueOf(),
        question: q.question,
        options: q.options,
      };
    })
  );
});

// To add new user
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const data = {
      ...req.body,
      interests: req.body.interests.map((interest) => {
        return {
          question: new ObjectId(interest.question),
          option: interest.option,
        };
      }),
      password: hashedPassword,
    };

    let newUser = new User(data);
    await newUser.save();

    // req.session.userId = newUser._id.valueOf();

    // newUser = newUser.toObject();
    // newUser.id = newUser._id.valueOf();
    // delete newUser._id;
    // delete newUser.password;
    // delete newUser.swipes;
    // delete newUser.interests;

    res.status(201).send({
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Incorrect password");
    }

    // again get the whole user object

    let responseUser = await User.findById(user._id).lean();
    req.session.userId = responseUser._id.valueOf();

    responseUser.id = responseUser._id.valueOf();
    delete responseUser._id;
    delete responseUser.password;
    delete responseUser.swipes;
    delete responseUser.interests;

    res.status(200).send(responseUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/logout", checkAccess, async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Server error");
      }

      res.clearCookie("session");
      res.status(200).send("Logged out successfully");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/editUser", checkAccess, async (req, res) => {
  const userId = req.session.userId;

  const {
    name,
    description,
    handleType,
    handle,
    sexuality,
    preferredSexuality,
    year,
    image,
  } = req.body;

  const user = await User.findOne({ _id: new ObjectId(userId) });

  user.name = name;
  user.description = description;
  user.handleType = handleType;
  user.handle = handle;
  user.sexuality = sexuality;
  user.preferredSexuality = preferredSexuality;
  user.year = year;
  user.image = image;

  await user.save();

  return res.status(200).send("User updated successfully");
});

router.get("/checkCompatibility", checkAccess, async (req, res) => {
  const selfId = req.session.userId;
  const userId = req.query.userId;

  const user = await User.findOne({ _id: new ObjectId(userId) }).select(
    "interests"
  );
  const self = await User.findOne({ _id: new ObjectId(selfId) }).select(
    "interests"
  );

  const userInterests = user.interests;
  const selfInterests = self.interests;

  const compatibilityScore = getCompatibilityScore(
    userInterests,
    selfInterests
  );

  return res.status(200).send({ compatibilityScore });
});

router.get("/getProfile", checkAccess, async (req, res) => {
  try {
    const pageSize = req.query.pageSize;

    const userId = new ObjectId(req.session.userId);

    const user = await User.findOne({
      _id: userId,
    }).select("interests preferredSexuality matches swipes");

    // also should remove all the swipes with swipeStatus false after 30 days

    // matched and swiped ids
    const matchedIds = user.matches.map((match) => match.user);
    const swipedIds = user.swipes.map((swipe) => swipe.user);

    // Ids to be excluded
    const excludeIds = [...matchedIds, ...swipedIds, userId];

    // get all the users who are not swiped by the current user

    const nonSwipedAndNonMatchedUsers = await User.aggregate([
      {
        $match: {
          _id: { $nin: excludeIds },
          sexuality: { $eq: user.preferredSexuality },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          dob: 1,
          sexuality: 1,
          year: 1,
          branch: 1,
          handleType: 1,
          handle: 1,
          preferredSexuality: 1,
          image: 1,
          interests: 1,
        },
      },
      {
        $limit: +pageSize || +process.env.PAGE_SIZE || 1,
      },
    ]);

    const modifiedUsers = nonSwipedAndNonMatchedUsers.map((otherUser) => {
      const plainUser = otherUser;
      plainUser.id = plainUser._id.valueOf();
      delete plainUser._id;
      delete plainUser.password;
      delete plainUser.swipes;
      plainUser.compatibilityScore = getCompatibilityScore(
        user.interests,
        plainUser.interests
      );
      delete plainUser.interests;
      return plainUser;
    });

    // shuffle the array
    // shuffleArray(modifiedUsers);

    res.json(modifiedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
const user = router.get("/swipeCalled", checkAccess, async (req, res) => {
  try {
    const swipedUser = req.query.userId;
    const swipeStatus = req.query.swipeStatus;

    const userId = req.session.userId;

    const user = await User.findOne({
      _id: new ObjectId(userId),
    }).select("interests");

    // first check if the other user has swiped on the current user with status true

    const otherUser = await User.findOne({
      _id: new ObjectId(swipedUser),
      swipes: {
        $elemMatch: {
          user: new ObjectId(userId),
          flag: true,
        },
      },
    }).select("interests");

    if (otherUser && swipeStatus) {
      // if yes, then add a match to both the users, after removing the swipes from other user
      const compatibilityScore = getCompatibilityScore(
        otherUser.interests,
        user.interests
      );

      await User.updateOne(
        {
          _id: new ObjectId(swipedUser),
        },
        {
          $pull: {
            swipes: {
              user: new ObjectId(userId),
            },
          },
          $push: {
            matches: {
              user: new ObjectId(userId),
              compatibility: compatibilityScore,
            },
          },
        },
        { new: true }
      );

      await User.updateOne(
        {
          _id: new ObjectId(userId),
        },
        {
          $push: {
            matches: {
              user: new ObjectId(swipedUser),
              compatibility: compatibilityScore,
            },
          },
        },
        { new: true }
      );
    } else {
      await User.updateOne(
        {
          _id: new ObjectId(userId),
        },
        {
          $push: {
            swipes: { user: new ObjectId(swipedUser), flag: swipeStatus },
          },
        },
        { new: true }
      );
    }

    res.redirect(`/api/getProfile`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/matches", checkAccess, async (req, res) => {
  try {
    const userId = req.session.userId;

    // get all the matches, where user property of match object is replace by the user object
    const matches = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
      {
        $unwind: "$matches",
      },
      {
        $lookup: {
          from: "users",
          localField: "matches.user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          image: "$user.image",
          compatibilityScore: "$matches.compatibilityScore",
        },
      },
    ]);

    const modifiedMatches = matches.map((match) => {
      const plainMatch = match;
      plainMatch.id = plainMatch._id.valueOf();
      delete plainMatch._id;
      return plainMatch;
    });

    res.json(modifiedMatches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getMatchedProfile", async (req, res) => {
  const matchedUserId = req.query.userId;
  const userId = req.session.userId;

  try {
    // get the matched user object, still check whether the user is matched or not
    const matchedUser = await User.findOne({
      _id: new ObjectId(matchedUserId),
      matches: {
        $elemMatch: {
          user: new ObjectId(userId),
        },
      },
    });

    if (!matchedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const plainMatchedUser = matchedUser.toObject();
    plainMatchedUser.id = plainMatchedUser._id.valueOf();
    delete plainMatchedUser._id;
    delete plainMatchedUser.password;
    delete plainMatchedUser.swipes;
    delete plainMatchedUser.interests;
    delete plainMatchedUser.matches;

    res.json(plainMatchedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/test", checkAccess, async (req, res) => {
  res.json({ message: "Test successful" });
});

module.exports = router;
