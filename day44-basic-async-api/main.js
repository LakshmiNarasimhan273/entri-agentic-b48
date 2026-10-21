const express = require("express");

const app = express();

// 1) route --> API
app.get("/users", (req, res) => {
  res.send("User logged in");
});

// 2) health route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK: Success",
    message: "Server is running",
  });
});

// 3) Async Operation - fetch user data
app.get("/products", async (req, res) => {
  try {
    const user = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 2,
          title: "Watch",
        });
      }, 3000);
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(8080, () => {
  console.log("Server Running 8080");
});

// http://localhost:8080/users -> GET
// http:- HTTP Protocol
// localhost:- Domain
// 8080:- Port Number
// /users (or) /products - Endpoint

// http://localhost:8080/users/add -> POST
