import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * 获取 package.json 中的版本号
 * @returns 版本号
 */
export async function getVersion(): Promise<string> {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // 从项目根目录的 package.json 读取版本信息
    // 打包后 dist/index.js 在 dist 目录下，所以只需向上一级
    const packageJsonPath = path.resolve(__dirname, '../package.json');
    const packageJson = await fs.readJSON(packageJsonPath);

    return packageJson.version || '0.0.0';
  } catch (error) {
    return '0.0.0';
  }
}
