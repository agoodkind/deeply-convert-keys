import { deepCamelCaseKeys } from './index';

describe('deepCamelCaseKeys', () => {
  describe('primitive values', () => {
    it('should return null for null input', () => {
      expect(deepCamelCaseKeys(null)).toBeNull();
    });

    it('should return undefined for undefined input', () => {
      expect(deepCamelCaseKeys(undefined)).toBeUndefined();
    });

    it('should return numbers as-is', () => {
      expect(deepCamelCaseKeys(42)).toBe(42);
    });

    it('should return strings as-is', () => {
      expect(deepCamelCaseKeys('hello')).toBe('hello');
    });

    it('should return booleans as-is', () => {
      expect(deepCamelCaseKeys(true)).toBe(true);
      expect(deepCamelCaseKeys(false)).toBe(false);
    });
  });

  describe('objects', () => {
    it('should convert snake_case keys to camelCase', () => {
      const input = {
        user_name: 'John',
        user_age: 30,
        email_address: 'john@example.com'
      };
      const expected = {
        userName: 'John',
        userAge: 30,
        emailAddress: 'john@example.com'
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should convert kebab-case keys to camelCase', () => {
      const input = {
        'user-name': 'John',
        'user-age': 30,
        'email-address': 'john@example.com'
      };
      const expected = {
        userName: 'John',
        userAge: 30,
        emailAddress: 'john@example.com'
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should handle mixed case formats', () => {
      const input = {
        'kebab-case': 'value1',
        snake_case: 'value2',
        camelCase: 'value3',
        'mixed-snake_case': 'value4'
      };
      const expected = {
        kebabCase: 'value1',
        snakeCase: 'value2',
        camelCase: 'value3',
        mixedSnakeCase: 'value4'
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should preserve keys that are already in camelCase', () => {
      const input = {
        alreadyCamelCase: 'value',
        anotherCamelKey: 42
      };
      expect(deepCamelCaseKeys(input)).toEqual(input);
    });
  });

  describe('nested objects', () => {
    it('should recursively convert nested object keys', () => {
      const input = {
        user_info: {
          first_name: 'John',
          last_name: 'Doe',
          contact_details: {
            email_address: 'john@example.com',
            phone_number: '555-1234'
          }
        }
      };
      const expected = {
        userInfo: {
          firstName: 'John',
          lastName: 'Doe',
          contactDetails: {
            emailAddress: 'john@example.com',
            phoneNumber: '555-1234'
          }
        }
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should handle deeply nested structures', () => {
      const input = {
        level_one: {
          level_two: {
            level_three: {
              deep_value: 'nested'
            }
          }
        }
      };
      const expected = {
        levelOne: {
          levelTwo: {
            levelThree: {
              deepValue: 'nested'
            }
          }
        }
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });
  });

  describe('arrays', () => {
    it('should handle arrays of primitives', () => {
      const input = ['a', 'b', 'c', 1, 2, 3];
      expect(deepCamelCaseKeys(input)).toEqual(input);
    });

    it('should convert keys in arrays of objects', () => {
      const input = [
        { first_name: 'John', last_name: 'Doe' },
        { first_name: 'Jane', last_name: 'Smith' }
      ];
      const expected = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' }
      ];
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should handle nested arrays', () => {
      const input = {
        user_list: [
          {
            user_name: 'John',
            user_roles: ['admin', 'user']
          },
          {
            user_name: 'Jane',
            user_roles: ['user']
          }
        ]
      };
      const expected = {
        userList: [
          {
            userName: 'John',
            userRoles: ['admin', 'user']
          },
          {
            userName: 'Jane',
            userRoles: ['user']
          }
        ]
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should handle arrays containing mixed types', () => {
      const input = [
        'string',
        42,
        { snake_case: 'value' },
        [{ nested_array: 'item' }],
        null,
        undefined
      ];
      const expected = [
        'string',
        42,
        { snakeCase: 'value' },
        [{ nestedArray: 'item' }],
        null,
        undefined
      ];
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });
  });

  describe('edge cases', () => {
    it('should handle empty objects', () => {
      expect(deepCamelCaseKeys({})).toEqual({});
    });

    it('should handle empty arrays', () => {
      expect(deepCamelCaseKeys([])).toEqual([]);
    });

    it('should handle keys with multiple consecutive underscores or hyphens', () => {
      const input = {
        'multiple__underscores': 'value1',
        'multiple--hyphens': 'value2',
        'mixed__under--hyphen': 'value3'
      };
      const expected = {
        multipleUnderscores: 'value1',
        multipleHyphens: 'value2',
        mixedUnderHyphen: 'value3'
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should handle keys starting with underscore or hyphen', () => {
      const input = {
        '_private_field': 'value1',
        '-kebab-field': 'value2'
      };
      const expected = {
        '_privateField': 'value1',
        '-kebabField': 'value2'
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });

    it('should handle uppercase letters in snake_case', () => {
      const input = {
        'API_KEY': 'secret',
        'user_ID': '123'
      };
      const expected = {
        'APIKEY': 'secret',
        'userID': '123'
      };
      expect(deepCamelCaseKeys(input)).toEqual(expected);
    });
  });

  describe('type safety', () => {
    interface UserData {
      userName: string;
      userAge: number;
      contactInfo: {
        emailAddress: string;
      };
    }

    it('should maintain type safety with TypeScript generics', () => {
      const input = {
        user_name: 'John',
        user_age: 30,
        contact_info: {
          email_address: 'john@example.com'
        }
      };

      const result = deepCamelCaseKeys<UserData>(input);
      
      // TypeScript should recognize these properties
      expect(result.userName).toBe('John');
      expect(result.userAge).toBe(30);
      expect(result.contactInfo.emailAddress).toBe('john@example.com');
    });
  });

  describe('non-plain objects', () => {
    it('should preserve Date objects', () => {
      const date = new Date('2024-01-01');
      const input = {
        created_at: date,
        updated_at: date
      };
      const result = deepCamelCaseKeys(input) as any;
      expect(result).toEqual({
        createdAt: date,
        updatedAt: date
      });
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should preserve class instances', () => {
      class CustomClass {
        constructor(public value: string) {}
      }
      const instance = new CustomClass('test');
      const input = {
        custom_instance: instance
      };
      const result = deepCamelCaseKeys(input) as any;
      expect(result).toEqual({
        customInstance: instance
      });
      expect(result.customInstance).toBeInstanceOf(CustomClass);
    });
  });
});
