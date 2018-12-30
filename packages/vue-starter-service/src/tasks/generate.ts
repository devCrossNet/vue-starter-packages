import { runProcess } from '../utils/process';
import { packageRoot } from '../utils/path';
import { log, logErrorBold } from '../utils/ui';
import { PrettierTask } from './prettier';
import { Config } from '../models/Config';

export const GenerateTask = async (command: any) => {
  try {
    await runProcess('plop', ['--plopfile', packageRoot('dist/generators/index.js')]);

    command.pattern = `${Config.generators.outputDirectory}/**/*`;

    log('');

    await PrettierTask(command);
  } catch (e) {
    logErrorBold(e);
  }
};
