import { packageRoot } from '../utils/path';
import { runProcess } from '../utils/process';
import { logErrorBold, log, HeadLine } from '../utils/ui';
import { CleanTask } from './clean';

export const DevTask = async (command: any) => {
  process.env.NODE_ENV = 'development';

  try {
    await CleanTask(command);

    HeadLine('Start development mode...');

    await runProcess(
      'webpack',
      ['--mode', 'development', '--config', packageRoot('dist/webpack/config/dev-server.js')],
      { silent: command.silent },
    );

    await runProcess('webpack', ['--mode', 'development', '--config', packageRoot('dist/webpack/config/server.js')], {
      silent: command.silent,
    });
  } catch (e) {
    logErrorBold(e);
  }
};
