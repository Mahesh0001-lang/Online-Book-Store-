import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user Already Exist" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const createUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });

    await createUser.save();
    res.status(201).json({ message: "user Created Succefully", user:{
        _id: createUser._id,
        fullname:createUser.fullname,
        email:createUser.email,
    } });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!user || !isMatched) {
      return res
        .isMatched(400)
        .json({ message: "Invalid username or Password" });
    } else {
      res.status(200).json({
        message: "Login Successfully",
        user: {
          _id: user.id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("error", +error.message);
    res.status(500).json({ message: "Internal Server Error---" });
  }
};
