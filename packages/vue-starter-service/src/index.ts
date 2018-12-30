import * as commander from 'commander';
import { Package } from './models/Package';
import './commands/generate';
import './commands/extract-messages';
import './commands/test';
import './commands/lint';
import './commands/e2e';
import './commands/clean';
import './commands/storybook';
import './commands/update';
import './commands/prettier';
import './commands/release';
import './commands/build';
import './commands/dev';

commander
  .name('vue-starter-service')
  .version(Package.version, '-v, --version')
  .description(Package.description);

commander.parse(process.argv);
