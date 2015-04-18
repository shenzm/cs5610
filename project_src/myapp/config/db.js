var db_url_prefix = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/';

module.exports = {
    url: db_url_prefix + 'myapp'
};
