const host = 'rs0/n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017';
const db = 'bcixzvgzykwpugl';
const user = 'ux6iq4lfbxcymdlvy9c2';
const port = '27017';
const password = 'WU0qua8hqX0CpYgUrbFZ';

module.exports = {
    database:[`mongodb://${host}:${db}@${user}:${port}/${password}`]
};