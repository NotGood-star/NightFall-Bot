const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Get Nightfall's invite link"),

    async execute(interaction) {

        const inviteLink =
            `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=bot%20applications.commands`;

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("🌙 Invite Nightfall")
            .setDescription(
                `[Click Here To Invite Nightfall](${inviteLink})`
            )
            .addFields({
                name: "🔑 Permissions",
                value: "Administrator"
            })
            .setFooter({
                text: "Nightfall"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
