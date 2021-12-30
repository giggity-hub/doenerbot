require('dotenv').config();
const snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');

const client = new snoowrap({
    userAgent: process.env.REDDIT_USER_AGENT_STRING,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
  });


const comments = new CommentStream(client, { 
    subreddit: 'ich_iel', 
    limit: 10, 
    pollTime: 1000,
});

const BOT_START = Date.now() / 1000;

comments.on('item', (item) => {
    if (item.created_utc < BOT_START) return;

    const euroRegex = /[0-9]+ ?(€|euro?)/i;
    const euroMatches = item.body.match(euroRegex);
    
    console.log(euroMatches);
    if (euroMatches) {
        // removes all non numeric characters from match
        const amount = euroMatches[0].replace(/\D/g,'');

        const stadtDoener = Math.floor(amount / 5);
        const landDoener = Math.floor(amount / 3.5)

        item.reply(`Das sind ${stadtDoener} Stadt Döner und ${landDoener} Land Döner`)
    }

});

