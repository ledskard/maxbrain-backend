require("dotenv").config({ encoding: "utf8" });
const TOKEN = {
  EXPIRE_TOKEN_MINUTES: process.env.EXPIRE_TOKEN_MINUTES || "",
  SECRET_TOKEN: process.env.SECRET_TOKEN || "",
};

export default TOKEN;
