import { exec } from 'child_process';
import ora from 'ora';
import { promisify } from 'util';

const execPromise = promisify(exec);

/**
 * 安装依赖
 * @param targetDir 目标目录
 * @param packageManager 包管理器类型 npm|yarn|pnpm
 */
export async function installDependencies(
  targetDir: string,
  packageManager: string = 'npm'
): Promise<void> {
  const spinner = ora('正在安装依赖...').start();
  
  try {
    const command = packageManager === 'yarn'
      ? 'yarn'
      : packageManager === 'pnpm'
        ? 'pnpm install'
        : 'npm install';
    
    await execPromise(command, { cwd: targetDir });
    
    spinner.succeed('依赖安装成功');
  } catch (error) {
    spinner.fail('依赖安装失败');
    throw error;
  }
} 