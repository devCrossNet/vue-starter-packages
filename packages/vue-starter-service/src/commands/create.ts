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
  options: [{ flags: '-n, --next', description: 'Download latest version.' }],
})
export class Create implements ICommandHandler {
  public name: string;
  public next: string;

  public async run(args: string[], silent: boolean) {
    const destination = runtimeRoot(this.name);
    const branch = this.next ? 'github:devCrossNet/vue-starter#next' : 'github:devCrossNet/vue-starter';

    HeadLine(`Creating project: ${this.name}...`);

    logInfo('Downloading project...');

    download(branch, destination, async (e: any) => {
      if (e) {
        logErrorBold(e);
      }

      logInfo('Installing dependencies...');

      try {
        await runProcess('npm', ['install'], { cwd: destination, silent: true });
      } catch (err) {
        logErrorBold(err);
      }

      Result(`Project ${this.name} successfully created.`);
    });
  }
}
