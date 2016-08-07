var forEach = require('lodash/forEach');

var apiBase = (process.env.BUILD_ENV === 'development') ?
    'http://192.168.1.100:8080/api' : '/api';

function apiMaker(apis) {
    var convertApis = {};

    forEach(apis, function (api, name) {
        convertApis[name] = apiBase + api;
    });

    return convertApis;
}

module.exports = {
    api: apiMaker({
        auth: '/auth/member',
        lecture: '/lecture',
        lectureOne: '/lecture/${lectureId}',
        member: '/member',
        review: '/lecture/${lectureId}/review'
    }),

    typeMenu: [
        { id: 0, name: '전체', value: 'all' },
        { id: 1, name: 'OPIC', value: 'OPIC' },
        { id: 2, name: '토플', value: 'TOEFL' },
        { id: 3, name: '토익', value: 'TOEIC' },
        { id: 4, name: '회사 면접', value: 'INTERVIEW' },
        { id: 5, name: '자유주제', value: 'FREE' },
        { id: 6, name: '일상생활', value: 'LIFE' }
    ],

    typeMenuMap: {
        OPIC: 'OPIC',
        TOEFL: '토플',
        TOEIC: '토익',
        INTERVIEW: '회사 면접',
        FREE: '자유주제',
        LIFE: '일상생활'
    }
};
