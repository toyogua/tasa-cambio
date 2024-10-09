const scrapeBanguatExchangeRate = require("./scrapeBanguatExchangeRate");

async function main() {
    const result = await scrapeBanguatExchangeRate();
    if (result) {
        console.log('Tasa de cambio actual:', result.exchangeRate);
        console.log('Fecha:', result.date);
        return result
    }
    return null
}

module.exports = main;