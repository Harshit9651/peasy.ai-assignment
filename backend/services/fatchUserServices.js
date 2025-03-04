const axios = require("axios");
const FetchedUser = require("../models/fetchUserDataModel");

const fetchAndStoreUsers = async (io) => {
  try {
    const allStoredUsers = await FetchedUser.findAll();
    io.emit("updateUsers", { allUsers: allStoredUsers, newUsers: [] });

    const response = await axios.get("https://randomuser.me/api/?results=20");
    const users = response.data.results;

    let newUsers = [];

    for (let user of users) {
      const existingUser = await FetchedUser.findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        const savedUser = await FetchedUser.create({
          name: `${user.name.first} ${user.name.last}`,
          age: user.dob.age,
          email: user.email,
          details: user,
        });

        newUsers.push(savedUser);
      }
    }

    io.emit("updateUsers", { allUsers: allStoredUsers, newUsers: [] });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
  }
};

const startFetchingUsers = (io) => {
  fetchAndStoreUsers(io);
  setInterval(() => fetchAndStoreUsers(io), 20000);
};

module.exports = { startFetchingUsers };
