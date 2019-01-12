import { Command, CommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { logErrorBold } from '../utils/ui';

@Command({
  name: 'lint',
  alias: 'l',
  description: 'Lint project files.',
})
export class Lint implements CommandHandler {
  public async run(args: string[], silent: boolean) {
    args = args.concat(['--fix', '-c', 'tslint.json', '-p', 'tsconfig.json']);

    try {
      await runProcess('tslint', args, { silent });
    } catch (e) {
      logErrorBold(e);
    }
  }
}
