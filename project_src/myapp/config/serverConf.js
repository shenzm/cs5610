module.exports = {
    ip: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port: port = process.env.OPENSHIFT_NODEJS_PORT || 3000
};
