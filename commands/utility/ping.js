const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check bot latency"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("🏓 Pong!")
            .setDescription(
                `API Latency: **${interaction.client.ws.ping}ms**`
            )
            .setTimestamp()
            .setFooter({
                text: "Nightfall"
            });

        await interaction.reply({
            embeds: [embed]
        });
    }
};
