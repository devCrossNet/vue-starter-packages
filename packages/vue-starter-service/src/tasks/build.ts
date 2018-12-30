import { packageRoot } from '../utils/path';
import { runProcess } from '../utils/process';
import { logErrorBold, log, drawMessageWithFrame } from '../utils/ui';
import { CleanTask } from './clean';

const build = async (command: any) => {
  const promises = [];
  const startTime: number = Date.now();

  try {
    await CleanTask(command);

    drawMessageWithFrame('Start building production bundles...');

    log('');

    promises.push(
      runProcess('webpack', ['--mode', 'production', '--config', packageRoot('dist/webpack/config/client.js')], {
        silent: command.silent,
      })
        .then(() => log('Client bundle successfully build.'))
        .catch((e) => logErrorBold(e)),
    );

    promises.push(
      runProcess('webpack', ['--mode', 'production', '--config', packageRoot('dist/webpack/config/server.js')], {
        silent: command.silent,
      })
        .then(() => log('Server bundle successfully build.'))
        .catch((e) => logErrorBold(e)),
    );

    promises.push(
      runProcess('webpack', ['--mode', 'production', '--config', packageRoot('dist/webpack/config/isomorphic.js')], {
        silent: command.silent,
      })
        .then(() => log('Isomorphic bundle successfully build.'))
        .catch((e) => logErrorBold(e)),
    );

    Promise.all(promises).then(() => {
      const message = `Production build finished in ${Date.now() - startTime}ms`;

      log('');

      drawMessageWithFrame(message, 'success', true);
    });
  } catch (e) {
    logErrorBold(e);
  }
};

const analyze = async (command: any) => {
  process.env.ANALYZE = 'true';

  const startTime: number = Date.now();

  try {
    await CleanTask(command);

    drawMessageWithFrame('Start analyzing client bundle...');

    log('');

    runProcess('webpack', ['--mode', 'production', '--config', packageRoot('dist/webpack/config/client.js')], {
      silent: command.silent,
    })
      .then(() => {
        log('Client bundle successfully build.');

        const message = `Analysis finished in ${Date.now() - startTime}ms`;

        log('');

        drawMessageWithFrame(message, 'success', true);
      })
      .catch((e) => logErrorBold(e));
  } catch (e) {
    logErrorBold(e);
  }
};

const spa = async (command: any) => {
  const startTime: number = Date.now();

  try {
    await CleanTask(command);

    drawMessageWithFrame('Start building client bundle only...');

    log('');

    runProcess('webpack', ['--mode', 'production', '--config', packageRoot('dist/webpack/config/spa.js')], {
      silent: command.silent,
    })
      .then(() => {
        log('Client bundle successfully build.');

        const message = `Production build finished in ${Date.now() - startTime}ms`;

        log('');

        drawMessageWithFrame(message, 'success', true);
      })
      .catch((e) => logErrorBold(e));
  } catch (e) {
    logErrorBold(e);
  }
};

export const BuildTask = async (command: any) => {
  process.env.NODE_ENV = 'production';

  if (command.analyze) {
    analyze(command);
  } else if (command.spa) {
    spa(command);
  } else {
    build(command);
  }
};
