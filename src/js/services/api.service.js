var template = require('lodash/template');

function apiService($http, $q, tokenFactory, Constants) {
    var getHeader = function () {
        return {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + tokenFactory.getToken()
        };
    };

    var templateApi = function (api, obj) {
        var apiTemplate = template(api);
        return apiTemplate(obj);
    };

    return {
        getLectures: function (params) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: Constants.api.lecture,
                    params: params,
                    headers: getHeader()
                }).then(
                    function (res) { resolve(res.data.results); },
                    function (err) { reject(err); }
                );
            });
        },

        getLecture: function (lectureId, level) {
            var params = {};

            if (level) params.level = level;

            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: templateApi(Constants.api.lectureOne, {
                        lectureId: lectureId
                    }),
                    params: params,
                    headers: getHeader()
                }).then(
                    function (res) { resolve(res.data.results); },
                    function (err) { reject(err); }
                );
            });
        },

        getBestTeachers: function () {
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: Constants.api.member,
                    params: {
                        best_teacher: true
                    },
                    headers: getHeader()
                }).then(
                    function (res) { resolve(res.data.results); },
                    function (err) { reject(err); }
                );
            });
        },

        postLecture: function (title, description, type, imageUrl) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: Constants.api.lecture,
                    data: {
                        title: title,
                        description: description,
                        type: type,
                        img: imageUrl
                    },
                    headers: getHeader()
                }).then(
                    function (res) { resolve(res.data.results); },
                    function (err) { reject(err); }
                );
            });
        },

        postReview: function (lectureId, point, content) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: templateApi(Constants.api.review, {
                        lectureId: lectureId
                    }),
                    data: {
                        point: point,
                        content: content
                    },
                    headers: getHeader()
                }).then(
                    function (res) { resolve(res.data.results); },
                    function (err) { reject(err); }
                );
            });
        },

        logout: function () {
            return $q(function (resolve, reject) {
                $http({
                    method: 'DELETE',
                    url: Constants.api.auth,
                    headers: getHeader()
                }).then(
                    function (res) { resolve(res.data.results); },
                    function (err) { reject(err); }
                );
            });
        }
    };
}

apiService.$inject = ['$http', '$q', 'tokenFactory', 'Constants'];

module.exports = {
    name: 'apiService',
    fn: apiService
};
