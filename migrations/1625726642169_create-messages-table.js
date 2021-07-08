/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      created_at timestamp with time zone DEFAULT now()
    );
  `);
};

exports.down = (pgm) => {};
