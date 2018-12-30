import { runProcess } from '../utils/process';
import { Config } from '../models/Config';
import { logBold, logErrorBold } from '../utils/ui';
import { CleanTask } from './clean';

const prettier = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);

  args = [
    '--config',
    '.prettierrc',
    '--ignore-path',
    '.prettierignore',
    '--write',
    command.pattern ? command.pattern : `./**/*.{${Config.prettier.extensions}}`,
  ].concat(args);

  try {
    await CleanTask(command);

    logBold('run prettier...');

    await runProcess('prettier', args);
  } catch (e) {
    logErrorBold(e);
  }
};

const prettyQuick = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);

  args = ['--staged'].concat(args);

  try {
    await CleanTask(command);

    await runProcess('pretty-quick', args);
  } catch (e) {
    logErrorBold(e);
  }
};

export const PrettierTask = async (command: any) => {
  if (command.staged) {
    prettyQuick(command);
  } else {
    prettier(command);
  }
};
