const { google } = require('googleapis');
const axios = require("axios");
const mongoose = require("mongoose");
const language = require('@google-cloud/language');

const Channel = require("../models/Channel");

// retrieve a list of channel objects, given an accessToken
async function getChannels(accessToken) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
    });

    const response = await youtube.channels.list({
        part: 'id',
        mine: true,
    });

    return response.data?.items;
}

// retrieve recent live streams as a list, given a channelID which has been authorized
async function getRecentLiveStreams(channelID) {
    try {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    channelId: `${channelID}`,
                    key: process.env.GOOGLE_API_KEY,
                },
            });
            return response.data.items;
        } catch (error) {
            console.error('Error fetching live streams:', error.message);
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

// insert any non-yet existing user-channel ID records into the database
async function insertUserChannelsIntoDB(userID, accessToken) {
    const channels = await getChannels(accessToken);
    for (c of channels) {
        let channel = await Channel.findOne({
            userID: userID,
            channelID: c.id
        });
        if (!channel) {
            let newChannel = new Channel({
                userID: userID,
                channelID: c.id
            });
            await newChannel.save().catch((err) => {
                console.error(err);
                return false;
            });
        };
    };
    return true;
}

function getLiveStreamMessages(streamID){
    var liveChatId = getLiveChatId(streamID);
    

}

// Get Live Stream Chat Id
function getLiveChatId(liveStreamId) {
    return gapi.client.youtube.videos.list({
      "part": [
        "liveStreamingDetails"
      ],
      "id": [
        liveStreamId
      ]
    })
        .then(function(response) {
                var liveChatId = response.result.items[0].liveStreamingDetails.activeLiveChatId;
                // Handle the results here (response.result has the parsed body).
                console.log("Live Chat Id Response", liveChatId);
                return liveChatId;
              },
              function(err) { console.error("Execute error", err); });
  
    }

// Fetch All Messages into an Array
function fetchAllMessages(liveChatId, allMessages, pageToken = '') {
    getLiveChatMessages(liveChatId, pageToken).then(response => {
      const messages = response.result.items.map(item => item.snippet.displayMessage);
      allMessages.push(...messages);
  
      // Check if there is a nextPageToken to continue paginating
      if (response.result.nextPageToken) {
        // If there is, fetch the next page of messages
        fetchAllMessages(liveChatId, allMessages, response.result.nextPageToken);
      } else {
        // If there isn't, we are done fetching all messages
        console.log('Fetched all messages:', allMessages);
        // Here you could do something with allMessages like return them or store them
      }
    }).catch(error => {
      console.error('Error fetching messages:', error);
    });
}

  // Get All Live Stream Messages
function getLiveStreamMessages(liveStreamId) {
    // First, get the live chat ID
    getLiveChatId(liveStreamId).then(liveChatId => {
      if (liveChatId) {
        // Then, begin fetching messages
        fetchAllMessages(liveChatId, []);
      } else {
        console.error('No Live Chat ID found for the given stream ID.');
      }
    }).catch(error => {
      console.error('Error getting liveChatId:', error);
    });
  }

  // formate the text for moderate text
  async function moderateText(textContent) {
    // The text to analyze
    const text = textContent;
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the language of the text
    try {
      const [result] = await client.moderateText({ document });
      const classifications = result.categories; 
        // CLASSIFICATIOn to be fixed
      console.log('Text moderation results:');
      classifications.forEach(category => {
        console.log(`  Name: ${category.name}, Confidence: ${category.confidence}`);
      });
    } catch (err) {
      console.error('ERROR:', err);
    }
  }

  


module.exports = { getChannels, getRecentLiveStreams, insertUserChannelsIntoDB };