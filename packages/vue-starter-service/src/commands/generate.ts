import * as commander from 'commander';
import { GenerateTask } from '../tasks/generate';

commander
  .command('generate')
  .alias('g')
  .description('generate components, connected components or modules')
  .action(GenerateTask);
