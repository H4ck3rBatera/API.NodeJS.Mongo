# API.NodeJS.Mongo
API + NodeJS + Express + Mongo

```shell
npm init

npm i express

npm i mongoose

node .\src\index.js
```

### docker-compose.yml
```yaml
version: "3"

services:
  mongo:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: 20DeJunhoDe1971
    ports:
      - "27017:27017"
    networks:
      - mongo-compose-network

networks:
  mongo-compose-network:
    driver: bridge
```

### database
```javascript
const mongoose = require("mongoose");

const uri = "mongodb://root:20DeJunhoDe1971@localhost:27017/";
mongoose
  .connect(uri)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
```

### models
```javascript
const mongoose = require("../database/index");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
```

### controllers
```javascript
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name } = req.body;
  const { email } = req.body;

  try {
    if (
      await User.findOne({
        email,
      })
    ) {
      return res.status(400).send({
        error: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
    });
    user.password = undefined;

    return res.send({
      user,
    });
  } catch (err) {
    return res.status(400).send({
      error: "Registration failed",
    });
  }
});

module.exports = (app) => app.use("/auth", router);
```
