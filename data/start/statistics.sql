CREATE TABLE IF NOT EXISTS categories (value INTEGER,rate INTEGER);
CREATE TABLE IF NOT EXISTS clicks (clicksid INTEGER PRIMARY KEY,stamp INTEGER, device TEXT, type TEXT);
CREATE TABLE IF NOT EXISTS destinations (value INTEGER,rate INTEGER);
CREATE TABLE IF NOT EXISTS keywords (value INTEGER,rate INTEGER);
CREATE TABLE IF NOT EXISTS pages (value INTEGER,rate INTEGER);
CREATE TABLE IF NOT EXISTS search (value INTEGER,rate INTEGER);
