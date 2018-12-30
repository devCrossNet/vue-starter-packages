import { runProcess } from '../utils/process';
import { logErrorBold } from '../utils/ui';

export const E2ETask = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);

  args = args.concat(['run', '--browser', 'chrome']);

  try {
    await runProcess('cypress', args);
  } catch (e) {
    logErrorBold(e);
  }
};
