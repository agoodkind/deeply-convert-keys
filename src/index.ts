/**
 * Converts a string to camelCase
 */
const toCamelCase = (str: string): string => {
  // Handle leading underscore or hyphen
  const leadingChar = str.match(/^[-_]+/)?.[0] || '';
  const withoutLeading = str.slice(leadingChar.length);
  
  // Convert the rest to camelCase
  const converted = withoutLeading.replace(/[-_]+([a-zA-Z])/g, (_, char) => char.toUpperCase());
  
  return leadingChar + converted;
};

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
 * Recursively converts all keys in an object to camelCase
 * @param obj The object to convert
 * @returns A new object with all keys in camelCase
 */
export function deepCamelCaseKeys<T>(obj: unknown): T {
  if (obj === null || typeof obj !== "object") {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCamelCaseKeys(item)) as unknown as T;
  }

  if (isPlainObject(obj)) {
    return Object.entries(obj).reduce(
      (result, [key, value]) => {
        const camelKey = toCamelCase(key);
        return {
          ...result,
          [camelKey]: deepCamelCaseKeys(value),
        };
      },
      {} as Record<string, unknown>,
    ) as T;
  }

  return obj as T;
}

// Export as default as well for convenience
export default deepCamelCaseKeys;
