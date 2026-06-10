const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roleinfo")
        .setDescription("View information about a role")
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("Select a role")
                .setRequired(true)
        ),

    async execute(interaction) {
        try {

            const role = interaction.options.getRole("role");

            const embed = new EmbedBuilder()
                .setColor(role.color || "#5865F2")
                .setTitle("🎭 Role Information")
                .addFields(
                    {
                        name: "📛 Role Name",
                        value: role.name,
                        inline: true
                    },
                    {
                        name: "🆔 Role ID",
                        value: role.id,
                        inline: true
                    },
                    {
                        name: "👥 Members",
                        value: `${role.members.size}`,
                        inline: true
                    },
                    {
                        name: "🎨 Color",
                        value: role.hexColor,
                        inline: true
                    },
                    {
                        name: "📢 Mentionable",
                        value: role.mentionable ? "Yes" : "No",
                        inline: true
                    },
                    {
                        name: "🔝 Position",
                        value: `${role.position}`,
                        inline: true
                    },
                    {
                        name: "📅 Created",
                        value: `<t:${Math.floor(role.createdTimestamp / 1000)}:F>`,
                        inline: false
                    }
                )
                .setFooter({
                    text: "Nightfall"
                })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed]
            });

        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: "❌ Utility system error.",
                ephemeral: true
            });
        }
    }
};
