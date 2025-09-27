// Example usage of deeply-convert-keys
// Run with: node examples/basic-usage.js

// Note: In a real project, you would use:
// import { deeplyConvertKeys, CaseStyle } from 'deeply-convert-keys';
// For this example, we'll import from the dist folder
import { 
  CaseStyle,
  deeplyConvertKeys,
  deepCamelCaseKeys,
  deepSnakeCaseKeys,
  deepKebabCaseKeys,
  deepPascalCaseKeys,
  deepConstantCaseKeys,
  toCamelCase,
  toSnakeCase,
  toKebabCase
} from '../dist/index.js';

console.log('=================================');
console.log('   deeply-convert-keys Examples  ');
console.log('=================================\n');

// Example 1: Basic conversion between different case styles
console.log('📝 Example 1: Basic Case Conversions');
console.log('=====================================\n');

const apiResponse = {
  user_id: 1,
  user_name: 'John Doe',
  email_address: 'john@example.com',
  is_active: true,
  created_at: '2024-01-01'
};

console.log('Original (snake_case):');
console.log(JSON.stringify(apiResponse, null, 2));

console.log('\n→ Converted to camelCase (using enum):');
const camelCased = deeplyConvertKeys(apiResponse, CaseStyle.CamelCase);
console.log(JSON.stringify(camelCased, null, 2));

console.log('\n→ Converted to kebab-case (using enum):');
const kebabCased = deeplyConvertKeys(apiResponse, CaseStyle.KebabCase);
console.log(JSON.stringify(kebabCased, null, 2));

console.log('\n→ Converted to PascalCase (using string literal):');
const pascalCased = deeplyConvertKeys(apiResponse, 'PascalCase');
console.log(JSON.stringify(pascalCased, null, 2));

console.log('\n→ Converted to CONSTANT_CASE (using enum):');
const constantCased = deeplyConvertKeys(apiResponse, CaseStyle.ConstantCase);
console.log(JSON.stringify(constantCased, null, 2));

// Example 2: Nested object conversion
console.log('\n📝 Example 2: Nested Objects');
console.log('============================\n');

const nestedData = {
  user_profile: {
    first_name: 'Jane',
    last_name: 'Smith',
    contact_info: {
      phone_number: '555-1234',
      email_address: 'jane@example.com',
      mailing_address: {
        street_address: '123 Main St',
        city_name: 'New York',
        postal_code: '10001',
        country_code: 'US'
      }
    },
    preferences: {
      notification_settings: {
        email_alerts: true,
        sms_alerts: false,
        push_notifications: true
      }
    }
  }
};

console.log('Nested object converted to camelCase:');
const nestedCamel = deepCamelCaseKeys(nestedData);
console.log(JSON.stringify(nestedCamel, null, 2));

// Example 3: Arrays of objects
console.log('\n📝 Example 3: Arrays of Objects');
console.log('================================\n');

const userList = {
  total_count: 3,
  page_number: 1,
  user_list: [
    { user_id: 1, user_name: 'Alice', is_admin: true, join_date: '2023-01-15' },
    { user_id: 2, user_name: 'Bob', is_admin: false, join_date: '2023-03-22' },
    { user_id: 3, user_name: 'Charlie', is_admin: false, join_date: '2023-06-10' }
  ],
  metadata: {
    query_time: '0.025s',
    server_version: '2.1.0'
  }
};

console.log('Array data converted to camelCase:');
const listCamel = deepCamelCaseKeys(userList);
console.log(JSON.stringify(listCamel, null, 2));

// Example 4: Mixed input formats
console.log('\n📝 Example 4: Mixed Input Formats');
console.log('==================================\n');

const mixedFormats = {
  'kebab-case-key': 'value1',
  snake_case_key: 'value2',
  camelCaseKey: 'value3',
  PascalCaseKey: 'value4',
  'CONSTANT_KEY': 'value5',
  'dot.case.key': 'value6',
  'mixed-snake_case': 'value7',
  'deeply-nested_object': {
    'sub-key_one': 'nested1',
    PascalSubKey: 'nested2',
    another_level: {
      'final-key': 'deep',
      CONSTANT_VALUE: 42
    }
  }
};

console.log('Mixed formats normalized to snake_case:');
const mixedSnake = deepSnakeCaseKeys(mixedFormats);
console.log(JSON.stringify(mixedSnake, null, 2));

// Example 5: String conversion utilities
console.log('\n📝 Example 5: String Conversion Utilities');
console.log('==========================================\n');

const testString = 'hello_world_example';

console.log(`Original: "${testString}"`);
console.log(`camelCase: "${toCamelCase(testString)}"`);
console.log(`snake_case: "${toSnakeCase('helloWorldExample')}"`);
console.log(`kebab-case: "${toKebabCase(testString)}"`);

// Example 6: Real-world use case - API to Frontend
console.log('\n📝 Example 6: API Response to Frontend');
console.log('========================================\n');

// Simulating a typical API response
const apiData = {
  status_code: 200,
  response_data: {
    user_details: {
      user_id: 'usr_123',
      full_name: 'John Smith',
      account_type: 'premium',
      subscription_info: {
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        auto_renew: true,
        payment_method: {
          card_type: 'visa',
          last_four_digits: '1234'
        }
      },
      activity_log: [
        { action_type: 'login', timestamp: '2024-03-15T10:30:00Z' },
        { action_type: 'purchase', timestamp: '2024-03-15T10:35:00Z' },
        { action_type: 'logout', timestamp: '2024-03-15T11:00:00Z' }
      ]
    },
    server_timestamp: '2024-03-15T12:00:00Z'
  }
};

console.log('API Response (snake_case):');
console.log(JSON.stringify(apiData, null, 2));

console.log('\n→ Transformed for Frontend (camelCase):');
const frontendData = deepCamelCaseKeys(apiData);
console.log(JSON.stringify(frontendData, null, 2));

// Example 7: Environment variables to config
console.log('\n📝 Example 7: Environment Variables to Config');
console.log('==============================================\n');

const envVars = {
  DATABASE_HOST: 'localhost',
  DATABASE_PORT: 5432,
  DATABASE_NAME: 'myapp_db',
  API_KEY: 'secret_key_123',
  MAX_CONNECTIONS: 100,
  ENABLE_DEBUG_MODE: false,
  LOG_LEVEL: 'info'
};

console.log('Environment Variables (CONSTANT_CASE):');
console.log(JSON.stringify(envVars, null, 2));

console.log('\n→ Converted to Config Object (camelCase):');
const configObject = deepCamelCaseKeys(envVars);
console.log(JSON.stringify(configObject, null, 2));

// Example 8: Using convenience functions
console.log('\n📝 Example 8: Convenience Functions');
console.log('====================================\n');

const sampleData = {
  test_key: 'value',
  another_key: {
    nested_key: 'nested_value'
  }
};

console.log('Using convenience functions:');
console.log('\ndeepKebabCaseKeys:');
console.log(JSON.stringify(deepKebabCaseKeys(sampleData), null, 2));

console.log('\ndeepPascalCaseKeys:');
console.log(JSON.stringify(deepPascalCaseKeys(sampleData), null, 2));

console.log('\ndeepConstantCaseKeys:');
console.log(JSON.stringify(deepConstantCaseKeys(sampleData), null, 2));

console.log('\n✅ All examples completed successfully!');
console.log('=====================================');