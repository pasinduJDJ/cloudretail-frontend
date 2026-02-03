export const cognitoConfig = {
    domain: 'https://ap-southeast-1dzm5l40g8.auth.ap-southeast-1.amazoncognito.com',

    clientId: '38pq8jaml1bauor97tfsehl84a',

    redirectUri: 'http://localhost:4200/auth/callback',

    logoutUri: 'http://localhost:4200/',

    scopes: ['openid', 'email', 'profile'],
};
