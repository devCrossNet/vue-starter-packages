import { SpawnOptions } from 'child_process';
import { logError, Spinner } from './ui';

interface IProcessError {
  code: number;
  trace: string;
}

const spawn = require('cross-spawn');
const kill = require('tree-kill');
const processes = [];

export const runProcess = (
  name: string,
  args: string[] = [],
  options: { cwd?: string; silent?: boolean } = {},
): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    const silent = options.silent === undefined ? false : options.silent;

    const localOptions: SpawnOptions = {
      detached: true,
      cwd: options.cwd ? options.cwd : process.cwd(),
      env: process.env,
    };

    if (!silent) {
      localOptions.stdio = 'inherit';
    }

    const childProcess: any = spawn(name, args, localOptions);
    let trace = '';

    if (silent) {
      childProcess.stdout.on('data', (data: any) => {
        trace += data;
      });
      childProcess.stderr.on('data', (data: any) => {
        trace += data;
      });
    }

    childProcess.on('exit', (code: number) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        const err: IProcessError = { code, trace };
        reject(err);
      }
    });

    childProcess.on('error', () => {
      const err: IProcessError = { code: 1, trace };
      reject(err);
    });

    processes.push(childProcess);

    process.on('SIGINT', (signal: string) => handleProcessError({ code: 2, trace: signal }));
    process.on('uncaughtException', (e) => handleProcessError({ code: 1, trace: e.message }));
  });
};

export const handleProcessError = (err: IProcessError, spinner: Spinner = null) => {
  if (spinner) {
    spinner.stop(true);
  }

  logError(`Exit with error code: ${err.code}\n\nTrace:\n${err.trace}`);

  kill(1, 'SIGKILL');

  process.exit(err.code);
};
