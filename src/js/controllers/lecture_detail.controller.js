
function LectureDetailCtrl($scope, $state, tokenFactory, apiService) {
    var lectureId = $state.params.lectureId;
    var vm = this;

    vm.lecture = {};
    vm.joinBtnStrMap = {
        mineReady: {
            name: '강의 시작하기',
            isMine: true,
            disabled: false
        },
        notMineReady: {
            name: '아직 강의가 시작하지 않았습니다.',
            isMine: false,
            disabled: true
        },
        standby: {
            name: '강의 참여하기',
            disabled: false
        },
        onair: {
            name: '이미 강의가 시작 중입니다.',
            disabled: true
        },
        finished: {
            name: '강의가 끝났습니다.',
            disabled: true
        }
    };
    vm.joinBtnStr = vm.joinBtnStrMap.notMineReady;

    vm.isMyLecture = false;
    vm.startLecture = function () {
        window.android.setMessage(lectureId);
    };


    init();

    function init() {
        $scope.$emit('REQUEST_AJAX');

        apiService.getLecture(lectureId, 'review').then(
            function (res) {
                $scope.$emit('RESPONSE_AJAX');
                $state.current.data.title = res.title;

                vm.lecture = res;

                if (vm.lecture.member.id === parseInt(tokenFactory.getMemberId(), 10)) {
                    vm.isMyLecture = true;
                }

                makeJoinBtnStr();
            },

            function (err) {
                $scope.$emit('RESPONSE_AJAX');
                $scope.$emit('ERROR', {
                    error: err
                });
            }
        );
    }

    function makeJoinBtnStr() {
        switch (vm.lecture.status) {
            case 'READY':
                vm.joinBtnStr = vm.isMyLecture ?
                    vm.joinBtnStrMap.mineReady : vm.joinBtnStrMap.notMineReady;
                break;
            case 'STANDBY':
                vm.joinBtnStr = vm.joinBtnStrMap.standby;
                break;
            case 'ONAIR':
                vm.joinBtnStr = vm.joinBtnStrMap.onair;
                break;
            case 'finished':
                vm.joinBtnStr = vm.joinBtnStrMap.finished;
                break;
            default:
                throw new Error();
        }
    }
}

LectureDetailCtrl.$inject = ['$scope', '$state', 'tokenFactory', 'apiService'];

module.exports = {
    name: 'LectureDetailCtrl',
    fn: LectureDetailCtrl
};
