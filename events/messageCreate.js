const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');
const fs = require('fs');
const path = require('path');


module.exports = {
    name: djs.Events.MessageCreate,

    async execute(message) {
        try {
            if (message.author.bot) return;
        } catch (error) {
            log.error(error);
        }
    }
}