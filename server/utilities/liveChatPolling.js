const { google } = require('googleapis');
const fetch = require('node-fetch');
const apiKey = process.env.GOOGLE_API_KEY;;
let nextPageToken = "";

function extractBroadcastId(url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
}

async function getLiveChatId(liveStreamId) {
    const youtube = google.youtube({
        version: 'v3',
        auth: apiKey
    });

    const response = await youtube.videos.list({
        part: ['liveStreamingDetails'],
        id: [liveStreamId]
    });

    return response.data.items[0].liveStreamingDetails.activeLiveChatId;
}

async function getLiveChatMessages(liveChatId) {
    const youtube = google.youtube({
        version: 'v3',
        auth: apiKey
    });

    const response = await youtube.liveChatMessages.list({
        liveChatId: liveChatId,
        part: ['snippet'],
        pageToken: nextPageToken
    });

    return response.data;
}

async function pollNewMessages(liveChatId, liveStreamId) {
    try {
        const response = await getLiveChatMessages(liveChatId);
        nextPageToken = response.nextPageToken;
        const messages = response.items.map(item => item.snippet.displayMessage);

        let lastMessageTimestamp = response.items.length > 0 
        ? response.items[response.items.length - 1].snippet.publishedAt
        : "No messages";

        // console.log([messages, lastMessageTimestamp]);

        var sentimentScore = await analyzeChatSentiment(liveStreamId, lastMessageTimestamp, messages);
        // console.log(sentimentScore);

        setTimeout(() => pollNewMessages(liveChatId, liveStreamId), 30000);

        return [liveStreamId,lastMessageTimestamp, lastMessageTimestamp];
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

async function analyzeChatSentiment(streamID, timestamp, messages) {
    console.log(new Date(timestamp));
    // try {
    //     const response = await fetch('/analyzeSentiment', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ streamID, timestamp, messages }),
    //     });

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }

    //     const data = await response.json();
    //     console.log('Sentiment Score:', data.sentimentScore);
    //     return data.sentimentScore;
    // } catch (error) {
    //     console.error('Error during sentiment analysis:', error);
    // }
}

async function handleChatIdClick() {
    let url = "https://www.youtube.com/watch?v=jfKfPfyJRdk&ab_channel=LofiGirl";
    let liveStreamId = extractBroadcastId(url);
    if (liveStreamId) {
        const liveChatId = await getLiveChatId(liveStreamId);
        pollNewMessages(liveChatId, liveStreamId);
    }
}

handleChatIdClick();
