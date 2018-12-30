import chalk from 'chalk';
import * as _ from 'lodash';

export const log = (message) => console.log(chalk.white(message));
export const logInfo = (message) => console.log(chalk.blue(message));
export const logError = (message) => console.log(chalk.red(message));
export const logSuccess = (message) => console.log(chalk.green(message));
export const logWarning = (message) => console.log(chalk.yellow(message));

export const logBold = (message) => console.log(chalk.white.bold(message));
export const logInfoBold = (message) => console.log(chalk.blue.bold(message));
export const logErrorBold = (message) => console.log(chalk.red.bold(message));
export const logSuccessBold = (message) => console.log(chalk.green.bold(message));
export const logWarningBold = (message) => console.log(chalk.yellow.bold(message));

const formats = {
  log,
  logInfo,
  logError,
  logSuccess,
  logWarning,
  logBold,
  logInfoBold,
  logErrorBold,
  logSuccessBold,
  logWarningBold,
};

export const drawMessageWithFrame = (message: string, type: string = 'info', frameOnTop: boolean = false) => {
  const line = new Array(message.length + 1).join('=');
  type = _.upperFirst(type);

  if (frameOnTop) {
    formats[`log${type}`](line);
  }

  formats[`log${type}Bold`](message);
  formats[`log${type}`](line);
};
