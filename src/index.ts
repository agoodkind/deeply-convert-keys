/**
 * Supported case conversion styles
 */
export enum CaseStyle {
  CamelCase = 'camelCase',
  SnakeCase = 'snake_case',
  KebabCase = 'kebab-case',
  PascalCase = 'PascalCase',
  ConstantCase = 'CONSTANT_CASE',
  DotCase = 'dot.case',
  PathCase = 'path/case',
  TrainCase = 'Train-Case'
}

/**
 * Type guard to check if value is a plain object
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  
  // Check if it's a plain object (not a Date, RegExp, etc.)
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/**
 * Split a string into words, handling various case formats
 */
const splitIntoWords = (str: string): string[] => {
  // Handle empty strings
  if (!str) return [];
  
  // First, replace common separators with spaces
  let processed = str
    .replace(/[-_.\/]/g, ' ')  // Replace separators with spaces
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')  // Add space between lowercase/digit and uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'); // Handle sequences like XMLHttp -> XML Http
  
  // Split on spaces and filter out empty strings
  let words = processed.split(/\s+/).filter(word => word.length > 0);
  
  // Further process each word to handle remaining camelCase
  words = words.flatMap(word => {
    // If word is all uppercase and longer than 1 char, treat as single word
    if (word.length > 1 && word === word.toUpperCase() && /^[A-Z]+$/.test(word)) {
      return [word];
    }
    
    // Split on uppercase letters but keep them with following lowercase
    const parts: string[] = [];
    let current = '';
    
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const nextChar = word[i + 1];
      
      if (i === 0) {
        current = char;
      } else if (/[A-Z]/.test(char) && current.length > 0) {
        // Start new word if uppercase letter found
        // But check if next is lowercase to keep together
        if (nextChar && /[a-z]/.test(nextChar)) {
          parts.push(current);
          current = char;
        } else if (!nextChar || /[A-Z]/.test(nextChar)) {
          // If next is also uppercase or end, add current char to current word
          current += char;
        } else {
          current += char;
        }
      } else {
        current += char;
      }
    }
    
    if (current) {
      parts.push(current);
    }
    
    return parts.filter(p => p.length > 0);
  });
  
  return words;
};

/**
 * Convert a string to camelCase
 */
export const toCamelCase = (str: string): string => {
  const words = splitIntoWords(str);
  if (words.length === 0) return str;
  
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
};

/**
 * Convert a string to snake_case
 */
export const toSnakeCase = (str: string): string => {
  const words = splitIntoWords(str);
  return words.map(word => word.toLowerCase()).join('_');
};

/**
 * Convert a string to kebab-case
 */
export const toKebabCase = (str: string): string => {
  const words = splitIntoWords(str);
  return words.map(word => word.toLowerCase()).join('-');
};

/**
 * Convert a string to PascalCase
 */
export const toPascalCase = (str: string): string => {
  const words = splitIntoWords(str);
  return words
    .map(word => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
};

/**
 * Convert a string to CONSTANT_CASE
 */
export const toConstantCase = (str: string): string => {
  const words = splitIntoWords(str);
  return words.map(word => word.toUpperCase()).join('_');
};

/**
 * Convert a string to dot.case
 */
export const toDotCase = (str: string): string => {
  const words = splitIntoWords(str);
  return words.map(word => word.toLowerCase()).join('.');
};

/**
 * Convert a string to path/case
 */
export const toPathCase = (str: string): string => {
  const words = splitIntoWords(str);
  return words.map(word => word.toLowerCase()).join('/');
};

/**
 * Convert a string to Train-Case
 */
export const toTrainCase = (str: string): string => {
  const words = splitIntoWords(str);
  return words
    .map(word => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('-');
};

/**
 * Convert a string to the specified case style
 */
export const convertCase = (str: string, caseStyle: CaseStyle | string): string => {
  switch (caseStyle) {
    case CaseStyle.CamelCase:
    case 'camelCase':
      return toCamelCase(str);
    case CaseStyle.SnakeCase:
    case 'snake_case':
      return toSnakeCase(str);
    case CaseStyle.KebabCase:
    case 'kebab-case':
      return toKebabCase(str);
    case CaseStyle.PascalCase:
    case 'PascalCase':
      return toPascalCase(str);
    case CaseStyle.ConstantCase:
    case 'CONSTANT_CASE':
      return toConstantCase(str);
    case CaseStyle.DotCase:
    case 'dot.case':
      return toDotCase(str);
    case CaseStyle.PathCase:
    case 'path/case':
      return toPathCase(str);
    case CaseStyle.TrainCase:
    case 'Train-Case':
      return toTrainCase(str);
    default:
      return str;
  }
};

/**
 * Recursively converts all keys in an object to the specified case style
 * @param obj The object to convert
 * @param caseStyle The case style to convert to (enum or string)
 * @returns A new object with all keys in the specified case style
 */
export function deeplyConvertKeys<T>(obj: unknown, caseStyle: CaseStyle | string): T {
  if (obj === null || typeof obj !== "object") {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deeplyConvertKeys(item, caseStyle)) as unknown as T;
  }

  if (isPlainObject(obj)) {
    return Object.entries(obj).reduce(
      (result, [key, value]) => {
        const convertedKey = convertCase(key, caseStyle);
        return {
          ...result,
          [convertedKey]: deeplyConvertKeys(value, caseStyle),
        };
      },
      {} as Record<string, unknown>,
    ) as T;
  }

  return obj as T;
}

// Convenience functions for specific conversions
export const deepCamelCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.CamelCase);
export const deepSnakeCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.SnakeCase);
export const deepKebabCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.KebabCase);
export const deepPascalCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.PascalCase);
export const deepConstantCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.ConstantCase);
export const deepDotCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.DotCase);
export const deepPathCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.PathCase);
export const deepTrainCaseKeys = <T>(obj: unknown): T => deeplyConvertKeys<T>(obj, CaseStyle.TrainCase);

// Export the main function as default
export default deeplyConvertKeys;