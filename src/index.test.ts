import {
  CaseStyle,
  deeplyConvertKeys,
  deepCamelCaseKeys,
  deepSnakeCaseKeys,
  deepKebabCaseKeys,
  deepPascalCaseKeys,
  deepConstantCaseKeys,
  deepDotCaseKeys,
  deepPathCaseKeys,
  deepTrainCaseKeys,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
  toConstantCase,
  toDotCase,
  toPathCase,
  toTrainCase,
  convertCase
} from './index';

describe('Case conversion functions', () => {
  const testCases = [
    { input: 'hello_world', expected: {
      camelCase: 'helloWorld',
      snake_case: 'hello_world',
      'kebab-case': 'hello-world',
      PascalCase: 'HelloWorld',
      CONSTANT_CASE: 'HELLO_WORLD',
      'dot.case': 'hello.world',
      'path/case': 'hello/world',
      'Train-Case': 'Hello-World'
    }},
    { input: 'helloWorld', expected: {
      camelCase: 'helloWorld',
      snake_case: 'hello_world',
      'kebab-case': 'hello-world',
      PascalCase: 'HelloWorld',
      CONSTANT_CASE: 'HELLO_WORLD',
      'dot.case': 'hello.world',
      'path/case': 'hello/world',
      'Train-Case': 'Hello-World'
    }},
    { input: 'hello-world', expected: {
      camelCase: 'helloWorld',
      snake_case: 'hello_world',
      'kebab-case': 'hello-world',
      PascalCase: 'HelloWorld',
      CONSTANT_CASE: 'HELLO_WORLD',
      'dot.case': 'hello.world',
      'path/case': 'hello/world',
      'Train-Case': 'Hello-World'
    }},
    { input: 'HelloWorld', expected: {
      camelCase: 'helloWorld',
      snake_case: 'hello_world',
      'kebab-case': 'hello-world',
      PascalCase: 'HelloWorld',
      CONSTANT_CASE: 'HELLO_WORLD',
      'dot.case': 'hello.world',
      'path/case': 'hello/world',
      'Train-Case': 'Hello-World'
    }},
    { input: 'HELLO_WORLD', expected: {
      camelCase: 'helloWorld',
      snake_case: 'hello_world',
      'kebab-case': 'hello-world',
      PascalCase: 'HelloWorld',
      CONSTANT_CASE: 'HELLO_WORLD',
      'dot.case': 'hello.world',
      'path/case': 'hello/world',
      'Train-Case': 'Hello-World'
    }},
    { input: 'hello.world', expected: {
      camelCase: 'helloWorld',
      snake_case: 'hello_world',
      'kebab-case': 'hello-world',
      PascalCase: 'HelloWorld',
      CONSTANT_CASE: 'HELLO_WORLD',
      'dot.case': 'hello.world',
      'path/case': 'hello/world',
      'Train-Case': 'Hello-World'
    }},
    { input: 'XMLHttpRequest', expected: {
      camelCase: 'xmlHttpRequest',
      snake_case: 'xml_http_request',
      'kebab-case': 'xml-http-request',
      PascalCase: 'XmlHttpRequest',
      CONSTANT_CASE: 'XML_HTTP_REQUEST',
      'dot.case': 'xml.http.request',
      'path/case': 'xml/http/request',
      'Train-Case': 'Xml-Http-Request'
    }}
  ];

  describe('toCamelCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected.camelCase}"`, () => {
        expect(toCamelCase(input)).toBe(expected.camelCase);
      });
    });
  });

  describe('toSnakeCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected.snake_case}"`, () => {
        expect(toSnakeCase(input)).toBe(expected.snake_case);
      });
    });
  });

  describe('toKebabCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected['kebab-case']}"`, () => {
        expect(toKebabCase(input)).toBe(expected['kebab-case']);
      });
    });
  });

  describe('toPascalCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected.PascalCase}"`, () => {
        expect(toPascalCase(input)).toBe(expected.PascalCase);
      });
    });
  });

  describe('toConstantCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected.CONSTANT_CASE}"`, () => {
        expect(toConstantCase(input)).toBe(expected.CONSTANT_CASE);
      });
    });
  });

  describe('toDotCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected['dot.case']}"`, () => {
        expect(toDotCase(input)).toBe(expected['dot.case']);
      });
    });
  });

  describe('toPathCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected['path/case']}"`, () => {
        expect(toPathCase(input)).toBe(expected['path/case']);
      });
    });
  });

  describe('toTrainCase', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should convert "${input}" to "${expected['Train-Case']}"`, () => {
        expect(toTrainCase(input)).toBe(expected['Train-Case']);
      });
    });
  });

  describe('convertCase', () => {
    it('should convert to specified case style using string literals', () => {
      const input = 'hello_world';
      expect(convertCase(input, 'camelCase')).toBe('helloWorld');
      expect(convertCase(input, 'snake_case')).toBe('hello_world');
      expect(convertCase(input, 'kebab-case')).toBe('hello-world');
      expect(convertCase(input, 'PascalCase')).toBe('HelloWorld');
      expect(convertCase(input, 'CONSTANT_CASE')).toBe('HELLO_WORLD');
      expect(convertCase(input, 'dot.case')).toBe('hello.world');
      expect(convertCase(input, 'path/case')).toBe('hello/world');
      expect(convertCase(input, 'Train-Case')).toBe('Hello-World');
    });

    it('should convert to specified case style using enum values', () => {
      const input = 'hello_world';
      expect(convertCase(input, CaseStyle.CamelCase)).toBe('helloWorld');
      expect(convertCase(input, CaseStyle.SnakeCase)).toBe('hello_world');
      expect(convertCase(input, CaseStyle.KebabCase)).toBe('hello-world');
      expect(convertCase(input, CaseStyle.PascalCase)).toBe('HelloWorld');
      expect(convertCase(input, CaseStyle.ConstantCase)).toBe('HELLO_WORLD');
      expect(convertCase(input, CaseStyle.DotCase)).toBe('hello.world');
      expect(convertCase(input, CaseStyle.PathCase)).toBe('hello/world');
      expect(convertCase(input, CaseStyle.TrainCase)).toBe('Hello-World');
    });
  });
});

describe('deeplyConvertKeys', () => {
  const testObject = {
    user_name: 'John Doe',
    user_age: 30,
    contact_info: {
      email_address: 'john@example.com',
      phone_number: '555-1234'
    },
    favorite_colors: ['red', 'blue', 'green']
  };

  describe('primitive values', () => {
    it('should return null for null input', () => {
      expect(deeplyConvertKeys(null, 'camelCase')).toBeNull();
    });

    it('should return undefined for undefined input', () => {
      expect(deeplyConvertKeys(undefined, 'camelCase')).toBeUndefined();
    });

    it('should return numbers as-is', () => {
      expect(deeplyConvertKeys(42, 'camelCase')).toBe(42);
    });

    it('should return strings as-is', () => {
      expect(deeplyConvertKeys('hello', 'camelCase')).toBe('hello');
    });

    it('should return booleans as-is', () => {
      expect(deeplyConvertKeys(true, 'camelCase')).toBe(true);
      expect(deeplyConvertKeys(false, 'camelCase')).toBe(false);
    });
  });

  describe('to camelCase', () => {
    it('should convert object keys to camelCase using string literal', () => {
      const result = deeplyConvertKeys(testObject, 'camelCase');
      expect(result).toEqual({
        userName: 'John Doe',
        userAge: 30,
        contactInfo: {
          emailAddress: 'john@example.com',
          phoneNumber: '555-1234'
        },
        favoriteColors: ['red', 'blue', 'green']
      });
    });

    it('should convert object keys to camelCase using enum', () => {
      const result = deeplyConvertKeys(testObject, CaseStyle.CamelCase);
      expect(result).toEqual({
        userName: 'John Doe',
        userAge: 30,
        contactInfo: {
          emailAddress: 'john@example.com',
          phoneNumber: '555-1234'
        },
        favoriteColors: ['red', 'blue', 'green']
      });
    });
  });

  describe('to snake_case', () => {
    it('should convert object keys to snake_case', () => {
      const camelObject = {
        userName: 'John Doe',
        userAge: 30,
        contactInfo: {
          emailAddress: 'john@example.com',
          phoneNumber: '555-1234'
        }
      };
      const result = deeplyConvertKeys(camelObject, 'snake_case');
      expect(result).toEqual({
        user_name: 'John Doe',
        user_age: 30,
        contact_info: {
          email_address: 'john@example.com',
          phone_number: '555-1234'
        }
      });
    });
  });

  describe('to kebab-case', () => {
    it('should convert object keys to kebab-case', () => {
      const result = deeplyConvertKeys(testObject, 'kebab-case');
      expect(result).toEqual({
        'user-name': 'John Doe',
        'user-age': 30,
        'contact-info': {
          'email-address': 'john@example.com',
          'phone-number': '555-1234'
        },
        'favorite-colors': ['red', 'blue', 'green']
      });
    });
  });

  describe('to PascalCase', () => {
    it('should convert object keys to PascalCase', () => {
      const result = deeplyConvertKeys(testObject, 'PascalCase');
      expect(result).toEqual({
        UserName: 'John Doe',
        UserAge: 30,
        ContactInfo: {
          EmailAddress: 'john@example.com',
          PhoneNumber: '555-1234'
        },
        FavoriteColors: ['red', 'blue', 'green']
      });
    });
  });

  describe('to CONSTANT_CASE', () => {
    it('should convert object keys to CONSTANT_CASE', () => {
      const result = deeplyConvertKeys(testObject, 'CONSTANT_CASE');
      expect(result).toEqual({
        USER_NAME: 'John Doe',
        USER_AGE: 30,
        CONTACT_INFO: {
          EMAIL_ADDRESS: 'john@example.com',
          PHONE_NUMBER: '555-1234'
        },
        FAVORITE_COLORS: ['red', 'blue', 'green']
      });
    });
  });

  describe('arrays', () => {
    it('should handle arrays of primitives', () => {
      const input = ['a', 'b', 'c', 1, 2, 3];
      expect(deeplyConvertKeys(input, 'camelCase')).toEqual(input);
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
      expect(deeplyConvertKeys(input, 'camelCase')).toEqual(expected);
    });

    it('should handle nested arrays', () => {
      const input = {
        user_list: [
          {
            user_name: 'John',
            user_roles: ['admin', 'user']
          }
        ]
      };
      const expected = {
        userList: [
          {
            userName: 'John',
            userRoles: ['admin', 'user']
          }
        ]
      };
      expect(deeplyConvertKeys(input, 'camelCase')).toEqual(expected);
    });
  });

  describe('edge cases', () => {
    it('should handle empty objects', () => {
      expect(deeplyConvertKeys({}, 'camelCase')).toEqual({});
    });

    it('should handle empty arrays', () => {
      expect(deeplyConvertKeys([], 'camelCase')).toEqual([]);
    });
  });

  describe('non-plain objects', () => {
    it('should preserve Date objects', () => {
      const date = new Date('2024-01-01');
      const input = {
        created_at: date,
        updated_at: date
      };
      const result = deeplyConvertKeys(input, 'camelCase') as any;
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
      const result = deeplyConvertKeys(input, 'camelCase') as any;
      expect(result).toEqual({
        customInstance: instance
      });
      expect(result.customInstance).toBeInstanceOf(CustomClass);
    });
  });
});

describe('Convenience functions', () => {
  const testObject = {
    test_key: 'value',
    nested_object: {
      inner_key: 'inner'
    }
  };

  it('deepCamelCaseKeys should convert to camelCase', () => {
    const result = deepCamelCaseKeys(testObject);
    expect(result).toEqual({
      testKey: 'value',
      nestedObject: {
        innerKey: 'inner'
      }
    });
  });

  it('deepSnakeCaseKeys should convert to snake_case', () => {
    const input = { testKey: 'value', nestedObject: { innerKey: 'inner' } };
    const result = deepSnakeCaseKeys(input);
    expect(result).toEqual({
      test_key: 'value',
      nested_object: {
        inner_key: 'inner'
      }
    });
  });

  it('deepKebabCaseKeys should convert to kebab-case', () => {
    const result = deepKebabCaseKeys(testObject);
    expect(result).toEqual({
      'test-key': 'value',
      'nested-object': {
        'inner-key': 'inner'
      }
    });
  });

  it('deepPascalCaseKeys should convert to PascalCase', () => {
    const result = deepPascalCaseKeys(testObject);
    expect(result).toEqual({
      TestKey: 'value',
      NestedObject: {
        InnerKey: 'inner'
      }
    });
  });

  it('deepConstantCaseKeys should convert to CONSTANT_CASE', () => {
    const result = deepConstantCaseKeys(testObject);
    expect(result).toEqual({
      TEST_KEY: 'value',
      NESTED_OBJECT: {
        INNER_KEY: 'inner'
      }
    });
  });

  it('deepDotCaseKeys should convert to dot.case', () => {
    const result = deepDotCaseKeys(testObject);
    expect(result).toEqual({
      'test.key': 'value',
      'nested.object': {
        'inner.key': 'inner'
      }
    });
  });

  it('deepPathCaseKeys should convert to path/case', () => {
    const result = deepPathCaseKeys(testObject);
    expect(result).toEqual({
      'test/key': 'value',
      'nested/object': {
        'inner/key': 'inner'
      }
    });
  });

  it('deepTrainCaseKeys should convert to Train-Case', () => {
    const result = deepTrainCaseKeys(testObject);
    expect(result).toEqual({
      'Test-Key': 'value',
      'Nested-Object': {
        'Inner-Key': 'inner'
      }
    });
  });
});

describe('Type safety', () => {
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

    const result = deeplyConvertKeys<UserData>(input, 'camelCase');
    
    // TypeScript should recognize these properties
    expect(result.userName).toBe('John');
    expect(result.userAge).toBe(30);
    expect(result.contactInfo.emailAddress).toBe('john@example.com');
  });
});