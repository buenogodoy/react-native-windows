/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 * @ts-check
 */

const {
  task,
  series,
  option,
  argv,
  tscTask,
  eslintTask,
} = require('just-scripts');
const fs = require('fs');

option('production');
option('clean');

task('eslint', () => {
  return eslintTask();
});
task('eslint:fix', () => {
  return eslintTask({ fix: true });
});
task('ts', () => {
  return tscTask({
    pretty: true,
    ...(argv().production && {
      inlineSources: true,
    }),
    target: 'es6',
    module: 'commonjs',
  });
});

task('prepareBundle', () => {
  const file = 'windows/ReactUWPTestApp/Bundle';
  if (!fs.existsSync(file)) {
    fs.mkdirSync(file);
  }
});

task('build', series('ts'));
task('lint', series('eslint'));
task('lint:fix', series('eslint:fix'));
