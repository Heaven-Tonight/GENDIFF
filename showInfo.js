import { Command } from 'commander';

const program = new Command();

const showInfo = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .arguments('filepath1 filepath2')
    .helpOption('-h, --help', 'output usage information')
    .option('-V, --version ', 'output the version number')
    .option('-f, --format <type>', 'output format');

  program.parse();

  const options = program.opts();

  if (options.help) {
    console.log(program.description());
    console.log(program.opts());
  }
};

export default showInfo;
