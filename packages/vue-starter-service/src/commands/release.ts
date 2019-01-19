import { Command, ICommandHandler } from '../lib/command';
import { runProcess } from '../utils/process';
import { log, logErrorBold, logInfo, Result } from '../utils/ui';

@Command({
  name: 'release',
  alias: 'r',
  description: 'Generate changelog, release new npm version add new git tag.',
  options: [
    { flags: '-M, --major', description: 'Release new major version' },
    { flags: '-m, --minor', description: 'Release new minor version' },
    { flags: '-p, --patch', description: 'Release new patch version' },
  ],
})
export class Release implements ICommandHandler {
  public major: boolean;
  public minor: boolean;
  public patch: boolean;

  public async run(args: string[], silent: boolean) {
    let npmVersion = 'major';

    if (this.minor) {
      npmVersion = 'minor';
    } else if (this.patch) {
      npmVersion = 'patch';
    }

    Result(`Releasing new ${npmVersion} version...`);

    try {
      logInfo('Generating CHANGELOG.md...');

      await runProcess('changelog', args.filter((arg: string) => arg !== '--silent'), { silent });
    } catch (e) {
      logErrorBold(e);
    }

    try {
      logInfo('Adding CHANGELOG.md...');

      await runProcess('git', ['add', 'CHANGELOG.md'], { silent });
    } catch (e) {
      logErrorBold(e);
    }

    try {
      logInfo('Committing changes...');

      await runProcess('git', ['commit', '-m', 'chore: update changelog'], { silent });
    } catch (e) {
      logErrorBold(e);
    }

    try {
      logInfo(`Releasing npm ${npmVersion} version...`);

      await runProcess('npm', ['version', npmVersion], { silent });
    } catch (e) {
      logErrorBold(e);
    }

    try {
      logInfo('Pushing changes...');

      await runProcess('git', ['push', 'origin'], { silent });
    } catch (e) {
      logErrorBold(e);
    }

    try {
      logInfo('Pushing tags...');

      await runProcess('git', ['push', 'origin', '--tags'], { silent });
    } catch (e) {
      logErrorBold(e);
    }

    log('');

    Result('New version released.');
  }
}
