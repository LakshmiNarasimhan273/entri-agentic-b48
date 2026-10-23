const express = require("express");
const app = express();
const errorHandler = require("./utils/errorHandler");

app.use(express.json());
app.use(errorHandler);

// In memory database
let todos = [
  {
    id: 1,
    title: "Learn Backend",
    content: "Understand Express Basics",
  },
];

// API Development

// READ - @GET
app.get("/todos", (req, res) => {
  res.status(200).json({
    count: todos.length,
    data: todos,
  });
});

// CREATE - @POST
app.post("/todos", (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      const error = new Error("Title and content are required");
      error.statusCode = 400;
      throw error;
    }

    const newTodo = {
      id: Date.now(),
      title,
      content,
    };

    todos.push(newTodo);
    res.status(201).json({ message: "Todo Created" });
  } catch (error) {
    next(error);
  }
});

// UPDATE - @PUT
app.put("/todos/:id", (req, res, next) => {
  try {
    const todo = todos.find(data => data.id === Number(req.params.id));

    if(!todo){
        const error = new Error("Todo not found");
        error.statusCode = 404;
        throw error;
    }

    const {title, content} = req.body;

    todo.title = title || todo.title;
    todo.content = content || todo.content;

    res.status(200).json({message: "Todo updated"});

  } catch (error) {
    next(error)
  }
});

// DELETE - @DELETE
app.delete("/todos/:id", (req, res, next) => {
  try {
    const todo = todos.find(
      data => data.id === Number(req.params.id)
    );

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      throw error;
    }

    todos = todos.filter(
      data => data.id !== Number(req.params.id)
    );

    res.status(200).json({
      message: "Todo deleted",
    });
  } catch (error) {
    next(error);
  }
});


app.listen(8081, () => {
  console.log("Server is running");
});
