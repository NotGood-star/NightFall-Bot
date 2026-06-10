const {
    SlashCommandBuilder,
    EmbedBuilder,
    version
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Shows information about Nightfall"),

    async execute(interaction) {

        const client = interaction.client;

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("🌙 Nightfall Information")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: "🤖 Bot Name",
                    value: client.user.username,
                    inline: true
                },
                {
                    name: "🆔 Bot ID",
                    value: client.user.id,
                    inline: true
                },
                {
                    name: "🏓 Ping",
                    value: `${client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: "🏠 Servers",
                    value: `${client.guilds.cache.size}`,
                    inline: true
                },
                {
                    name: "👥 Users",
                    value: `${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: "📦 Discord.js",
                    value: `v${version}`,
                    inline: true
                }
            )
            .setFooter({
                text: "Nightfall"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
