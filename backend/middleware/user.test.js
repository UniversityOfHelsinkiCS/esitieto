// Mock process.env.NODE_ENV
beforeEach(() => {
  process.env.NODE_ENV = 'production';
});

describe('parseIamGroups', () => {
  const { parseIamGroups } = require('./user'); 

  test('should parse iamGroups correctly', () => {
    const iamGroups = 'grp-toska;hy-employees';
    const result = parseIamGroups(iamGroups);
    expect(result).toEqual(['grp-toska', 'hy-employees']);
  });

  test('should return an empty array for empty string', () => {
    const iamGroups = '';
    const result = parseIamGroups(iamGroups);
    expect(result).toEqual([]);
  });

  test('should return an empty array for null or undefined', () => {
    expect(parseIamGroups(null)).toEqual([]);
    expect(parseIamGroups(undefined)).toEqual([]);
  });
});

describe('checkAdmin', () => {
  const { checkAdmin } = require('./user'); 

  test('should return true if user is admin', () => {
    const iamGroups = ['grp-toska', 'hy-employees'];
    const result = checkAdmin(iamGroups);
    expect(result).toBe(true);
  });

  test('should return false if user is not admin', () => {
    const iamGroups = ['hy-employees'];
    const result = checkAdmin(iamGroups);
    expect(result).toBe(false);
  });
});

describe('validateHelsinkiEmail', () => {
  const { validateHelsinkiEmail } = require('./user'); 

  test('should return true for valid Helsinki email', () => {
    const email = 'test@helsinki.fi';
    const result = validateHelsinkiEmail(email);
    expect(result).toBe(true);
  });

  test('should return false for invalid Helsinki email', () => {
    const email = 'test@gmail.com';
    const result = validateHelsinkiEmail(email);
    expect(result).toBe(false);
  });

  test('should return false for email without domain', () => {
    const email = 'test@helsinki';
    const result = validateHelsinkiEmail(email);
    expect(result).toBe(false);
  });
});
