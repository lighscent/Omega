const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');

module.exports = {
    name: djs.Events.GuildCreate,

    async execute(guild) {
        try {
            const guild_Id = guild.id;
            
        } catch (error) {
            log.error(error);
        }
    }
}