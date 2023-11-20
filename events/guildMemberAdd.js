const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');

module.exports = {
    name: djs.Events.GuildMemberAdd,

    async execute(member) {
        try {
            const channel = member.guild.channels.cache.find(ch => ch.id === '1141804157599228014');
            if (!channel) return;

            const guildCount = member.guild.memberCount;

            const embedJoin = new djs.EmbedBuilder()
                .setDescription(`user: \`${member.user.tag}\` \n id: \`${member.user.id}\``)
                .setFooter({ text: `${guildCount} members` })
                .setTimestamp()
                .setColor('Green');
                

            await channel.send({ embeds: [embedJoin] });
        } catch (error) {
            log.error(error);
        }
    }
}