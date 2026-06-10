const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("View information about a user")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Select a user")
                .setRequired(false)
        ),

    async execute(interaction) {
        try {

            const user =
                interaction.options.getUser("user") ||
                interaction.user;

            const member = await interaction.guild.members
                .fetch(user.id)
                .catch(() => null);

            const embed = new EmbedBuilder()
                .setColor("#5865F2")
                .setTitle("👤 User Information")
                .setThumbnail(
                    user.displayAvatarURL({
                        dynamic: true,
                        size: 1024
                    })
                )
                .addFields(
                    {
                        name: "👤 Username",
                        value: user.tag,
                        inline: true
                    },
                    {
                        name: "🆔 User ID",
                        value: user.id,
                        inline: true
                    },
                    {
                        name: "🤖 Bot",
                        value: user.bot ? "Yes" : "No",
                        inline: true
                    },
                    {
                        name: "📅 Account Created",
                        value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
                        inline: false
                    },
                    {
                        name: "📥 Joined Server",
                        value: member
                            ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`
                            : "Unknown",
                        inline: false
                    },
                    {
                        name: "🎭 Roles",
                        value: member
                            ? member.roles.cache
                                  .filter(role => role.id !== interaction.guild.id)
                                  .map(role => role.toString())
                                  .slice(0, 10)
                                  .join(", ") || "None"
                            : "Unknown",
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
