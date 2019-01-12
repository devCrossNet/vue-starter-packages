import * as commander from 'commander';

export interface CommandMetadata {
  name: string;
  description: string;
  alias?: string;
  options?: Option[];
}

export interface Option {
  flags: string;
  description?: string;
  formatter?: any;
  defaultValue?: any;
}

export interface CommandHandler {
  run(args: string[], silent: boolean);
}

const getProperties = (obj: any): string[] => {
  const result = [];
  for (const property in obj) {
    if (
      obj.hasOwnProperty(property) &&
      !property.startsWith('_') &&
      ['commands', 'options', 'parent'].indexOf(property) === -1
    ) {
      result.push(property);
    }
  }
  return result;
};

export function Command(meta: CommandMetadata): any {
  return (Target) => {
    const target = new Target();
    const command = commander.command(meta.name);

    command.allowUnknownOption();

    if (meta.alias) {
      command.alias(meta.alias);
    }

    if (meta.description) {
      command.description(meta.description);
    }

    if (meta.options) {
      meta.options.forEach((option: Option) => {
        command.option(option.flags, option.description, option.defaultValue);

        if (option.formatter) {
          command.option(option.flags, option.description, option.formatter, option.defaultValue);
        } else {
          command.option(option.flags, option.description, option.defaultValue);
        }
      });
    }

    command.action((data: any) => {
      const options = getProperties(data);
      const args = (data.parent && data.parent.rawArgs.splice(3)) || [];
      const silent = !!(data.parent && data.parent.silent);

      options.forEach((option: any) => (target[option] = data[option]));

      target.run(args, silent);
    });

    return target;
  };
}
