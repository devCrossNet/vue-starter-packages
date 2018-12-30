import * as commander from 'commander';
import { CleanTask } from '../tasks/clean';

commander
  .command('clean')
  .alias('c')
  .description('clean up project')
  .allowUnknownOption()
  .action(CleanTask);
