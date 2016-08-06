function config($stateProvider,
                $locationProvider,
                $httpProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: './views/main.activity.html',
            abstract: true,
            redirectTo: '/home'
        })
        .state('main.home', {
            url: 'home',
            views: {
                container: {
                    templateUrl: './views/home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'home'
                }
            },
            resolve: {
                token: ['accessTokenFactory', function (accessTokenFactory) {
                    return accessTokenFactory.getTokenFromHash();
                }]
            }
        })
        .state('main.study', {
            url: 'study',
            views: {
                container: {
                    templateUrl: './views/study.html',
                    controller: 'StudyCtrl',
                    controllerAs: 'study'
                }
            }
        })
        .state('main.my', {
            url: 'my',
            views: {
                container: {
                    templateUrl: './views/my.html',
                    controller: 'MyCtrl',
                    controllerAs: 'my'
                }
            }
        })
        .state('detail', {
            url: '/detail',
            templateUrl: './views/detail.activity.html',
            abstract: true
        })
        .state('detail.studySelect', {
            url: '/studySelect',
            data: {
                title: '스터디 설정'
            },
            views: {
                container: {
                    templateUrl: './views/study_select.html',
                    controller: 'StudySelectCtrl',
                    controllerAs: 'study_select'
                }
            }
        })
        .state('detail.lecture', {
            url: '/lecture/:lectureId',
            data: {
                title: null
            },
            views: {
                container: {
                    templateUrl: './views/lecture_info.html',
                    controller: 'LectureDetailCtrl',
                    controllerAs: 'lecture_detail'
                }
            }
        })
        .state('detail.addComment', {
            url: '/lecture/:lectureId/addComment',
            data: {
                title: '리뷰 작성하기'
            },
            views: {
                container: {
                    templateUrl: './views/add_comment.html',
                    controller: 'AddCommentCtrl',
                    controllerAs: 'add_comment'
                }
            }
        })
        .state('detail.addLecture', {
            url: '/addLecture',
            data: {
                title: '강의 추가하기'
            },
            views: {
                container: {
                    templateUrl: './views/add_lecture.html',
                    controller: 'AddLectureCtrl',
                    controllerAs: 'add_lecture'
                }
            }
        })
        .state('error', {
            url: '/error',
            templateUrl: './views/error.html'
        });

    $httpProvider.useLegacyPromiseExtensions(true);
}

config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$httpProvider'
];

module.exports = config;
