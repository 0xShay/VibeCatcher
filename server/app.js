const PORT = 3000;
require('dotenv').config();
const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_CONNECTION_URL);

const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
const { google } = require('googleapis');

const axios = require("axios");

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY, // Replace with your API key
  });

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

require("./auth")(connection);

app.get("/", (req, res) => {
    res.status(200).send("<a href=\"/auth/google\">Authenticate with Google</a>");
})

app.get("/auth/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/youtube.readonly"
    ]
}))

app.get("/auth/google/failure", (req, res) => {
    res.status(200).send("Login authentication failed");
})

app.get("/auth/google/callback", passport.authenticate("google"), isLoggedIn, (req, res) => {
    res.redirect("/dashboard");
})

app.get("/logout", (req, res) => {
    req.logout(console.error);
    res.send("Logged out")
})

app.get("/dashboard", isLoggedIn, (req, res) => {
    // https://www.googleapis.com/youtube/v3/liveStreams
    // axios.get(
    //     "https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet&mine=true",
    //     { headers: {"Authorization" : `Bearer ${req.user.accessToken}`} }
    // ).then(res => {
    //     console.log(res);
    // });
    // console.log(req.user);
    res.status(200).send("Dashboard");
})

app.get("/recent-streams", isLoggedIn, (req,res) => {
    //req.User.accessToken; -> to get channel ID
    const recentLiveStreams = getRecentLiveStreams(req.user.accessToken)
    .then((liveStreams) => {
      console.log('Recent live streams:', liveStreams);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    res.status(200).send(recentLiveStreams);
})

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
})

  async function getRecentLiveStreams(accessToken) {
    try {
        // Initialize the OAuth2 client
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });
    
        // Initialize the YouTube Data API client
        const youtube = google.youtube({
          version: 'v3',
          auth: oauth2Client,
        });
    
        // Fetch the channel information for the authenticated user
        const response = await youtube.channels.list({
          part: 'id',
          mine: true,
        });
        console.log(response.data.items);
    
        // Extract and return the channel ID
        if (response.data.items && response.data.items.length > 0) {
          const channelId = response.data.items[0].id;
          try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
              params: {
                part: 'snippet',
                channelId: `${channelId}`,
                key: process.env.GOOGLE_API_KEY,
              },
            });

            return response.data.items.length === 0 ? "empty": response.data.items;
          } catch (error) {
            console.error('Error fetching live streams:', error.message);
            return [];
          }
        } else {
          console.error('No channel found.');
          return null;
        }
    } catch (error) {
        console.error('Error fetching channel ID:', error.message);
        return null;
    }
}

async function insertUser(){
    try {
        // Initialize the OAuth2 client
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });
        
    
        // Initialize the YouTube Data API client
        const youtube = google.youtube({
          version: 'v3',
          auth: oauth2Client,
        });
    
        // Fetch the channel information for the authenticated user
        const response = await youtube.channels.list({
          part: 'id',
          mine: true,
        });

    } catch (error) {
        console.error('Error fetching channel ID:', error.message);
        return null;
    }
}
// req.User.accessToken -> access token
  
  // Example usage
  

    // const streamSchema = new mongoose.Schema({
    //     streamID : String,
    //     streamerID : String,
    //     timeStamp : Date,
    //     numChatUsers : Number,
    // });

    