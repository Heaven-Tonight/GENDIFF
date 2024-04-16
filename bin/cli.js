import { Command } from 'commander';
import genDiff from '../src/index.js';

const cli = () => {
  const program = new Command();
  const options = program.opts();
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version ', 'output the version number')
    .arguments('filepath1 filepath2')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format </type>', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
      const diff = genDiff(filepath1, filepath2, options.format);
      console.log(diff);
    });

  program.parse();

  if (options.help) {
    console.log(program.description());
    console.log(options);
  }
};

export default cli;
