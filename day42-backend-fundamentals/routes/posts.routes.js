const postController = require("../controllers/posts.controller");

express.routes.post("/post", postController.createPost);