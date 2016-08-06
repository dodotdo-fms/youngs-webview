var isNumber = require('lodash/isNumber');

function NumberFilter() {
    return function (number) {
        if (!isNumber(number)) return number;
        return number.toFixed(1);
    };
}

module.exports = {
    name: 'NumberFilter',
    fn: NumberFilter
};
