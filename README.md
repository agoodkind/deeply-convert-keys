# deep-camel-case-keys

> Recursively convert object keys to camelCase

A lightweight TypeScript utility to recursively convert all object keys to camelCase. Perfect for transforming API responses from snake_case or kebab-case to camelCase.

## Installation

```bash
npm install deep-camel-case-keys
```

or

```bash
yarn add deep-camel-case-keys
```

## Usage

```typescript
import { deepCamelCaseKeys } from 'deep-camel-case-keys';
// or
import deepCamelCaseKeys from 'deep-camel-case-keys';

const apiResponse = {
  user_name: 'John Doe',
  user_age: 30,
  'contact-info': {
    email_address: 'john@example.com',
    phone_number: '555-1234',
    'home-address': {
      street_name: 'Main St',
      'house-number': 123
    }
  },
  favorite_colors: ['red', 'blue', 'green']
};

const camelCased = deepCamelCaseKeys(apiResponse);

console.log(camelCased);
// Output:
// {
//   userName: 'John Doe',
//   userAge: 30,
//   contactInfo: {
//     emailAddress: 'john@example.com',
//     phoneNumber: '555-1234',
//     homeAddress: {
//       streetName: 'Main St',
//       houseNumber: 123
//     }
//   },
//   favoriteColors: ['red', 'blue', 'green']
// }
```

## Features

- 🔄 Recursively converts all nested object keys
- 📦 Handles arrays of objects
- 🎯 Type-safe with TypeScript generics
- 🚀 Zero dependencies
- 💪 Preserves non-object values (primitives, dates, etc.)
- 🔧 Converts both snake_case and kebab-case to camelCase

## API

### `deepCamelCaseKeys<T>(obj: unknown): T`

Recursively converts all keys in an object to camelCase.

#### Parameters

- `obj` - The object to convert. Can be any value (object, array, primitive, null, etc.)

#### Returns

Returns a new object with all keys converted to camelCase. The original object is not modified.

#### Type Safety

The function uses TypeScript generics to preserve the type structure of your data:

```typescript
interface UserData {
  userName: string;
  userAge: number;
  contactInfo: {
    emailAddress: string;
  };
}

const rawData = {
  user_name: 'John',
  user_age: 30,
  contact_info: {
    email_address: 'john@example.com'
  }
};

const typedData = deepCamelCaseKeys<UserData>(rawData);
// typedData is now properly typed as UserData
```

## Examples

### Working with API Responses

```typescript
import { deepCamelCaseKeys } from 'deep-camel-case-keys';

async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  // Convert snake_case API response to camelCase
  return deepCamelCaseKeys(data);
}
```

### Handling Arrays

```typescript
const data = {
  user_list: [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Jane', last_name: 'Smith' }
  ]
};

const result = deepCamelCaseKeys(data);
// Result:
// {
//   userList: [
//     { firstName: 'John', lastName: 'Doe' },
//     { firstName: 'Jane', lastName: 'Smith' }
//   ]
// }
```

### Mixed Case Conversion

```typescript
const mixed = {
  'kebab-case-key': 'value1',
  snake_case_key: 'value2',
  'mixed-snake_case': 'value3',
  alreadyCamelCase: 'value4'
};

const result = deepCamelCaseKeys(mixed);
// Result:
// {
//   kebabCaseKey: 'value1',
//   snakeCaseKey: 'value2',
//   mixedSnakeCase: 'value3',
//   alreadyCamelCase: 'value4'
// }
```

## License

MIT

## Issues

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/agoodkind/deep-camel-case-keys/issues).
