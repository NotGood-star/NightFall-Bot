module.exports = {
    name: "clientReady",
    once: true,

    async execute(client) {
        console.log(`✅ ${client.user.tag} is online!`);
        console.log(`🤖 Nightfall is ready!`);
        console.log(`📊 Serving ${client.guilds.cache.size} servers`);
    }
};
