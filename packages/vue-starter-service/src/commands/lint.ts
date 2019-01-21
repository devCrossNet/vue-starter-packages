import { Command, ICommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { logErrorBold, Spinner } from '../utils/ui';

@Command({
  name: 'lint',
  alias: 'l',
  description: 'Lint project files.',
})
export class Lint implements ICommandHandler {
  public async run(args: string[], silent: boolean) {
    args = args.concat(['--fix', '-c', 'tslint.json', '-p', 'tsconfig.json']);
    const spinner = new Spinner();

    if (!silent) {
      spinner.message = 'Linting files...';
      spinner.start();
    }

    try {
      await runProcess('tslint', args.filter((arg: string) => arg !== '--silent'), { silent });
    } catch (e) {
      if (!silent) {
        spinner.stop();
      }
      logErrorBold(e);
    }
    if (!silent) {
      spinner.message = 'All files passed linting';
      spinner.stop();
    }
  }
}
