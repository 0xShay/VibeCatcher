// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

const mongoose = require("mongoose");

const ChatAnalytic = require("../models/ChatAnalytic");

// The text messages to analyze
var messages = [
  '여러 나라 사람들 다모였농', 
  'memory keeps u attached with person i blesses to have poor memory', 
  '@Alchemist hm aur batao', 
  '@kate would you like to share about yourself', 
  '@Arif yep <3', 
  '@Rishab time waste?', 
  'Tata bye bye !', 
  '@cherry hey supp!!', 
  'nandyaa kadhi yenar parat', 
  'انت توجيهي ياا منير', 
  'Oh?', 
  'ye to lar bi nhi rhi', 
  'Lilly 🍫'
];

const timestamp1 = Date.now();
const streamID1 = "1234567890";
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
}

module.exports =  async function(){
    await sentimentAnalyser(streamID1, timestamp1, messages).catch(console.error);
    let newCA = new ChatAnalytic({
        streamID: streamID1,
        timestamp: timestamp1,
        sentimentScore: averageSentimentScore
    });
    newCA.save().catch((err) => { console.error(err); });
    
    console.log("added");
};