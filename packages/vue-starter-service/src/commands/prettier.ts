import * as commander from 'commander';
import { PrettierTask } from '../tasks/prettier';

commander
  .command('prettier')
  .alias('p')
  .option('-p, --pattern', 'match file pattern')
  .option('-s, --staged', 'only prettify staged files')
  .description('format project')
  .allowUnknownOption()
  .action(PrettierTask);
