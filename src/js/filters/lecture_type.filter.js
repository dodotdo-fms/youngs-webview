var isEmpty = require('lodash/isEmpty');
var filter = require('lodash/filter');
var includes = require('lodash/includes');

function LectureTypeFilter() {
    return function (lectureGroup, lectureTypes) {
        if (lectureTypes === 'all') return lectureGroup;
        else if (isEmpty(lectureTypes)) return [];

        return filter(lectureGroup, function (group) {
            return includes(lectureTypes, group.type);
        });
    };
}

module.exports = {
    name: 'LectureTypeFilter',
    fn: LectureTypeFilter
};
