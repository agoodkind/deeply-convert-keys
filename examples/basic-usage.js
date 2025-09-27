// Example usage of deep-camel-case-keys
// Run with: node examples/basic-usage.js

// Note: In a real project, you would use:
// const { deepCamelCaseKeys } = require('deep-camel-case-keys');
// For this example, we'll import from the source
import { deepCamelCaseKeys } from '../dist';

// Example 1: Simple object transformation
console.log('Example 1: Simple object transformation');
console.log('========================================');

const apiResponse = {
  user_id: 1,
  user_name: 'John Doe',
  email_address: 'john@example.com',
  created_at: '2024-01-01',
  is_active: true
};

const camelCased = deepCamelCaseKeys(apiResponse);
console.log('Original:', JSON.stringify(apiResponse, null, 2));
console.log('Converted:', JSON.stringify(camelCased, null, 2));

// Example 2: Nested objects
console.log('\nExample 2: Nested objects');
console.log('=========================');

const nestedData = {
  user_profile: {
    first_name: 'John',
    last_name: 'Doe',
    contact_info: {
      phone_number: '555-1234',
      email_address: 'john@example.com',
      mailing_address: {
        street_address: '123 Main St',
        city_name: 'New York',
        zip_code: '10001'
      }
    }
  }
};

const nestedConverted = deepCamelCaseKeys(nestedData);
console.log('Converted nested:', JSON.stringify(nestedConverted, null, 2));

// Example 3: Arrays of objects
console.log('\nExample 3: Arrays of objects');
console.log('============================');

const userList = {
  total_count: 3,
  page_number: 1,
  user_list: [
    { user_id: 1, user_name: 'Alice', is_admin: true },
    { user_id: 2, user_name: 'Bob', is_admin: false },
    { user_id: 3, user_name: 'Charlie', is_admin: false }
  ]
};

const listConverted = deepCamelCaseKeys(userList);
console.log('Converted list:', JSON.stringify(listConverted, null, 2));

// Example 4: Mixed case formats
console.log('\nExample 4: Mixed case formats');
console.log('=============================');

const mixedFormats = {
  'kebab-case-key': 'value1',
  snake_case_key: 'value2',
  'mixed-snake_case': 'value3',
  alreadyCamelCase: 'value4',
  'deeply-nested_object': {
    'sub-key_one': 'nested1',
    another_level: {
      'final-key': 'deep'
    }
  }
};

const mixedConverted = deepCamelCaseKeys(mixedFormats);
console.log('Mixed formats converted:', JSON.stringify(mixedConverted, null, 2));

// Example 5: API response transformation
console.log('\nExample 5: Simulated API response');
console.log('=================================');

// Simulate an API response
function fetchUserData() {
  // This would normally be an API call
  return {
    status_code: 200,
    response_data: {
      user_details: {
        user_id: 'usr_123',
        full_name: 'Jane Smith',
        account_type: 'premium',
        subscription_info: {
          start_date: '2024-01-01',
          end_date: '2024-12-31',
          auto_renew: true
        }
      },
      last_login_time: '2024-03-15T10:30:00Z',
      access_tokens: ['token_1', 'token_2']
    }
  };
}

const apiData = fetchUserData();
const transformedData = deepCamelCaseKeys(apiData);

console.log('API Response (transformed):', JSON.stringify(transformedData, null, 2));

console.log('\n✅ All examples completed successfully!');
