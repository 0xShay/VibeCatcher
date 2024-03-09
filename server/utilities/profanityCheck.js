async function quickstart() {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();
  
    // The text messages to analyze
    var messages = [[
        '여러 나라 사람들 다모였농', 
        'memory keeps u attached with person i blesses to have poor memory', 
        '@Alchemist hm aur batao', 
        '@kate would you like to share about yourself', 
        '@Arif yep <3', 
        '@Rishab time waste?', 
        'Tata bye bye !', 
        '@cherry hey supp!!', 
        'nandyaa kadhi yenar parat'], 
        ['انت توجيهي ياا منير', 
        'Oh?', 
        'ye to lar bi nhi rhi', 
        'Lilly 🍫', 
        'hey.. the one who tagged me ..', 
        'زهيرة اي يلاعلى الواهس وزاري سوه خلنرسب😭😭', 
        'بعيد الشر رؤى 👀', 
        'mai ja rhi rone', 
        'انا توجيهي', 
        '@Annabelle എറണാകുളം 🙂', 
        '@Lilly yes?', 
        '@Cherry tu sangel tewha XD', 
        'coooooollllll', 
        'helloooo'], 
        ['turn it to beautiful Positivity rapid pace demand of world', 
        'Il y a des français ?', 
        'لا سندس، مرحلة ثانية جامعة اني', 
        'പെണുങ്ങൾ ശ്രമിക്കാതെ veezhunile ആണുങ്ങൾ', 
        'bhumi shi ho gai guys ab lrti nhi', 
        'allerga nhi yaar mood nhi h', 
        'ooo acha per tum dono ka baat se lagta hein ki ❤', 
        'noiceee', 
        'Absolutely dumb statement', 
        'nandu lol', 
        'helllo', 
        'bilauuuuuu', 
        '😭😭😭😭😭 هو عوزي بس ارسب سنة ثالثه حتى انشحت', 
        '@allegra क्या हुआ bhyi', 
        '#exam'], 
        ['😪الحياة هي الشر', 
        'ماااااااااااشاء الله', 
        'MOON you are ..I have seen you that day 🤒', 
        '@Arif i dont know what to say wait a minute', 
        'زهيرة بيه افلاونزة وراح اموت:eyes-purple-crying:', 
        'Samagra time waste nhi movie accha he h but Jo expect Kiya Tha woh nhi Hua but acchi he h', 
        'Qui de français', 
        '#exam', 
        'rO Assalamu_Alyekum____Ramadan-❤-Mubarak🥰', 
        '@kate what do you do,mean studies or job', 
        'روحت', 
        'wo din bhi kya din tha..', 
        'hello guys 😉👋', 
        'people like aayansh are narcisst', 
        '@Cherry ha chal magh yeto me (:', 
        'Shreya Pandey aur batao khane me kya hai', 
        '@kate ok', 
        '😂lol mist', 
        '@Rishab hmm', 
        'صح رؤى 🖐🏻👀', 
        'studies'], 
        ['he thinks he is intectuall n have high iq', 
        'EL MATADORE SALVADOR TEQUILA EL KONTOLE🤌', 
        'some girls sremichallum boys veezhulla', 
        'Bubbles, You can call me Danny. How are you?', 
        'Ramajan Mubarak brother', 
        'എനിക്ക് ടിപ്സ് ഒന്നും അറിയില്ല തനിക്ക് അതിന് ഒള്ള കഴിവ് ondenn തോന്നി പറഞ്ഞു', 
        'nandu hoo yee', 
        'زهيرة عادي امشي نشتري شقة خلنستقل ونبيع خضرة بلشارع', 
        '@cherry bhai bhul gaya:eyes-purple-crying:', 
        '@Cherry who?', 
        'كس امهاتكم يا عــــــــــــــــــــــــرب', 
        'MOON hehe ..pyari samajh gayi 🤒', 
        '@Alchemist pta nhi', 
        'تؤ بيه ولا بيج خيه 😟👈👉'
    ]];
    
    console.log(`FINAL VIDEO SENTIMENT: ${await calculateSentiment(messages)}`)
  }
  
  async function calculateSentiment(messages) {
    var scores=[]
    for (let interval = 0; interval < messages.length; interval++) {
      let totalIntervalScore = 0;
      let promises = []
      await messages[interval].forEach(async (message) => {
        promises.push(new Promise())
        const liveChatMessage = {
          content: message,
          type: 'PLAIN_TEXT',
        };
        // Detects the sentiment of the text
        try {
          const [result] = await client.analyzeSentiment({document: liveChatMessage});
          const sentiment = result.documentSentiment;
  
          console.log(`Text: ${message}`);
          console.log(`Sentiment score: ${sentiment.score}`);
  
          totalIntervalScore += sentiment.score;
        } catch (error) {
          if (error.details && error.details.includes('invalid argument')) {
            throw new Error('Language not supported by Google Cloud Natural Language API');
          }
        }
      });
      scores.push(totalIntervalScore/messages[interval].length)
    }
    return scores
  }
  
  quickstart().catch(console.error);
  