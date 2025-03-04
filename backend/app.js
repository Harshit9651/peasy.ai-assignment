const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const sequelize = require("./config/database");
const authRoutes = require("./route/authUser");
const UserRoutes = require("./route/userRoute");
const { startFetchingUsers } = require("./services/fatchUserServices");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/user", UserRoutes);

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

// WebSocket connection
startFetchingUsers(io);

io.on("connection", (socket) => {
  console.log("✅ New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(` Server running on port ${PORT}`);
});
