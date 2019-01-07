import { Config } from '../models/Config';

export const TestTask = async (command: any) => {
  let args = command.parent.rawArgs.splice(3);

  args = args.concat([
    ...(command.silent || command.silent === undefined ? ['--silent'] : []),
    ...(command.coverage || command.coverage === undefined ? ['--coverage'] : []),
    ...(Config.jest ? `--config=${JSON.stringify(Config.jest)}` : []),
  ]);

  process.env.NODE_ENV = 'test';

  try {
    await require('jest').run(args);
  } catch (e) {
    console.log(e);
  }
};
