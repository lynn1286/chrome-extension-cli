import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

interface TemplateData {
  projectName: string;
  projectDescription: string;
  author: string;
}

/**
 * 处理模板文件，替换变量
 * @param targetDir 目标目录
 * @param data 模板数据
 */
export async function processTemplate(targetDir: string, data: TemplateData): Promise<void> {
  // 需要处理的文件列表
  const filesPattern = ['package.json', 'README.md', 'manifest.ts', 'index.html'];

  for (const pattern of filesPattern) {
    const files = await glob(pattern, { cwd: targetDir, absolute: true });

    for (const file of files) {
      // 读取文件内容
      let content = await fs.readFile(file, 'utf-8');

      // 替换变量
      content = content
        // JSON 格式 (package.json)
        .replace(/"name": ".*?"/, `"name": "${data.projectName}"`)
        .replace(/"description": ".*?"/, `"description": "${data.projectDescription}"`)
        .replace(/"author": ".*?"/, `"author": "${data.author}"`)
        // TypeScript 对象格式 (manifest.ts)
        .replace(/name: '.*?'/, `name: '${data.projectName}'`)
        .replace(/description: '.*?'/, `description: '${data.projectDescription}'`)
        // HTML 格式 (index.html)
        .replace(/<title>.*?<\/title>/, `<title>${data.projectName}</title>`)
        // 其他替换
        .replace(/# chrome-extension-mv3/g, `# ${data.projectName}`)
        .replace(/Chrome Extension MV3 Template/g, data.projectDescription);

      // 写入修改后的内容
      await fs.writeFile(file, content, { encoding: 'utf-8' });
    }
  }

  // 更新 README.md
  const readmePath = path.join(targetDir, 'README.md');
  if (await fs.pathExists(readmePath)) {
    // const readmeContent = await fs.readFile(readmePath, 'utf-8');

    // 添加新的内容
    const newReadmeContent = `# ${data.projectName}

${data.projectDescription}

## 功能特点

- 基于 Manifest V3 规范
- 使用 TypeScript 和 React 构建
- 支持热更新开发
- 使用 TailwindCSS 进行样式管理
- 完整的项目结构

## 开发指南

### 安装依赖

\`\`\`bash
npm install
# 或
yarn install
# 或
pnpm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
\`\`\`

### 构建生产版本

\`\`\`bash
npm run build
# 或
yarn build
# 或
pnpm build
\`\`\`

## 项目结构

\`\`\`
${data.projectName}/
├── src/
│   ├── background/ # 后台脚本
│   ├── content/    # 内容脚本
│   ├── popup/      # 弹出窗口
│   └── utils/      # 工具函数
├── manifest.ts     # 清单文件配置
└── ...
\`\`\`

## 使用方法

1. 构建扩展: \`npm run build\`
2. 打开 Chrome 扩展管理页面: chrome://extensions/
3. 开启"开发者模式"
4. 点击"加载已解压的扩展"
5. 选择项目的 \`dist\` 目录

## 许可证

MIT
`;

    await fs.writeFile(readmePath, newReadmeContent, { encoding: 'utf-8' });
  }
}
