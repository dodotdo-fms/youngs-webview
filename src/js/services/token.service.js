function tokenFactory($cookies) {
    var token = null;
    var memberId = null;

    return {
        setToken: function (newToken) {
            token = newToken;
            $cookies.put('token', token);
        },

        setMemberId: function (newMemberId) {
            memberId = newMemberId;
            $cookies.put('member_id', memberId);
        },

        getToken: function () {
            if (token === null && this.isTokenExists()) {
                this.setToken($cookies.get('token'));
            }
            return token;
        },

        getMemberId: function () {
            if (memberId === null && this.isMemberIdExists()) {
                this.setMemberId($cookies.get('member_id'));
            }
            return memberId;
        },

        isTokenExists: function () {
            return $cookies.get('token') !== undefined;
        },

        isMemberIdExists: function () {
            return $cookies.get('member_id') !== undefined;
        }
    };
}

tokenFactory.$inject = ['$cookies'];

module.exports = {
    name: 'tokenFactory',
    fn: tokenFactory
};
