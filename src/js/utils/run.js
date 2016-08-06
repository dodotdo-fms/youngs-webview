function run($rootScope,
             $state) {
    $rootScope.$on('$stateChangeError', function (event,
                                                  toState,
                                                  toParams,
                                                  fromState,
                                                  fromParams,
                                                  error) {
        switch (error) {
            case 'NO_TOKEN':
                $state.go('error');
                break;
            default:
                $state.go('error');
                break;
        }
    });

    $rootScope.$on('$stateNotFound', function () {
        $state.go('error');
    });
}

run.$inject = [
    '$rootScope',
    '$state'
];

module.exports = run;
