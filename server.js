const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const AccountModel = require("./models/account");
const accountRouter = require("./routers/account");
const port = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// endpoint:register account
app.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.json("user nay da ton tai");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      res.json("tao tai khoan thanh cong !");
    })
    .catch((err) => {
      res.status(500).json("tao tai khoan that bai !");
    });
});

// endpoint:login account
app.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        res.json("dang nhap thanh cong");
      } else {
        res.status(400).json("dang nhap that bai !");
      }
    })
    .then((data) => {
      res.json("tao tai khoan thanh cong !");
    })
    .catch((err) => {
      res.status(500).json("co loi ben server !");
    });
});

app.use("/api/v1/account/", accountRouter);

// app.get("/", (req, res, next) => {
//   res.json("HOME");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
