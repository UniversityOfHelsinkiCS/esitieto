const {
  userMiddleware,
  mockHeaders
} = require('./user');

// Mock request and response objects
const createMockReq = (headers) => ({ headers });
const createMockRes = () => ({});
const createMockNext = () => jest.fn();

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

describe('userMiddleware', () => {
  test('should set req.kirjauduttu to false if uid is missing', async () => {
    const req = createMockReq({});
    const res = createMockRes();
    const next = createMockNext();

    await userMiddleware(req, res, next);

    expect(req.kirjauduttu).toBe(false);
    expect(next).toHaveBeenCalled();
  });

  test('should set req.kirjauduttu to false if email is invalid', async () => {
    const req = createMockReq({ ...mockHeaders, mail: 'mock@helsinki.gi' });
    const res = createMockRes();
    const next = createMockNext();

    await userMiddleware(req, res, next);

    expect(req.kirjauduttu).toBe(false);
    expect(next).toHaveBeenCalled();
  });

  test('should set req.kirjauduttu to true and create user object if headers are valid', async () => {
    const req = createMockReq(mockHeaders);
    const res = createMockRes();
    const next = createMockNext();

    await userMiddleware(req, res, next);

    expect(req.kirjauduttu).toBe(true);
    expect(req.user).toEqual({
      id: 'hy-hlo-123456789',
      username: 'testUser',
      email: 'address@helsinki.fi',
      language: 'fi',
      iamGroups: ['grp-toska', 'hy-employees'],
      isAdmin: true,
    });
    expect(next).toHaveBeenCalled();
  });
});
