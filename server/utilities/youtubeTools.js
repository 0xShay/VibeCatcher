const { google } = require('googleapis');
const axios = require("axios");
const mongoose = require("mongoose");

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

async function getRecentLiveStreams(channelID) {

    try {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=completed&maxResults=25&type=video&channelId=${channelID}&key=${process.env.GOOGLE_API_KEY}`);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching live streams:', error.message);
        return [];
    }

}

module.exports = { getChannels, getRecentLiveStreams, insertUserChannelsIntoDB };