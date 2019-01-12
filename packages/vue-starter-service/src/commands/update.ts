import { Command, CommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { packageRoot } from '../utils/path';
import { logErrorBold } from '../utils/ui';

@Command({
  name: 'update',
  alias: 'u',
  description: 'Update your local copy of the vue-starter.',
})
export class Update implements CommandHandler {
  public async run(args: string[], silent: boolean) {
    try {
      await runProcess('node', [packageRoot('dist/scripts/update.js')], { silent });

      await runProcess('vue-starter-service', ['prettier', '--pattern', '.vue-starter/*.json'], {
        silent,
      });
    } catch (e) {
      logErrorBold(e);
    }
  }
}
