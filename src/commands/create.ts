import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { downloadTemplate } from '../utils/download';
import { processTemplate } from '../utils/template';
import { installDependencies } from '../utils/dependencies';
import { validateProjectName } from '../utils/validation';
import { handleError } from '../utils/error';
import { PACKAGE_MANAGERS } from '../config';

interface CreateOptions {
  skipInstall?: boolean;
  packageManager?: string;
}

export default function createCommand(program: Command): void {
  program
    .command('create <project-name>')
    .description('创建一个新的 Chrome Extension MV3 项目')
    .option('--skip-install', '跳过依赖安装')
    .option('--package-manager <manager>', `指定包管理器 (${PACKAGE_MANAGERS.join(', ')})`)
    .action(async (projectName: string, options: CreateOptions) => {
      try {
        // 验证项目名称
        const isValid = validateProjectName(projectName);
        if (!isValid) {
          console.log(chalk.red('无效的项目名称，请使用小写字母、数字、连字符或下划线'));
          process.exit(1);
        }

        // 检查目标目录是否已存在
        const targetDir = path.resolve(process.cwd(), projectName);
        if (fs.existsSync(targetDir)) {
          const { overwrite } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'overwrite',
              message: `目录 ${projectName} 已存在，是否覆盖?`,
              default: false,
            },
          ]);

          if (!overwrite) {
            console.log(chalk.yellow('已取消创建'));
            process.exit(0);
          }

          // 清空目录
          await fs.emptyDir(targetDir);
        }

        // 收集项目信息
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectDescription',
            message: '请输入项目描述:',
            default: '一个基于 Chrome Extension MV3 的浏览器扩展',
          },
          {
            type: 'input',
            name: 'author',
            message: '请输入作者名称:',
          },
          {
            type: 'list',
            name: 'packageManager',
            message: '请选择包管理器:',
            choices: PACKAGE_MANAGERS,
            default: 'npm',
            when: !options.packageManager,
          },
          {
            type: 'confirm',
            name: 'installDeps',
            message: '是否立即安装依赖?',
            default: true,
            when: options.skipInstall === undefined,
          },
        ]);

        // 合并选项
        const finalOptions = {
          ...options,
          ...answers,
          packageManager: options.packageManager || answers.packageManager || 'npm',
          skipInstall: options.skipInstall || !answers.installDeps,
        };

        // 下载模板
        console.log(chalk.blue('\n🚀 开始创建项目...'));
        await downloadTemplate(targetDir);

        // 处理模板文件
        console.log(chalk.blue('\n📝 正在处理模板文件...'));
        await processTemplate(targetDir, {
          projectName,
          projectDescription: finalOptions.projectDescription,
          author: finalOptions.author,
        });

        // 安装依赖
        if (!finalOptions.skipInstall) {
          console.log(chalk.blue(`\n📦 正在使用 ${finalOptions.packageManager} 安装依赖...`));
          await installDependencies(targetDir, finalOptions.packageManager);
        }

        // 完成提示
        console.log(chalk.green('\n✅ 项目创建成功!'));
        console.log('\n接下来你可以:');
        console.log(`  ${chalk.cyan(`cd ${projectName}`)}`);

        if (finalOptions.skipInstall) {
          console.log(`  ${chalk.cyan(`${finalOptions.packageManager} install`)}`);
        }

        console.log(`  ${chalk.cyan(`${finalOptions.packageManager} run dev`)}`);
        console.log('\n祝您开发愉快! 🎉\n');
      } catch (error) {
        handleError('创建项目失败', error);
      }
    });
}
