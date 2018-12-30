import { runProcess } from '../utils/process';
import { logErrorBold } from '../utils/ui';

export const LintTask = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);

  args = args.concat(['--fix', '-c', 'tslint.json', '-p', 'tsconfig.json']);

  try {
    await runProcess('tslint', args);
  } catch (e) {
    logErrorBold(e);
  }
};
