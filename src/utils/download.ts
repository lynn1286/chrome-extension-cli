import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { TEMPLATE_REPO } from '../config';

const execPromise = promisify(exec);

/**
 * 下载模板
 * @param targetDir 目标目录
 */
export async function downloadTemplate(targetDir: string): Promise<void> {
  const spinner = ora('正在下载模板...').start();

  try {
    // 确保目标目录存在
    await fs.ensureDir(targetDir);

    // 使用 git clone 下载模板
    await execPromise(`git clone https://github.com/${TEMPLATE_REPO}.git ${targetDir}`);

    // 清理不必要的文件
    const filesToRemove = ['.git', '.github'];
    for (const file of filesToRemove) {
      const filePath = path.join(targetDir, file);
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
      }
    }

    spinner.succeed('模板下载成功');
  } catch (error) {
    spinner.fail('模板下载失败');
    throw error;
  }
}
