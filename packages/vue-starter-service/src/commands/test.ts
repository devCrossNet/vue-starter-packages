import { Command, ICommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { logErrorBold } from '../utils/ui';

@Command({
  name: 'test',
  alias: 't',
  description: 'Run unit-tests with jest. All jest CLI options are supported.',
  options: [{ flags: '-c, --coverage', description: 'Run tests with coverage.' }],
})
export class Test implements ICommandHandler {
  public coverage: boolean;

  public async run(args: string[], silent: boolean) {
    args = args.concat([...(this.coverage || this.coverage === undefined ? ['--coverage'] : [])]);

    process.env.NODE_ENV = 'test';

    try {
      await runProcess('jest', args, { silent });
    } catch (e) {
      logErrorBold(e);
    }
  }
}
