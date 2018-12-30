import * as commander from 'commander';
import { DevTask } from '../tasks/dev';

commander
  .command('dev')
  .alias('d')
  .description('serve application for development')
  .option('-p, --port', 'webserver port')
  .action(DevTask);
