/*
Setup script for get guid database
*/

CREATE DATABASE IF NOT EXISTS getguid;

USE getguid;

DROP TABLE IF EXISTS guids;

CREATE TABLE IF NOT EXISTS guids(
    unique_id VARCHAR(35) NOT NULL UNIQUE PRIMARY KEY
);

CREATE INDEX idx_uid ON guids(unique_id);

INSERT INTO guids (unique_id) VALUES ('00000000-0000-0000-0000-00000000000');
INSERT INTO guids (unique_id) VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa');
INSERT INTO guids (unique_id) VALUES ('bf6697d6-44fe-4501-5cc1-17f2563e88c');