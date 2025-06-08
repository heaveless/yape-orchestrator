const secrets = () => ({
    antifraud: {
        KAFKA_BROKERS: [
            process.env.KAFKA_BROKERS_0
        ]
    },
    auth: {
        BASE_URL: process.env.AXIOS_AUTH_BASE_URL
    },
    transaction: {
        BASE_URL: process.env.AXIOS_TRANSACTION_BASE_URL
    }
});

export default secrets;