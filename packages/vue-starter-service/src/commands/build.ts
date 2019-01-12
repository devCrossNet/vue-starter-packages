import { Command, CommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { HeadLine, log, logErrorBold, Result } from '../utils/ui';
import { packageRoot } from '../utils/path';
import * as _ from 'lodash';

@Command({
  name: 'build',
  alias: 'b',
  description: 'Build project for production.',
  options: [
    { flags: '-a, --analyze', description: 'Analyze client bundle.' },
    { flags: '-spa, --spa', description: 'Build only client-side application.' },
  ],
})
export class Build implements CommandHandler {
  public analyze: boolean;
  public spa: boolean;

  public async run(args: string[], silent: boolean) {
    process.env.NODE_ENV = 'production';

    await runProcess('rimraf', ['./dist']);

    if (this.analyze) {
      analyze(silent).catch((e) => logErrorBold(e));
    } else if (this.spa) {
      spa(silent).catch((e) => logErrorBold(e));
    } else {
      build(silent).catch((e) => logErrorBold(e));
    }
  }
}

const runWebpack = (configName: string, silent: boolean) => {
  return runProcess(
    'webpack',
    ['--mode', 'production', '--config', packageRoot(`dist/webpack/config/${configName}.js`)],
    { silent },
  );
};

const build = async (silent: boolean) => {
  const promises = [];
  const startTime: number = Date.now();

  HeadLine('Start building production bundles...');

  log('');

  const run = (configName: string) => {
    promises.push(
      runWebpack(configName, silent).then(() => log(`${_.upperFirst(configName)} bundle successfully build.`)),
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

const analyze = async (silent: boolean) => {
  process.env.ANALYZE = 'true';

  const startTime: number = Date.now();

  HeadLine('Start analyzing client bundle...');

  log('');

  await runWebpack('client', silent);

  log('Client bundle successfully build.');

  const message = `Analysis finished in ${Date.now() - startTime}ms`;

  log('');

  Result(message);
};

const spa = async (silent: boolean) => {
  const startTime: number = Date.now();

  HeadLine('Start building client bundle only...');

  log('');

  await runWebpack('spa', silent);

  log('Client bundle successfully build.');

  const message = `Production build finished in ${Date.now() - startTime}ms`;

  log('');

  Result(message);
};
