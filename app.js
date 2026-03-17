import express from "express";
import morgan from "morgan";
import path from "path";
import FAQ from "./data/faq.json" with { type: "json" };
import students from "./data/members.json" with { type: "json" };

const app = express();

app.use("/fonts/geist", express.static("node_modules/geist/dist/fonts"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/img", express.static("img"));

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.get("/", (req, res) => res.render("index", { page: "home" }));

app.get("/faq", (req, res) => {
  const data = {
    faq: FAQ,
  };
  res.render("faq", { page: "faq", data });
});

app.get("/team", (req, res) => {
  res.render("team", { page: "team", students });
});

app.get("/student/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).render("404");
  }

  res.render("member", { page: "team", student });
});

app.use((req, res) => {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
