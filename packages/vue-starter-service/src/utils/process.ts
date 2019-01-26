import { ChildProcess, SpawnOptions } from 'child_process';

const spawn = require('cross-spawn');
const processes = [];

const killProcesses = () => {
  processes.forEach((p: ChildProcess) => {
    p.kill();
  });
  process.exit(0);
};

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
    let output = '';

    if (silent) {
      childProcess.stdout.on('data', (data: any) => {
        output += data;
      });
      childProcess.stderr.on('data', (data: any) => {
        output += data;
      });
    }

    childProcess.on('exit', (code: number) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`Exit with error code: ${code}\n\nTrace: ${silent ? output : '-'}`));
      }
    });

    childProcess.on('error', (err: Error) => {
      reject(err);
    });

    processes.push(childProcess);

    process.on('SIGINT', killProcesses);
  });
};
