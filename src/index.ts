#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import createCommand from './commands/create';
import { getVersion } from './utils/version';
import { handleError } from './utils/error';

async function main() {
  try {
    // 创建程序实例
    const program = new Command();
    const version = await getVersion();

    // 设置版本和描述
    program.name('chrome-cli').description('Chrome Extension MV3 项目脚手架工具').version(version);

    // 注册创建命令
    createCommand(program);

    // 添加帮助信息
    program.on('--help', () => {
      console.log('');
      console.log('示例:');
      console.log(`  ${chalk.cyan('chrome-cli create my-extension')}`);
    });

    // 解析命令行参数
    program.parse(process.argv);

    // 如果没有提供任何命令，显示帮助信息
    if (!process.argv.slice(2).length) {
      program.outputHelp();
    }
  } catch (error) {
    handleError('启动脚手架工具失败', error);
  }
}

main();
