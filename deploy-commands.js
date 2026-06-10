require("dotenv").config();

const fs = require("fs");
const {
    REST,
    Routes
} = require("discord.js");

const commands = [];

/* ========================= */
/* LOAD COMMANDS */
/* ========================= */

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        if (command.data) {
            commands.push(command.data.toJSON());
        }
    }
}

/* ========================= */
/* REGISTER COMMANDS */
/* ========================= */

const rest = new REST({
    version: "10"
}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`🔄 Registering ${commands.length} commands...`);

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {
                body: commands
            }
        );

        console.log("✅ Slash commands registered!");
    } catch (error) {
        console.error(error);
    }
})();
