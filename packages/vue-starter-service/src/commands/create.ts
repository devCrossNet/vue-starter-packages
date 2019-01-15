import { Command, ICommandHandler } from '../lib/command';
import { HeadLine, logErrorBold, logInfo, Result } from '../utils/ui';
import { runtimeRoot } from '../utils/path';
import { runProcess } from '../utils/process';

const download = require('download-git-repo');

@Command({
  name: 'create',
  alias: 'c',
  description: 'Create a new vue-starter project.',
  arguments: [{ name: 'name', defaultValue: 'my-app' }],
})
export class Create implements ICommandHandler {
  public name: string;

  public async run(args: string[], silent: boolean) {
    const destination = runtimeRoot(this.name);

    HeadLine(`Creating project: ${this.name}...`);

    logInfo('Downloading project...');

    download('github:devCrossNet/vue-starter', destination, async (e: any) => {
      if (e) {
        logErrorBold(e);
      }

      logInfo('Installing dependencies...');

      try {
        await runProcess('rimraf', ['.github', '.all-contributorsrc'], { cwd: destination, silent: true });
      } catch (err) {
        logErrorBold(err);
      }

      try {
        await runProcess('npm', ['install'], { cwd: destination, silent: true });
      } catch (err) {
        logErrorBold(err);
      }

      Result(`Project ${this.name} successfully created.`);
    });
  }
}
