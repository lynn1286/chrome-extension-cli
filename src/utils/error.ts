import chalk from 'chalk';

/**
 * 格式化错误消息并退出进程
 * @param message 错误消息
 * @param error 原始错误对象
 */
export function handleError(message: string, error?: unknown): never {
  console.error(chalk.red(`\n❌ ${message}`));
  
  if (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`\n${error.message}`));
      if (error.stack) {
        console.error(chalk.gray(`\n${error.stack}`));
      }
    } else {
      console.error(chalk.red(`\n${String(error)}`));
    }
  }
  
  process.exit(1);
} 