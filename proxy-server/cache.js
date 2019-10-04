const rp = require('request-promise');

module.exports = {
    _listingsLatest: null,
    init: async function (requestOptions) {
        console.log('init')
        this.listingsLatest = await rp(requestOptions);
        setInterval(() => {
            rp(requestOptions).then(res => {
                this.listingsLatest = res;
                console.log('update');
            })
        }, 61000, requestOptions);
    },
    get: function () {
        return this.listingsLatest;
    },
    getRange: function (start, end) {
        return this.listingsLatest.slice(start, end);
    }
};