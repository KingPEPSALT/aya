const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host:'localhost',
    dialect:'sqlite',
    logging:false,
    storage:'database.sqlite'
});

const CurrencyShop = require('./models/currency_shop')(sequelize, Sequelize.DataTypes);
require('./models/user')(sequelize, Sequelize.DataTypes);
require('./models/user_items')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async ()=>{
    const shop = [
        CurrencyShop.upsert({name: 'Dirt Tea', cost: 1}),
        CurrencyShop.upsert({name: 'Breakfast Tea', cost: 5}),
        CurrencyShop.upsert({name: 'Green Tea', cost: 11}),
        CurrencyShop.upsert({name: 'Rich Tea', cost: 20}),
        CurrencyShop.upsert({name: 'Divine Tea', cost: 50})
    ];
    await Promise.all(shop);
    console.log('Database Synced!');
    sequelize.close();
}).catch(console.error);