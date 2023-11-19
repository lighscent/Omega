const djs = require("discord.js")
const log = require("../../logger")
const db = require("../../db")

module.exports = {
    data: new djs.SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the server")
        .setDefaultMemberPermissions(djs.PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName("user").setDescription("The user to ban").setRequired(true))
        .addIntegerOption(option => option.setName("duration").setDescription("The duration of the ban in days").setRequired(true)
            .addChoices({ name: "7 day", value: 7 }, { name: "14 days", value: 14 }, { name: "30 days", value: 30}, { name: "Permanent", value: 0}))
        .addStringOption(option => option.setName("reason").setDescription("The reason for the ban")),

    async execute(interaction) {
        const user = interaction.options.getUser("user")
        const duration = interaction.options.getInteger("duration")
        const reason = interaction.options.getString("reason")

        if (user.id !== interaction.user.id) {
            if (!user.bot) {
                if (!interaction.guild.members.cache.get(interaction.user.id).permissions.has(djs.Permissions.FLAGS.BAN_MEMBERS || djs.Permissions.FLAGS.ADMINISTRATOR)) {
                    const banEmbed = new djs.EmbedBuilder()
                        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
                        .setTitle("Ban")
                        .setDescription(`You have been banned from ${interaction.guild.name}`)
                        .addField("Reason", reason)
                        .addField("Duration", duration)
                        .setTimestamp()
                        .setColor("RED")
                        .setFooter("Ban by " + interaction.user.tag, interaction.user.displayAvatarURL())

                    try {
                        await user.send({ embeds: [banEmbed] })
                        log.info(`Message sent to ${user.tag} (${user.id}) on ${interaction.guild.name} (${interaction.guild.id}) by ${interaction.user.tag} (${interaction.user.id})`)
                        await interaction.guild.members.ban(user, { days: duration, reason: reason })
                        db.query(`INSERT INTO userBanOnGuild (userId, guildId, duration, reason) VALUES (${user.id}, ${interaction.guild.id}, ${duration}, ${reason})`)
                        log.db(`Added ban of ${user.tag} (${user.id}) on ${interaction.guild.name} (${interaction.guild.id}) by ${interaction.user.tag} (${interaction.user.id}) to table userBanOnGuild`)
                        return interaction.reply({ content: `${user.tag} has been banned`, ephemeral: true })
                    } catch (error) {
                        log.error(error)
                        return interaction.reply({ content: "I can't send a DM to this user", ephemeral: true }).then(() => {
                            interaction.guild.members.ban(user, { days: duration, reason: reason })
                            db.query(`INSERT INTO userBanOnGuild (userId, guildId, duration, reason) VALUES (${user.id}, ${interaction.guild.id}, ${duration}, ${reason})`)
                            log.db(`Added ban of ${user.tag} (${user.id}) on ${interaction.guild.name} (${interaction.guild.id}) by ${interaction.user.tag} (${interaction.user.id}) to table userBanOnGuild`)
                            interaction.reply({ content: `${user.tag} has been banned`, ephemeral: true })
                        })
                    }

                } else return interaction.reply({ content: "You can't ban a user with the same perms as you", ephemeral: true })
            } else return interaction.reply({ content: "You can't ban a bot", ephemeral: true });
        } else return interaction.reply({ content: "You can't ban yourself", ephemeral: true });
    }
}