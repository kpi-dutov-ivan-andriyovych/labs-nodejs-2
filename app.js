import express from "express";
import morgan from "morgan";
import path from "path";
import MEMBERS from "./data/members.json" with { type: "json" };

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
