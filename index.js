let Parser = require("rss-parser");
let parser = new Parser();
const yaml = require('js-yaml');
require("dotenv").config(); //initialize dotenv
const Discord = require("discord.js"); //import discord.js
const cron = require("cron");
const fs = require('fs');
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

try {
    let fileContents = fs.readFileSync('./app.yaml', 'utf8');
    let data = yaml.load(fileContents);
    const CLIENT_TOKEN = data.env_variables.CLIENT_TOKEN;

    let weekday = new Array(7);
    weekday[0] = "Κυριακή";
    weekday[1] = "Δευτέρα";
    weekday[2] = "Τρίτη";
    weekday[3] = "Τετάρτη";
    weekday[4] = "Πέμπτη";
    weekday[5] = "Παρασκευή";
    weekday[6] = "Σάββατο";

    const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    let scheduledMessage = new cron.CronJob("0 9 * * *", () => {
        (async () => {
            const ch = client.channels.cache.find(
                (channel) => channel.name === "general"
            );
            let feed = await parser.parseURL(
                "https://www.greeknamedays.gr/tools/eortologiorssfeed/index.php?langid=gr"
            );
            feed.items.forEach((item) => {
                let rssTitle = item.title;
                rssTitle = rssTitle.split(":");
                rssTitle = rssTitle[1];
                const d = new Date();
                const day = d.getDay();
                const date = d.getDate();
                const month = months[d.getMonth()];
                const year = d.getFullYear();
                const dayString = weekday[day];
                let today;
                if (rssTitle.includes('Δεν')) {
                    today = `❌ ${dayString},${date}/${month}/${year} ➡️`;
                } else {
                    today = `🎁 ${dayString},${date}/${month}/${year} ➡️ `;
                }
                ch.send({ content: today + rssTitle });
            });
        })();
    });

    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity("Greek namedays and inform you❤️", {
            type: "WATCHING",
        });
        scheduledMessage.start();
    });

    //make sure this line is the last line
    client.login(CLIENT_TOKEN); //login bot using token
} catch (e) {
    console.log(e);
}
