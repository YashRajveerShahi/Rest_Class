const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "yash",
        content: "hii my name is Thakur Yash Rajveer Shahi and i am a billionaire !",
    },
    {
        id: uuidv4(),
        username: "Abhi",
        content: "hii my name is Abhishek bhaklandu and i am billionaire too !",
    },
    {
        id: uuidv4(),
        username: "Raj",
        content: "hii my name is Raj Shahi :) !",
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    post.content = req.body.content;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
