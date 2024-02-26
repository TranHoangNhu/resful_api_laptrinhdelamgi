const mongoose = require("mongoose");
// Trước khi sử dụng dotenv, đảm bảo bạn gọi nó ở đầu file
require("dotenv").config();
// Thông tin kết nối
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

// Kết nối với MongoDB
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.gwrbesw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

// Lấy đối tượng kết nối
const db = mongoose.connection;

// Xử lý sự kiện khi kết nối thành công
db.on("connected", () => {
  console.log("Đã kết nối thành công đến MongoDB Cloud");
});

// Xử lý sự kiện khi có lỗi kết nối
db.on("error", (err) => {
  console.error(`Lỗi kết nối đến MongoDB: ${err}`);
});

// Đảm bảo sự kết nối đóng khi ứng dụng kết thúc
process.on("SIGINT", () => {
  db.close(() => {
    console.log("Đã đóng kết nối đến MongoDB Cloud");
    process.exit(0);
  });
});

// Đoạn mã Schema và Model của file cũ
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "account",
  }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
