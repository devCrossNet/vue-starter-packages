import { runProcess } from '../utils/process';
import { logErrorBold } from '../utils/ui';
import { packageRoot, runtimeRoot } from '../utils/path';

export const StorybookTask = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);
  const dev = Boolean(command.dev);
  let binary = 'build-storybook';

  if (dev) {
    binary = 'start-storybook';

    args.pop();
    args = args.concat(['-p', '6006']);
  } else {
    args = args.concat(['--output-dir', runtimeRoot('storybook-static')]);
  }

  args = args.concat(['--config-dir', runtimeRoot('.vue-starter/storybook')]);

  try {
    await runProcess(binary, args);
  } catch (e) {
    logErrorBold(e);
  }
};
