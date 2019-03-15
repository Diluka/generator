#! /usr/bin/env ts-node

import * as program from 'commander';
import { generateIndex, generateEntity } from './commands';

program
  .version('1.0.0')
  .command('generate-index <dirs...>')
  .description('需要生成index.ts的目录')
  .action((dirs: string[]) => {
    for (const dir of dirs) {
      generateIndex(dir);
    }
  });

program
  .version('1.0.0')
  .command('generate-entity <input> <output>')
  .description('生成实体文件')
  .action((input: string, output: string) => {
    generateEntity(input, output);
  });

program.parse(process.argv);
