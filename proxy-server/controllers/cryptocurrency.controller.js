const rp = require('request-promise');

module.exports.listingsLatest = async (req, res) => {
    try {

        const requestOptions = {
            method: 'GET',
            uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=764e7952-b989-4cea-9fcf-cf7f8e4b9769',
            json: true,
            gzip: true
        };

        rp(requestOptions).then(response => {
            res.status(200).json(response.data);
            console.log('API call response:', response);
        }).catch((err) => {
            console.log('API call error:', err.message);
        });
    } catch (error) {
        errorHandler(res, error);
    }
};