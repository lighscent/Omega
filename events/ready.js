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

            db.query(`CREATE TABLE IF NOT EXISTS users (
                userId VARCHAR(20) NOT NULL,
                permissionLevel INT NOT NULL DEFAULT 0,
                PRIMARY KEY (userId)
            )`);

        
        } catch (error) {
            log.error(error);
        }
    },
}