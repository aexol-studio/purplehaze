export const objectToType = (a: unknown): string => {
  if (a === undefined) {
    return '{}';
  }
  if (Array.isArray(a)) {
    return `[${a.map((k) => objectToType(a[k])).join(', ')}]`;
  }
  if (typeof a === 'object') {
    if (a === null) {
      return 'null';
    }
    return `{${Object.keys(a)
      .map((k) => `"${k}": ${objectToType((a as Record<string, string>)[k])}`)
      .join(';\n')}}`;
  }
  return typeof a;
};

export const asInterface = (name: string) => (content: string) =>
  `interface ${name} ${content}`;

export const withExport = (content: string) => `export ${content}`;
