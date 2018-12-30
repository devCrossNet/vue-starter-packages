import * as commander from 'commander';
import { ReleaseTask } from '../tasks/release';

commander
  .command('release')
  .alias('r')
  .description('generate changelog, release new npm version add new git tag')
  .option('-M, --major', 'release new major version')
  .option('-m, --minor', 'release new minor version')
  .option('-p, --patch', 'release new patch version')
  .action(ReleaseTask);
