import { runProcess } from '../utils/process';
import { packageRoot } from '../utils/path';
import { logErrorBold } from '../utils/ui';

export const ExtractMessagesTask = async () => {
  try {
    await runProcess('node', [packageRoot('dist/scripts/extract-i18n-messages.js')]);
  } catch (e) {
    logErrorBold(e);
  }
};
