![npm version](https://img.shields.io/npm/v/deeply-convert-keys)
![npm downloads](https://img.shields.io/npm/dm/deeply-convert-keys)

# deeply-convert-keys

> Recursively convert object keys between camelCase, snake_case, kebab-case, PascalCase, and more!

A powerful and flexible TypeScript utility to recursively convert all object keys between different naming conventions. Perfect for transforming API responses, database results, or any JSON data between different case styles.

## ✨ Features

- 🔄 **8 Case Styles**: camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, dot.case, path/case, Train-Case
- 🎯 **Deep Conversion**: Recursively transforms nested objects and arrays
- 📦 **TypeScript Support**: Full type safety with generics
- 🚀 **Zero Dependencies**: Lightweight and fast
- 🛠️ **Flexible API**: Use the main function or convenient helpers
- 💪 **Smart Detection**: Automatically detects and converts between any case style

## 📦 Installation

```bash
npm install deeply-convert-keys
```

or

```bash
yarn add deeply-convert-keys
```

or

```bash
pnpm add deeply-convert-keys
```

## 🚀 Quick Start

```typescript
import { deeplyConvertKeys, CaseStyle } from 'deeply-convert-keys';

const apiResponse = {
  user_name: 'John Doe',
  created_at: '2024-01-01',
  contact_info: {
    email_address: 'john@example.com',
    phone_number: '555-1234'
  }
};

// Convert to camelCase using the enum (recommended)
const camelCased = deeplyConvertKeys(apiResponse, CaseStyle.CamelCase);
console.log(camelCased);
// {
//   userName: 'John Doe',
//   createdAt: '2024-01-01',
//   contactInfo: {
//     emailAddress: 'john@example.com',
//     phoneNumber: '555-1234'
//   }
// }

// Convert to kebab-case
const kebabCased = deeplyConvertKeys(apiResponse, CaseStyle.KebabCase);
// {
//   'user-name': 'John Doe',
//   'created-at': '2024-01-01',
//   'contact-info': {
//     'email-address': 'john@example.com',
//     'phone-number': '555-1234'
//   }
// }

// String literals are also supported for backward compatibility
const snakeCased = deeplyConvertKeys(apiResponse, 'snake_case');
```

## 📖 API Reference

### CaseStyle Enum

```typescript
enum CaseStyle {
  CamelCase = 'camelCase',
  SnakeCase = 'snake_case',
  KebabCase = 'kebab-case',
  PascalCase = 'PascalCase',
  ConstantCase = 'CONSTANT_CASE',
  DotCase = 'dot.case',
  PathCase = 'path/case',
  TrainCase = 'Train-Case'
}
```

### Main Function

#### `deeplyConvertKeys<T>(obj: unknown, caseStyle: CaseStyle | string): T`

Recursively converts all keys in an object to the specified case style.

**Parameters:**
- `obj` - The object to convert (can be any value)
- `caseStyle` - The target case style (CaseStyle enum value or string literal)

**Returns:** A new object with all keys converted to the specified case style

**Example:**
```typescript
import { deeplyConvertKeys, CaseStyle } from 'deeply-convert-keys';

// Using enum (recommended for better type safety and autocomplete)
const result = deeplyConvertKeys(data, CaseStyle.CamelCase);

// Using string literal (backward compatible)
const result2 = deeplyConvertKeys(data, 'camelCase');
```

### Convenience Functions

For common use cases, you can use these pre-configured functions:

```typescript
import {
  deepCamelCaseKeys,    // Convert to camelCase
  deepSnakeCaseKeys,    // Convert to snake_case
  deepKebabCaseKeys,    // Convert to kebab-case
  deepPascalCaseKeys,   // Convert to PascalCase
  deepConstantCaseKeys, // Convert to CONSTANT_CASE
  deepDotCaseKeys,      // Convert to dot.case
  deepPathCaseKeys,     // Convert to path/case
  deepTrainCaseKeys     // Convert to Train-Case
} from 'deeply-convert-keys';

// Use directly without specifying case style
const result = deepCamelCaseKeys(myObject);
```

### Individual String Converters

Convert individual strings between case styles:

```typescript
import {
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
  toConstantCase,
  toDotCase,
  toPathCase,
  toTrainCase,
  convertCase
} from 'deeply-convert-keys';

toCamelCase('hello_world');     // 'helloWorld'
toSnakeCase('helloWorld');      // 'hello_world'
toKebabCase('hello_world');     // 'hello-world'
toPascalCase('hello-world');    // 'HelloWorld'
toConstantCase('helloWorld');   // 'HELLO_WORLD'
toDotCase('hello_world');       // 'hello.world'
toPathCase('hello_world');      // 'hello/world'
toTrainCase('hello_world');     // 'Hello-World'

// Or use the generic converter with enum
convertCase('hello_world', CaseStyle.CamelCase); // 'helloWorld'

// String literals also work
convertCase('hello_world', 'camelCase'); // 'helloWorld'
```

## 🎨 Supported Case Styles

| Style | Example | Common Use Cases |
|-------|---------|------------------|
| `camelCase` | `helloWorld` | JavaScript/TypeScript, JSON |
| `snake_case` | `hello_world` | Python, Ruby, Rust, Database |
| `kebab-case` | `hello-world` | URLs, HTML/CSS, Lisp |
| `PascalCase` | `HelloWorld` | C#, Classes, Components |
| `CONSTANT_CASE` | `HELLO_WORLD` | Constants, Environment Variables |
| `dot.case` | `hello.world` | Configuration, Namespaces |
| `path/case` | `hello/world` | File Paths, Routes |
| `Train-Case` | `Hello-World` | HTTP Headers |

## 💡 Use Cases

### API Response Transformation

```typescript
// Transform snake_case API responses to camelCase for your frontend
async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  // Convert from snake_case to camelCase
  return deepCamelCaseKeys(data);
}
```

### Database to Frontend

```typescript
// Convert database snake_case to frontend camelCase
const dbUser = {
  user_id: 123,
  first_name: 'John',
  last_name: 'Doe',
  created_at: new Date()
};

const frontendUser = deepCamelCaseKeys(dbUser);
// { userId: 123, firstName: 'John', lastName: 'Doe', createdAt: Date }
```

### Configuration Files

```typescript
// Convert between different configuration formats
const envConfig = {
  DATABASE_HOST: 'localhost',
  DATABASE_PORT: 5432,
  API_KEY: 'secret'
};

const appConfig = deepCamelCaseKeys(envConfig);
// { databaseHost: 'localhost', databasePort: 5432, apiKey: 'secret' }
```

### GraphQL to REST

```typescript
// Convert PascalCase GraphQL types to snake_case REST API
const graphQLData = {
  UserProfile: {
    FirstName: 'Jane',
    LastName: 'Smith',
    EmailAddress: 'jane@example.com'
  }
};

const restData = deepSnakeCaseKeys(graphQLData);
// { user_profile: { first_name: 'Jane', last_name: 'Smith', email_address: 'jane@example.com' } }
```

## 🔥 Advanced Examples

### Handling Mixed Input

```typescript
const mixedData = {
  'user-id': 1,
  firstName: 'John',
  'last_name': 'Doe',
  'CONSTANT_VALUE': 100,
  nested_object: {
    'kebab-key': 'value',
    PascalKey: 'value',
    snake_key: 'value'
  }
};

// Normalize everything to camelCase
const normalized = deepCamelCaseKeys(mixedData);
```

### Working with Arrays

```typescript
const data = {
  user_list: [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Jane', last_name: 'Smith' }
  ],
  tag_names: ['important', 'urgent']
};

const converted = deepCamelCaseKeys(data);
// {
//   userList: [
//     { firstName: 'John', lastName: 'Doe' },
//     { firstName: 'Jane', lastName: 'Smith' }
//   ],
//   tagNames: ['important', 'urgent']
// }
```

### Type Safety with TypeScript

```typescript
interface User {
  userId: number;
  userName: string;
  emailAddress: string;
}

// Type-safe conversion
const rawData = {
  user_id: 1,
  user_name: 'John',
  email_address: 'john@example.com'
};

const typedUser = deeplyConvertKeys<User>(rawData, 'camelCase');
// typedUser is properly typed as User
```

### Preserving Non-Plain Objects

```typescript
const data = {
  created_at: new Date(),
  user_regex: /[a-z]+/,
  buffer_data: Buffer.from('hello'),
  normal_key: 'value'
};

const converted = deepCamelCaseKeys(data);
// Date, RegExp, and Buffer instances are preserved
// Only plain object keys are converted
```

## ⚡ Performance

- **Zero dependencies** - No bloat, just pure TypeScript/JavaScript
- **Efficient recursion** - Handles deeply nested structures
- **Smart type checking** - Only processes plain objects
- **Preserves references** - Non-plain objects are passed through unchanged

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT

## 🔗 Links

- [GitHub Repository](https://github.com/agoodkind/deeply-convert-keys)
- [NPM Package](https://www.npmjs.com/package/deeply-convert-keys)
- [Report Issues](https://github.com/agoodkind/deeply-convert-keys/issues)