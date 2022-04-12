/*
Setup script for get guid database
*/

CREATE DATABASE IF NOT EXISTS getguid;

USE getguid;

DROP TABLE IF EXISTS guids;

CREATE TABLE IF NOT EXISTS guids(
    unique_id VARCHAR(32) NOT NULL UNIQUE PRIMARY KEY
);

CREATE INDEX idx_uid ON guids(unique_id);

INSERT INTO guids (unique_id) VALUES ('00000000000000000000000000000000');
INSERT INTO guids (unique_id) VALUES ('11111111111111111111111111111111');
INSERT INTO guids (unique_id) VALUES ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');