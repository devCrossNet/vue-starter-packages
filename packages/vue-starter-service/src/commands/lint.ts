import * as commander from 'commander';
import { LintTask } from '../tasks/lint';

commander
  .command('lint')
  .alias('l')
  .description('lint project files')
  .allowUnknownOption()
  .action(LintTask);
