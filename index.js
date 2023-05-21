const Parser = require("rss-parser");
const Discord = require("discord.js");
const cron = require("cron");
require("dotenv").config();

const parser = new Parser();
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

const weekdays = [
  "Κυριακή",
  "Δευτέρα",
  "Τρίτη",
  "Τετάρτη",
  "Πέμπτη",
  "Παρασκευή",
  "Σάββατο",
];

const months = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

const scheduleMessage = new cron.CronJob({
  cronTime: "0 9 * * *",
  onTick: async () => {
    const channel = client.channels.cache.find((channel) => channel.name === "eortologio");
    const feed = await parser.parseURL("https://www.greeknamedays.gr/tools/eortologiorssfeed/index.php?langid=gr");

    feed.items.forEach((item) => {
      let rssTitle = item.title.split(":")[1];
      const currentDate = new Date();
      const day = currentDate.getDay();
      const date = currentDate.getDate();
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      const dayString = weekdays[day];

      let today;
      if (rssTitle.includes("Δεν")) {
        today = `❌ ${dayString},${date}/${month}/${year} ➡️`;
      } else {
        today = `🎁 ${dayString},${date}/${month}/${year} ➡️ `;
      }

      channel.send({ content: today + rssTitle });
    });
  },
  timeZone: "Europe/Athens"
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Greek namedays and inform you❤️", { type: "WATCHING" });
  scheduleMessage.start();
});

client.login(process.env.CLIENT_TOKEN);
