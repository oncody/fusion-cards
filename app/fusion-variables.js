'use strict';

module.exports.auth = 'auth';
module.exports.cards = 'cards';
module.exports.users = 'users';
module.exports.api = 'api';
module.exports.authApiRoute = getApiRoute(module.exports.auth);
module.exports.usersApiRoute = getApiRoute(module.exports.users);

function getApiRoute(route){
    return `/${module.exports.api}/${route}`;
}