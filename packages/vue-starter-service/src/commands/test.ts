import * as commander from 'commander';
import { TestTask } from '../tasks/test';

commander
  .command('test')
  .alias('t')
  .option('-s, --silent')
  .option('-c, --coverage')
  .description('run unit-tests')
  .allowUnknownOption()
  .action(TestTask);
