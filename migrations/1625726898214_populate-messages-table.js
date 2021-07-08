/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  INSERT INTO users (title, text) VALUES
  ('Express', 'Express is great for setting up servers.'),
  ('TypeScript', 'TypeScript is boosts the potential of Javascript.'),
  ('NodeJS', 'We went from browser to anywhere!');
  `);
};

exports.down = (pgm) => {};
