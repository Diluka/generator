import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

/**
 * 生成实体类
 * @param input swagger json
 * @param output 输出目录
 * @param root
 */
export function generateEntity(
  input: string,
  output: string,
  root: string = process.cwd(),
) {
  const specPath = path.join(root, input);
  if (path.extname(specPath) !== '.json') {
    throw new Error('仅支持json文件');
  }

  if (!fs.existsSync(specPath)) {
    throw new Error('文件不存在');
  }

  const { definitions } = JSON.parse(
    fs.readFileSync(specPath, { encoding: 'utf-8' }),
  );
  if (!definitions) {
    throw new Error('未找到#/definitions/');
  }

  for (const entityName of Object.keys(definitions)) {
    const spec = definitions[entityName];

    let source = '';
    source += `export class ${entityName}{\n`;
    for (const propertyKey of Object.keys(spec.properties)) {
      source += `${propertyKey}:any;\n`; // TODO 生成不同的类型
    }
    source += '}\n';

    fs.writeFileSync(
      path.join(root, output, _.kebabCase(entityName) + '.entity.ts'),
      source,
    );
  }
}
