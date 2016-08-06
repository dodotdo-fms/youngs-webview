var cloneDeep = require('lodash/cloneDeep');
var reduce = require('lodash/reduce');
var isEmpty = require('lodash/isEmpty');

function studyFilterService(Constants) {
    var filter = 'all';

    return {
        getFilter: function () {
            return cloneDeep(filter);
        },

        getFilterStr: function () {
            if (filter === 'all') {
                return '전체';
            } else if (isEmpty(filter)) {
                return '(선택 안함)';
            }

            return reduce(filter, function (sum, val, index) {
                sum += Constants.typeMenuMap[val];

                if (index < filter.length - 1) {
                    sum += ', ';
                }

                return sum;
            }, '');
        },

        setFilter: function (newFilter) {
            filter = cloneDeep(newFilter);
        }
    };
}

studyFilterService.$inject = ['Constants'];

module.exports = {
    name: 'studyFilterService',
    fn: studyFilterService
};
