#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE $POSTGRES_DB_TEST;
	GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB_TEST TO $DATABASE_USER;
EOSQL
