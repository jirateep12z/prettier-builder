export function ConvertToYaml(
  obj: Record<string, unknown>,
  indent = 0
): string {
  const spaces = '  '.repeat(indent);
  let result = '';
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`;
      for (const item of value) {
        result += `${spaces}  - ${item}\n`;
      }
    } else if (typeof value === 'object' && value !== null) {
      result += `${spaces}${key}:\n`;
      result += ConvertToYaml(value as Record<string, unknown>, indent + 1);
    } else if (typeof value === 'string') {
      result += `${spaces}${key}: "${value}"\n`;
    } else {
      result += `${spaces}${key}: ${value}\n`;
    }
  }
  return result;
}
