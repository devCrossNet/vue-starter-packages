import { Command, CommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { logErrorBold } from '../utils/ui';

@Command({
  name: 'e2e',
  description: 'Run e2e tests with cypress.io.',
})
export class E2E implements CommandHandler {
  public async run(args: string[], silent: boolean) {
    args = args.concat(['run', '--browser', 'chrome']);

    try {
      await runProcess('cypress', args, { silent });
    } catch (e) {
      logErrorBold(e);
    }
  }
}
