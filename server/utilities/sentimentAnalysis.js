// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

const mongoose = require("mongoose");

const ChatAnalytic = require("../models/ChatAnalytic");

// The text messages to analyze

var chatMessages;
var chatTimeStamp;
var userStreamID;
var averageSentimentScore;

async function sentimentAnalyser(givenStreamID, givenTimestamp, messages) {
  let totalSentimentScore = 0;
  let nonIgnoredMessages = 0;

  for (let i = 0; i < messages.length; i++) {
      const liveChatMessage = {
          content: messages[i],
          type: 'PLAIN_TEXT',
      };

      // Detects the sentiment of the text
      try {
        const [result] = await client.analyzeSentiment({document: liveChatMessage});
        const sentiment = result.documentSentiment;

        console.log(`Text: ${messages[i]}`);
        console.log(`Sentiment score: ${sentiment.score}`);

        totalSentimentScore += sentiment.score;
        nonIgnoredMessages += 1;
      } catch (error) {
        if (error.details && error.details.includes('invalid argument')) {
          continue;
        }
      }
  }

  averageSentimentScore = totalSentimentScore / nonIgnoredMessages;
  console.log(`Average Stream Sentiment Score: ${averageSentimentScore}`);
  return averageSentimentScore;
}

module.exports =  async function(){
    await sentimentAnalyser(userStreamID, chatTimeStamp, chatMessages).catch(console.error);
    let newCA = new ChatAnalytic({
        streamID: userStreamID,
        timestamp: chatTimeStamp,
        sentimentScore: averageSentimentScore
    });
    newCA.save().catch((err) => { console.error(err); });
    
    console.log("added");
};