import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import  userRouter  from './routes/users';

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', userRouter);

// Serve the React static files after build
app.use(express.static("../client/build"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
