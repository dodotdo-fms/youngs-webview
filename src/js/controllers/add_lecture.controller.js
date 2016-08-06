var escape = require('lodash/escape');

function AddLectureCtrl($scope, apiService) {
    var vm = this;

    vm.lectureTypeMenu = [
        { id: 1, name: 'OPIC', value: 'OPIC' },
        { id: 2, name: '토플', value: 'TOFEL' },
        { id: 3, name: '토익', value: 'TOEIC' },
        { id: 4, name: '회사 면접', value: 'INTERVIEW' },
        { id: 5, name: '자유주제', value: 'FREE' },
        { id: 6, name: '일상생활', value: 'LIFE' }
    ];
    vm.lectureInfo = {
        title: '',
        description: '',
        type: vm.lectureTypeMenu[0].value,
        imageUrl: null
    };

    document.getElementById('photo').addEventListener('change', function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.addEventListener('load', function () {
            $scope.$apply(function () {
                vm.lectureInfo.imageUrl = reader.result;
            });
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    });
    
    vm.postLecture = function () {
        $scope.$emit('REQUEST_AJAX');

        apiService.postLecture(
            escape(vm.lectureInfo.title),
            escape(vm.lectureInfo.description),
            vm.lectureInfo.type,
            vm.lectureInfo.imageUrl
        ).then(
            function () {
                $scope.$emit('RESPONSE_AJAX');
                window.history.back();
            },

            function (err) {
                $scope.$emit('RESPONSE_AJAX');
                $scope.$emit('ERROR', {
                    error: err
                });
            }
        );
    };
}

AddLectureCtrl.$inject = ['$scope', 'apiService'];

module.exports = {
    name: 'AddLectureCtrl',
    fn: AddLectureCtrl
};
