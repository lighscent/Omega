const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');

module.exports = {
    name: djs.Events.GuildMemberAdd,

    async execute(member) {
        try {
            const channel = member.guild.channels.cache.find(ch => ch.id === '1157676909962985493');
            if (!channel) return;

            const guildCount = member.guild.memberCount;

            const embedJoin = new djs.EmbedBuilder()
                .setTitle(`[+] Welcome ${member.user.username}!`)
                .setDescription(`id:\`${member.user.id}\``)
                .setFooter({ text: `${guildCount} members`})
                .setTimestamp();

            await channel.send({ embeds: [embedJoin] });
        } catch (error) {
            log.error(error);
        }
    }
}