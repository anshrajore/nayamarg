-- 001_initial_schemas.sql
-- NayaMarg 2.0 Database Architecture
-- Creates logical schemas and foundational extensions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 4 Logical Business Schemas
CREATE SCHEMA IF NOT EXISTS recruitment;
CREATE SCHEMA IF NOT EXISTS communications;
CREATE SCHEMA IF NOT EXISTS operations;

-- Grant usage on schemas to authenticated backend roles
GRANT USAGE ON SCHEMA recruitment TO authenticated, service_role;
GRANT USAGE ON SCHEMA communications TO authenticated, service_role;
GRANT USAGE ON SCHEMA operations TO authenticated, service_role;
