require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User
    ]
});

client.commands = new Collection();

/* ========================= */
/* COMMAND HANDLER */
/* ========================= */

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
            console.log(`✅ Loaded Command: ${command.data.name}`);
        }
    }
}

/* ========================= */
/* EVENT HANDLER */
/* ========================= */

const eventFiles = fs
    .readdirSync("./events")
    .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) =>
            event.execute(...args, client)
        );
    } else {
        client.on(event.name, (...args) =>
            event.execute(...args, client)
        );
    }
}

/* ========================= */
/* KEEP RENDER ALIVE */
/* ========================= */

const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Nightfall is online!");
}).listen(process.env.PORT || 3000, () => {
    console.log("🌐 Web server started");
});

/* ========================= */
/* LOGIN */
/* ========================= */

client.login(process.env.TOKEN);
