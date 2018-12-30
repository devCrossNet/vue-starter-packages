import * as commander from 'commander';
import { ExtractMessagesTask } from '../tasks/extract-messages';

commander
  .command('extract-i18n-messages')
  .alias('em')
  .description('extract i18n messages')
  .action(ExtractMessagesTask);
