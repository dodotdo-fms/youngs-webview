var isFunction = require('lodash/isFunction');
var bulk = require('bulk-require');
var servicesModule = angular.module('app.services', []);
var services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(serivceMap) {
    Object.keys(serivceMap).forEach(function (key) {
        var item = serivceMap[key];

        if (!item) {
            return;
        }

        if (item.fn && isFunction(item.fn)) {
            servicesModule.service(item.name, item.fn);
        } else {
            declare(item);
        }
    });
}

declare(services);

module.expors = servicesModule;
