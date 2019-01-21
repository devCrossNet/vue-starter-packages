import { Command, ICommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { logErrorBold, Spinner } from '../utils/ui';
import { Config } from '../models/Config';

@Command({
  name: 'clean',
  alias: 'c',
  description: 'Clean up the project directory.',
})
export class Clean implements ICommandHandler {
  public async run(args: string[], silent: boolean) {
    args = Config.clean.concat(args);
    const spinner = new Spinner();

    spinner.message = 'Cleaning directories...';

    try {
      await runProcess('rimraf', args, { silent });
    } catch (e) {
      spinner.stop();
      logErrorBold(e);
    }

    spinner.message = 'Directories cleaned';
    spinner.stop();
  }
}
