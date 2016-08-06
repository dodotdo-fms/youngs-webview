var isFunction = require('lodash/isFunction');
var bulk = require('bulk-require');
var filtersModule = angular.module('app.filters', []);
var filters = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(filterMap) {
    Object.keys(filterMap).forEach(function (key) {
        var item = filterMap[key];

        if (!item) {
            return;
        }

        if (item.fn && isFunction(item.fn)) {
            filtersModule.filter(item.name, item.fn);
        } else {
            declare(item);
        }
    });
}

declare(filters);

module.expors = filtersModule;
