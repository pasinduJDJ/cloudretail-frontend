export interface Environment {
    production: boolean;
    apiUrl?: string;
    apiBaseUrl: string;
    demoUserId: string;
}

export const environment: Environment = {
    production: false,
    apiUrl: 'https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev',
    apiBaseUrl: 'https://bizvx23zvj.execute-api.ap-southeast-1.amazonaws.com/dev',
    demoUserId: 'U1001',
};
