import { runProcess } from '../utils/process';
import { Config } from '../models/Config';
import { logErrorBold } from '../utils/ui';

export const CleanTask = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);

  args = Config.clean.concat(args);

  try {
    await runProcess('rimraf', args);
  } catch (e) {
    logErrorBold(e);
  }
};
