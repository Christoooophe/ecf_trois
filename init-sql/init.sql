CREATE DATABASE IF NOT EXISTS authentication_db;
CREATE DATABASE IF NOT EXISTS common_data_db;

GRANT ALL PRIVILEGES ON *.* TO 'mysqluser'@'%';
FLUSH PRIVILEGES;