const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');

module.exports = {
    name: djs.Events.ClientReady,
    async execute(client) {
        try {

            client.user.setPresence({
                status: 'online',
                activities: [
                    {
                        name: 'Counter Strike 2',
                        type: djs.ActivityType.Playing
                    }
                ]
            });




            db.query(`CREATE TABLE IF NOT EXISTS guilds (
                guildId VARCHAR(20) NOT NULL,
                PRIMARY KEY (guildId)
            )`);
    
            db.query(`CREATE TABLE IF NOT EXISTS modules (
                guildId VARCHAR(20) NOT NULL,
                feurModule BOOLEAN NOT NULL DEFAULT FALSE,
                PRIMARY KEY (guildId)
            )`);

            db.query(`CREATE TABLE IF NOT EXISTS dev (
                userId VARCHAR(20),
                PRIMARY KEY (userId)
            )`);

            db.query(`CREATE TABLE IF NOT EXISTS feurByUser (
                userId VARCHAR(20),
                feurCount INT DEFAULT 0,
                PRIMARY KEY (userId)
            )`)

            db.query(`CREATE TABLE IF NOT EXISTS feurByGuild (
                guildId VARCHAR(20),
                feurCount INT DEFAULT 0,
                PRIMARY KEY (guildId)
            )`)

            db.query(`CREATE TABLE IF NOT EXISTS botStats (
                feurCount INT NOT NULL DEFAULT 0
            )`)

            db.query(`CREATE TABLE IF NOT EXISTS userBanOnGuild (
                userId VARCHAR(20),
                guildId VARCHAR(20),
                duration INT,
                reason VARCHAR(255),
                PRIMARY KEY (userId)
            )`)

            db.query(`CREATE TABLE IF NOT EXISTS giveawayByGuild (
                guildId VARCHAR(20),
                channelId VARCHAR(20),
                messageId VARCHAR(20),
                duration INT,
                winnerCount INT,
                prize VARCHAR(255),
                PRIMARY KEY (guildId)
            )`)

            // // add guilds to table if not already in
            // const guilds = await client.guilds.fetch();
            // guilds.forEach(guild => {
            //     const guild_Id = guild.id;
            //     db.query(`INSERT IGNORE INTO guilds (guildId) VALUES ('${guild_Id}')`);
            //     log.db(`Added guild ${guild_Id} to table guilds`);
            //     db.query(`INSERT IGNORE INTO modules (guildId) VALUES ('${guild_Id}')`);
            //     log.db(`Added guild ${guild_Id} to table modules`);
            // });

            // // add users from guilds in table if not already in
            // const guildsInTable = await db.query(`SELECT guildId FROM guilds`);
            // guildsInTable.forEach(async guild => {
            //     const guildId = guild.guildId;
            //     const users = await client.guilds.cache.get(guildId).members.fetch();
            //     users.forEach(user => {
            //         const userId = user.id;
            //         db.query(`INSERT IGNORE INTO feurByUser (userId) VALUES ('${userId}')`);
            //         log.db(`Added user ${userId} to table feurByUser`);
            //     });
            // });
            

        } catch (error) {
            log.error(error);
        }
    },
}