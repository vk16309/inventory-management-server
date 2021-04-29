const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || require("./server-config.json").mongoURI || "wont_connect_";

// connect to the database
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((response) => {
    console.log('Connected to the database...');
    return response;
}).catch(err => console.log(err));

const userRouter = require('./routes/user.routes');
app.use('/user', userRouter);


app.get("/", (req,res) => {
  res.send("Welcome To Our Server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
