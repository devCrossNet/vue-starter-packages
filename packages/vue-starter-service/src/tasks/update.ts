import { runProcess } from '../utils/process';
import { packageRoot } from '../utils/path';
import { logErrorBold } from '../utils/ui';
import { PrettierTask } from './prettier';

export const UpdateTask = async (command: any) => {
  try {
    await runProcess('node', [packageRoot('dist/scripts/update.js')]);

    command.pattern = './.vue-starter/*.json';

    await PrettierTask(command);
  } catch (e) {
    logErrorBold(e);
  }
};
