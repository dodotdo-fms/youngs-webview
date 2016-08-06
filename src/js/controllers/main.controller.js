var range = require('lodash/range');

function MainCtrl($scope, $state, ngDialog, studyFilterService, Constants) {
    $scope.currentRequesting = false;

    $scope.routeState = $state;

    $scope.constants = Constants;

    $scope.goBack = function () {
        history.back();
    };

    $scope.$on('REQUEST_AJAX', function () {
        $scope.currentRequesting = true;
    });

    $scope.$on('RESPONSE_AJAX', function () {
        $scope.currentRequesting = false;
    });

    $scope.studyTypeMenu = Constants.typeMenu;

    $scope.studyFilterService = studyFilterService;

    $scope.$on('ERROR', function () {
        ngDialog.open({
            templateUrl: './views/dialog.html',
            showClose: false
        });
    });

    $scope.$on('NO_INPUT', function () {
        ngDialog.open({
            templateUrl: './views/no_input_dialog.html',
            showClose: false
        });
    });

    $scope.onSelectLecture = function (lectureId) {
        $state.go('detail.lecture', {
            lectureId: lectureId
        });
    };

    $scope.makeRange = function (number) {
        return range(Math.round(number));
    };

    $scope.canBeJoin = function (lecture) {
        return lecture.status === 'STANDBY';
    };

    $scope.getLectureOverlayMessage = function (lecture) {
        var msg = {
            title: '',
            message: ''
        };
        var status = lecture.status;

        switch (status) {
            case 'READY':
                msg.title = '강의 시작 전 입니다.';
                msg.message = '지금 강사와 1:1 학습에 참여해 보세요!';
                break;
            case 'ONAIR':
                msg.title = '이미 강의가 시작 중 입니다.';
                msg.message = '아쉽지만 다음 강의를 기대해주세요!';
                break;
            case 'FINISHED':
                msg.title = '강의가 이미 종료되었습니다.';
                msg.message = '좋은 강의였는지 리뷰를 남겨주세요!';
                break;
            default:
                break;
        }

        return msg;
    };

    $scope.isLive = function (lecture) {
        return lecture.status === 'STANDBY';
    };
}

MainCtrl.$inject = ['$scope', '$state', 'ngDialog', 'studyFilterService', 'Constants'];

module.exports = {
    name: 'MainCtrl',
    fn: MainCtrl
};
