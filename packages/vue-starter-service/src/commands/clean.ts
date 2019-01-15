import { Command, ICommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { logErrorBold } from '../utils/ui';
import { Config } from '../models/Config';

@Command({
  name: 'clean',
  alias: 'c',
  description: 'Clean up the project directory.',
})
export class Clean implements ICommandHandler {
  public async run(args: string[], silent: boolean) {
    args = Config.clean.concat(args);

    try {
      await runProcess('rimraf', args, { silent });
    } catch (e) {
      logErrorBold(e);
    }
  }
}
