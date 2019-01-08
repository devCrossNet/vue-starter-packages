import { packageRoot } from '../utils/path';
import { runProcess } from '../utils/process';
import { logErrorBold, log, HeadLine, Result } from '../utils/ui';
import { CleanTask } from './clean';
import * as _ from 'lodash';

const runWebpack = (configName: string, silent: boolean) => {
  return runProcess(
    'webpack',
    ['--mode', 'production', '--config', packageRoot(`dist/webpack/config/${configName}.js`)],
    { silent },
  );
};

const build = async (command: any) => {
  const promises = [];
  const startTime: number = Date.now();

  await CleanTask(command);

  HeadLine('Start building production bundles...');

  log('');

  const run = (configName: string) => {
    promises.push(
      runWebpack(configName, command.silent).then(() => log(`${_.upperFirst(configName)} bundle successfully build.`)),
    );
  };

  run('client');
  run('server');
  run('isomorphic');

  Promise.all(promises).then(() => {
    const message = `Production build finished in ${Date.now() - startTime}ms`;

    log('');

    Result(message);
  });
};

const analyze = async (command: any) => {
  process.env.ANALYZE = 'true';

  const startTime: number = Date.now();

  await CleanTask(command);

  HeadLine('Start analyzing client bundle...');

  log('');

  await runWebpack('client', command.silent);

  log('Client bundle successfully build.');

  const message = `Analysis finished in ${Date.now() - startTime}ms`;

  log('');

  Result(message);
};

const spa = async (command: any) => {
  const startTime: number = Date.now();

  await CleanTask(command);

  HeadLine('Start building client bundle only...');

  log('');

  await runWebpack('spa', command.silent);

  log('Client bundle successfully build.');

  const message = `Production build finished in ${Date.now() - startTime}ms`;

  log('');

  Result(message);
};

export const BuildTask = async (command: any) => {
  process.env.NODE_ENV = 'production';

  if (command.analyze) {
    analyze(command).catch((e) => logErrorBold(e));
  } else if (command.spa) {
    spa(command).catch((e) => logErrorBold(e));
  } else {
    build(command).catch((e) => logErrorBold(e));
  }
};
