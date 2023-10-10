import { Command } from 'commander';

const program = new Command();

const showInfo = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .option('-V, --version ', 'output the version number');

  program.parse();

  const options = program.opts();

  if (options.help) {
    console.log(program.description());
    console.log(program.opts());
  }
};

export default showInfo;
