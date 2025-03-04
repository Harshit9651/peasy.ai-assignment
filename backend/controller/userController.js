const FetchedUser = require("../models/fetchUserDataModel");

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    console.log(email);

    const user = await FetchedUser.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
console.log("user data is ",user);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


