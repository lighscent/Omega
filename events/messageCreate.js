const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');
const fs = require('fs');
const path = require('path');


module.exports = {
    name: djs.Events.MessageCreate,

    async execute(message) {
        try {
            const feurModule = await db.query(`SELECT feurModule FROM modules WHERE guildId = '${message.guild.id}'`);


            if (message.author.bot) return;

            //check in db if module feur is true
            if (feurModule[0].feurModule === true) {
                if (message.content.toLowerCase() === "quoi") {
                    db.query(`UPDATE feurByUser SET feurCount = feurCount + 1 WHERE userId = '${message.author.id}'`);
                    db.query(`UPDATE feurByGuild SET feurCount = feurCount + 1 WHERE guildId = '${message.guild.id}'`);
                    db.query(`UPDATE botStats SET feurCount = feurCount + 1`);
                    const feurCount = await db.query(`SELECT feurCount FROM botStats`);
                    message.channel.send("feur #" + feurCount[0].feurCount);
                }    
            } else return log.debug(`Module feur is not enabled in guild ${message.guild.id}`)

        } catch (error) {
            log.error(error);
        }
    }
}