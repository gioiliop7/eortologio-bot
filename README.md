
## Eortologio BOT
Eortologio Bot is a bot that sends you everyday a message about the Greek Namedays and notify you which name's day is today.

Data is parsed with RSS from https://www.greeknamedays.gr/

[Try](https://discord.com/api/oauth2/authorize?client_id=967419667377442887&permissions=534723951680&scope=bot) the bot on your server.
* In order to bot working on your server, you must create a channel named "eortologio"

## Installation

### Packages
Install the required modules with npm
```
npm install discord.js dotenv cron rss-parser
```

The packages we have installed are:

-   `discord.js`: a Node.js module to allow easy interactions with the Discord API.
-   `dotenv`: allows loading variables from process.env in Node apps.
-   `cron`: Repeat every time a schedule message
-   `rss-parser`: Help us to parse rss feed from https://www.greeknamedays.gr/


### Create an App in Discord
Then you need to create an app in Discord. Go to [Discord developers portal](https://discord.com/developers) and sign in or create a developer account.

Once you're logged in, click on 'New Application' at the top right of the window.

![alt text](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-1.png)

Then fill in the details of your app (i.e. name) and you will be taken to your app's dashboard. Navigate to 'Bot' and click 'Add Bot' to enable your app as a bot.

![alt text](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-2.png)

In the section appear, click copy to token. Create a .env file and store the token there or copy to your code (index.js)

### Install bot to server

Create a new Discord server with your Discord account to install the bot at.

Back at the App dashboard, navigate to 'OAuth2' and select  **'bot'**  under the Scopes section.![enter image description here](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-4.png)

You will see an URL being generated at the bottom. Copy this URL and paste it on a new tab. You will be redirected to the page that connects the bot on a server.

Install this bot to your preferred Discord server.
If everything works correctly, your bot should now appear in your Discord server.

After you paste the token in your code or stored it in an .env file, run the code.

```default
node index.js
```

## Contributing
Feel free to suggest anything in order to improve the project.

## Need to
I need to thank my friend [eliac7](https://www.iliasdev.eu/) about his help to host the bot and make it online. Check his bots and projects [here](https://github.com/eliac7).
