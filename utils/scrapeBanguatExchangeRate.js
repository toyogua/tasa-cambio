const cheerio = require('cheerio');
const axios = require('axios');
async function scrapeBanguatExchangeRate() {
    try {
        // Realizar la solicitud HTTP a la página
        const response = await axios.get('https://www.banguat.gob.gt/tipo_cambio/');
        const html = response.data;

        // Cargar el HTML en cheerio
        const $ = cheerio.load(html);

        // Extraer el valor del tipo de cambio
        const exchangeRate = $('.detalle_banguat td').first().text().trim();

        // Extraer la fecha del encabezado
        const dateText = $('.encabezado_banguat th').first().text();
        const dateMatch = dateText.match(/vigente para el\s+(.+)$/);
        const date = dateMatch ? dateMatch[1] : 'Fecha no encontrada';

        return {
            date: date,
            exchangeRate: parseFloat(exchangeRate) || null
        };
    } catch (error) {
        console.error('Error al obtener la tasa de cambio:', error.message);
        return null;
    }
}

module.exports = scrapeBanguatExchangeRate;