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

        // Extraer la fecha del elemento i con la clase fa-pen-to-square
        const dateText = $('i.d-block').text().trim();
        // Limpiamos el texto para obtener solo la fecha y hora
        const cleanDateText = dateText.replace(/\s+/g, ' ').trim();

        return {
            date: cleanDateText,
            exchangeRate: parseFloat(exchangeRate.replace(',', '')) || null
        };
    } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error.message);
        return null;
    }
}

module.exports = scrapeBanguatExchangeRate;