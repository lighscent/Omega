const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');

module.exports = {
    name: djs.Events.GuildCreate,

    async execute(guild) {
        try {
            const guild_Id = guild.id;

            db.query(`INSERT IGNORE INTO guilds (guildId) VALUES ('${guild_Id}')`);
            log.db(`Added guild ${guild_Id} to table guilds`);
            db.query(`INSERT IGNORE INTO modules (guildId) VALUES ('${guild_Id}')`);
            log.db(`Added guild ${guild_Id} to table modules`);

            const users = await guild.members.fetch();
            users.forEach(user => {
                const userId = user.id;
                db.query(`INSERT IGNORE INTO feurByUser (userId) VALUES ('${userId}')`);
                log.db(`Added user ${userId} to table feurByUser`);
            });
            
        } catch (error) {
            log.error(error);
        }
    }
}