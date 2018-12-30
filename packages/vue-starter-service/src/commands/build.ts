import * as commander from 'commander';
import { BuildTask } from '../tasks/build';

commander
  .command('build')
  .alias('b')
  .description('build project for production')
  .option('-s, --silent', 'disable webpack output')
  .option('-a, --analyze', 'analyze client bundle')
  .option('-spa, --spa', 'build only client-side application')
  .action(BuildTask);
