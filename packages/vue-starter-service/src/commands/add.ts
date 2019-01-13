import * as fs from 'fs-extra';
import { Command, CommandHandler } from '../lib/command';
import { prompt, Question } from 'inquirer';
import { HeadLine, logErrorBold, Result } from '../utils/ui';
import { runProcess } from '../utils/process';
import { runtimeRoot } from '../utils/path';
import opn = require('opn');

interface AddTaskResult {
  package: string;
}

@Command({
  name: 'add',
  alias: 'a',
  description: 'Add a vue-starter package to your project.',
})
export class Add implements CommandHandler {
  private questions: Question[] = [
    {
      type: 'list',
      name: 'package',
      message: 'Which package do you want to add to your project?',
      choices: ['vue-starter-contentful'],
    },
  ];

  public async run(args: string[], silent: boolean) {
    const result: AddTaskResult = await prompt<AddTaskResult>(this.questions);
    const source = runtimeRoot(`node_modules/${result.package}/template`);
    const destination = runtimeRoot();

    HeadLine(`Installing ${result.package} into your project.`);

    try {
      await runProcess('npm', ['install', '--save', result.package], { silent: true });
    } catch (e) {
      logErrorBold(e);
    }

    if (fs.existsSync(source)) {
      fs.copy(source, destination, (e) => {
        if (e) {
          logErrorBold(e);
        } else {
          Result(`Package ${result.package} successfully installed.`);

          opn(`https://github.com/devCrossNet/vue-starter-packages/tree/master/packages/${result.package}`, {
            wait: false,
          }).catch((err) => logErrorBold(err));
        }
      });
    }
  }
}
