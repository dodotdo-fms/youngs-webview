function TimeFilter() {
    return function (timestamp) {
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();

        return year + '.' + month + '.' + date;
    };
}

module.exports = {
    name: 'TimeFilter',
    fn: TimeFilter
};
