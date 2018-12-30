import * as commander from 'commander';
import { E2ETask } from '../tasks/e2e';

commander
  .command('e2e')
  .description('run e2e tests')
  .allowUnknownOption()
  .action(E2ETask);
