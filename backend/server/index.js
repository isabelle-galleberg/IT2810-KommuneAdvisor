require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const port = process.env.PORT || 5000;
const app = express();
const connectDB = require("./config/db");

connectDB();
app.use(cors());
app.options("*", cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./schema/schema"),
    graphiql: process.env.NODE_ENV == "development",
  })
);

app.listen(port, console.log(`Server started on port ${port}`));
