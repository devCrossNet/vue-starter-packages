import * as commander from 'commander';
import { StorybookTask } from '../tasks/storybook';

commander
  .command('storybook')
  .alias('sb')
  .option('-d, --dev', 'run storybook in dev mode')
  .description('run Storybook')
  .allowUnknownOption()
  .action(StorybookTask);
