/**
 * 验证项目名称是否有效
 * 有效的项目名称：仅包含小写字母、数字、连字符和下划线
 * @param projectName 项目名称
 * @returns 是否有效
 */
export function validateProjectName(projectName: string): boolean {
  // 项目名称规则：小写字母、数字、连字符、下划线
  const namePattern = /^[a-z0-9_-]+$/;
  return namePattern.test(projectName);
} 