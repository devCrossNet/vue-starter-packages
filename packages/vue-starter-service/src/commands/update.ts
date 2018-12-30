import * as commander from 'commander';
import { UpdateTask } from '../tasks/update';

commander
  .command('update')
  .alias('u')
  .description('update your local copy of the vue-starter')
  .action(UpdateTask);
