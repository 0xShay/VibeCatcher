// Imports
const language = require('@google-cloud/language');
const mongoose = require("mongoose");
const ChatAnalytic = require("../models/ChatAnalytic");

// Instantiates a client
const client = new language.LanguageServiceClient();

// The sentiment analysis function
async function sentimentAnalyser(givenStreamID, givenTimestamp, messages) {
  let totalSentimentScore = 0;
  let nonIgnoredMessages = 0;

  for (let message of messages) {
      const liveChatMessage = {
          content: message,
          type: 'PLAIN_TEXT',
      };

      try {
        const [result] = await client.analyzeSentiment({document: liveChatMessage});
        const sentiment = result.documentSentiment;

        console.log(`Text: ${message}`);
        console.log(`Sentiment score: ${sentiment.score}`);

        totalSentimentScore += sentiment.score;
        nonIgnoredMessages += 1;
      } catch (error) {
        if (error.details && error.details.includes('invalid argument')) {
          continue;
        }
      }
  }

  if (nonIgnoredMessages > 0) {
    const averageSentimentScore = totalSentimentScore / nonIgnoredMessages;
    console.log(`Average Stream Sentiment Score: ${averageSentimentScore}`);
    return averageSentimentScore; // Return the average score
  } else {
    return null; // Return null or an appropriate value if no messages were processed
  }
}

// Exports the function
module.exports.sentimentAnalyser = async function(givenStreamID, givenTimestamp, messages) {
    const averageSentimentScore = await sentimentAnalyser(givenStreamID, givenTimestamp, messages).catch(console.error);
    if (averageSentimentScore !== null) { // Check if there is a calculated score
        let newCA = new ChatAnalytic({
            streamID: givenStreamID,
            timestamp: givenTimestamp,
            sentimentScore: averageSentimentScore
        });
        newCA.save().catch(console.error);
        
        console.log("Analysis added to database");
    } else {
        console.log("No valid sentiment score to add to database");
    }
};
