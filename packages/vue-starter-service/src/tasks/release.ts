import { runProcess } from '../utils/process';
import { Config } from '../models/Config';
import { drawMessageWithFrame, logErrorBold, logInfo, log } from '../utils/ui';

export const ReleaseTask = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);
  args = Config.clean.concat(args);

  let npmVersion = 'major';

  if (command.minor) {
    npmVersion = 'minor';
  } else if (command.patch) {
    npmVersion = 'patch';
  }

  try {
    logInfo('Generating CHANGELOG.md...');

    await runProcess('changelog', args, { silent: true });
  } catch (e) {
    logErrorBold(e);
  }

  try {
    logInfo('Adding CHANGELOG.md...');

    await runProcess('git', ['add', 'CHANGELOG.md'], { silent: true });
  } catch (e) {
    logErrorBold(e);
  }

  try {
    logInfo('Committing changes...');

    await runProcess('git', ['commit', '-m', 'chore: update changelog'], { silent: true });
  } catch (e) {
    logErrorBold(e);
  }

  try {
    logInfo(`Releasing npm ${npmVersion} version...`);

    await runProcess('npm', ['version', npmVersion], { silent: true });
  } catch (e) {
    logErrorBold(e);
  }

  try {
    logInfo('Pushing changes...');

    await runProcess('git', ['push', 'origin'], { silent: true });
  } catch (e) {
    logErrorBold(e);
  }

  try {
    logInfo('Pushing tags...');

    await runProcess('git', ['push', 'origin', '--tags'], { silent: true });
  } catch (e) {
    logErrorBold(e);
  }

  log('');

  drawMessageWithFrame('New version released.', 'success', true);
};
