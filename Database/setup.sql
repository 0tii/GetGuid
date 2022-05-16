/*
Setup script for get guid database
*/

/*Guid Table*/

CREATE DATABASE IF NOT EXISTS getguid;

USE getguid;

DROP TABLE IF EXISTS guids;

CREATE TABLE IF NOT EXISTS guids(
    unique_id VARCHAR(35) NOT NULL UNIQUE PRIMARY KEY
);

CREATE INDEX IF NOT EXISTS idx_uid ON guids(unique_id);

INSERT INTO guids (unique_id) VALUES ('00000000-0000-0000-0000-00000000000');
INSERT INTO guids (unique_id) VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa');
INSERT INTO guids (unique_id) VALUES ('bf6697d6-44fe-4501-5cc1-17f2563e88c');

/*API Key Table*/

DROP TABLE IF EXISTS api_keys;

CREATE TABLE IF NOT EXISTS api_keys(
    api_key VARCHAR(32) UNIQUE NOT NULL PRIMARY KEY,
    key_name VARCHAR(32),
    issued DATETIME DEFAULT CURRENT_TIMESTAMP,
    valid_until DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS  idx_key ON api_keys(api_key);

INSERT INTO api_keys (api_key, key_name, valid_until) VALUES ('rwXGu1ZkuWPr5Bpy8.83LD2N1zf4qi.k', 'master key', 20251230000000);