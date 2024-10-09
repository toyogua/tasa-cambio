const cheerio = require('cheerio');
const axios = require('axios');
async function scrapeBanguatExchangeRate() {
    try {
        // Realizar la solicitud HTTP a la página
        const response = await axios.get('https://dolar.wilkinsonpc.com.co');
        const html = response.data;

        // Cargar el HTML en cheerio
        const $ = cheerio.load(html);

        // Extraer el valor del tipo de cambio
        const exchangeRate = $('.sube-numero').first().text().replace('$', '').trim();

        // Extraer la fecha del enlace
        const date = $('p a').first().attr('href').split('/')[1];

        return {
            date: date,
            exchangeRate: parseFloat(exchangeRate.replace(',', '')) || null
        };
    } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error.message);
        return null;
    }
}

module.exports = scrapeBanguatExchangeRate;