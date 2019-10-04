const cache = require('../cache');

module.exports.listingsLatest = async (req, res) => {
    try {
        res.status(200).json(cache.getRange(0, 100));
    } catch (error) {
        errorHandler(res, error);
    }
};