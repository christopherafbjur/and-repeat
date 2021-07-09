#!/bin/sh

echo "Waiting for Postgres database to start..."
./wait-for db:5432 

echo "Migrating the database..."
npm run migrate up

echo "Compiling build..."
npm run build

echo "Starting the server..."
npm run start