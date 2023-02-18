const express = require("express");
const pool= require("./connection/mysql.js")
const app = express();
const bodyparser= require("body-parser");
const cors = require("cors")
const cookieParser =require("cookie-parser")



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors());
  app.use(cookieParser());

  app.use('/profile', express.static('./upload/images'));

///////////////////////////// cookies ///////////////
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

/////////////////////     routes    /////////////////////////
///////////////// auth route //////////////////
app.use("/api/auth",require("./routes/auth.js"));
//////////
app.use("/api/user",require("./routes/user.js"));
////////
app.use("/api/post",require("./routes/post"));
///////////
app.use("/api/like",require("./routes/like_dislike"));
//////////////
app.use("/api/comment",require("./routes/comment"));
////////////////
app.use("/api/favourite",require("./routes/user_favourite"));
///////////////
app.use("/api/retweet",require("./routes/post_retweet"));
///////////////
app.use("/api/notification",require("./routes/notification"));
///////////////
app.use("/api/friendrequest",require("./routes/friendship_list"));
///////////////
app.use("/api/job",require("./routes/jobs"));
////////////////
app.use("/api/category",require("./routes/category"));
////////////////
app.use("/api/subcategory",require("./routes/sub_category"));
//////////////
app.use("/api/applyerlist",require("./routes/job_applyer_list"));
////////////////
app.use("/api/awards",require("./routes/user_award"));
/////////////////
app.use("/api/sociallinks",require("./routes/social_links"));
///////////////
app.use("/api/projects",require("./routes/projects"));
///////////////
app.use("/api/profile",require("./routes/user_profile"));
//////////////////
app.use("/api/follower",require("./routes/followers"));
///////////////
app.use("/api/commentreply",require("./routes/comment_reply"));
///////////
app.use("/api/status",require("./routes/status"));
////////////////////
app.use("/api/trend",require("./routes/top_trend"));





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
