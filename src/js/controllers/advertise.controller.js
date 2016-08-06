function AdvertiseCtrl($interval) {
    var vm = this;
    vm.advertises = [
        { id: 0, type: 'YoungsAdvertise' },
        { id: 1, type: 'YoungsAdvertise' },
        { id: 2, type: 'YoungsAdvertise' },
        { id: 3, type: 'YoungsAdvertise' }
    ];
    vm.currentIndex = 0;

    $interval(function () {
        if (vm.currentIndex === vm.advertises.length - 1) {
            vm.currentIndex = 0;
        } else {
            vm.currentIndex++;
        }
    }, 5000);
}

AdvertiseCtrl.$inject = ['$interval'];

module.exports = {
    name: 'AdvertiseCtrl',
    fn: AdvertiseCtrl
};
