const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5jZzFQUFowckducjljdGVydjVpYTNVQTlCMUVsNWluV1NiVkpCcDVWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjZBNDg3TXRkZnEvdk00cEpGN0EwaHdxaE5yelRPd2p1bXlPSXJKWlNRTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnRVN3dEdnY21iWW10ZS9GSldHMWF4a2ZaTDdTSk1YRWR4WVlPTm5tQ2swPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUWlFCSE8zZjZWK1NBc0tEbXpWb29tMktma3U2Sng1WmFka3AwMlVKOXkwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdIZDRRRWVjZ3ZRYWxPQy9XRjJtbGw3WWlGQjFQQWJMVFNxNmVIOWxSRkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikc5QmcyYXFCVjRadWxkRlZ6eWNWVXBodzNoNHVsUHJWd1V5NjFhQjl0M3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUJES2l5SVM1OEVDMkh0biszYnhHWWViTFhzemx6dmtzVjVKS1ZDT0dWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNjdqZmhPZWFadVBmYVlVaVRmSi9aVW9XWDNFa1dpbUE4SnVwVzJCOHUwUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFxTXMrWmVtUllFaEdSSzF4NjVNbUFOSWF0elg4cjdnTEhYcFhRN1JrM01WQmVQQXVkNXMyaUM3UkUyYkkwemRqaUNoc2w1eFJURXlzVHhxdmNlbGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTcsImFkdlNlY3JldEtleSI6Ild3MTc5UDZkdEh1cDlQcndjZ05jaSt2anlzSXQ0TUhsc0pLSXBFKyt0LzA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEyMjYxODc4N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTJFMTQ5NkI3NTdBMkI2MTIxOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5OTUxOTI1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTIyNjE4Nzg3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQkUwRDQxODk0ODNFQzQ3QTBDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTk5NTE5Mjh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ikh5QUs3bU5iUlJTTlUxclYydG5wbVEiLCJwaG9uZUlkIjoiZTc3Y2I1M2UtNDFmYS00ZmZiLTkyMDUtNGI3YzI4ZTg1ZjkxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imo0SFVZM2FUV0ZIaVpjUm9vSlFBdEFBSVhWZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVOFUyVXdUWDd4OHNNNE55ZDZDMEhWL1NRSDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMkM5UERUQTYiLCJtZSI6eyJpZCI6IjIzNDgxMjI2MTg3ODc6NzlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiT0xBTUhJREUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pTaHlMd0NFS2JFa2JRR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjN0a0RzVjdrem5nR3E3WVNrNnNLandBbS9lQS9Na0tNcGZuSjRKZndXUkE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJwdnc5cVdWOFYxdHhkK3ZSSWU2WXU4a29NRTBTd2tUYTVvL2RTQ3g1eTQ5bjVBNDRBYUJHQnMwNUZCSmJJM0ZMZE9CeU84ZWg3ckRSME1RWFM2cWdBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJzK2U3WnZkYXgxaUFUc0dWdU5WK1ZmVUEwZE1WRGpKbWJ3RGsrdnpPNG8xRGtiMEZ5WXlidkZJZjFOM0YzWE9lbVVRV0NQdWZLbEZTZ2hEZFFmeWNodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMjI2MTg3ODc6NzlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZDdaQTdGZTVNNTRCcXUyRXBPckNvOEFKdjNnUHpKQ2pLWDV5ZUNYOEZrUSJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTk1MTkyMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFITGEifQ==',
    PREFIXE: process.env.PREFIX || "?",
    OWNER_NAME: process.env.OWNER_NAME || "olamide",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348122618787", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
