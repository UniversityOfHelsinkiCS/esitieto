const { 
  parseIamGroups,
  validateHelsinkiEmail,
  areHeadersValid,
  createUser,
  checkAdmin,
  userMiddleware,
  mockHeaders,
} = require('./user');

// Mock process.env.NODE_ENV
beforeEach(() => {
  process.env.NODE_ENV = 'production';
});

describe('parseIamGroups', () => {
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
  test('should return true for valid Helsinki email', () => {
    const email = 'test@helsinki.fi';
    const result = validateHelsinkiEmail(email);
    expect(result).toBe(true);
  });

  test('should return false for invalid Helsinki email', () => {
    const email = 'test@helsinki.com';
    const result = validateHelsinkiEmail(email);
    expect(result).toBe(false);
  });

  test('should return false for email without domain', () => {
    const email = 'test@helsinki';
    const result = validateHelsinkiEmail(email);
    expect(result).toBe(false);
  });
});

describe('areHeadersValid', () => {
  test('should return true for valid headers', () => {
    const headers = mockHeaders;
    const result = areHeadersValid(headers);
    expect(result).toBe(true);
  });

  test('should return false if uid is missing', () => {
    const headers = { ...mockHeaders, uid: undefined };
    const result = areHeadersValid(headers);
    expect(result).toBe(false);
  });

  test('should return false for invalid email', () => {
    const headers = { ...mockHeaders, mail: 'invalid-email' };
    const result = areHeadersValid(headers);
    expect(result).toBe(false);
  });
});

describe('createUser', () => {
  test('should create user object correctly from headers', () => {
    const headers = mockHeaders;
    const result = createUser(headers);
    expect(result).toEqual({
      id: 'hy-hlo-123456789',
      username: 'testUser',
      email: 'address@helsinki.fi',
      language: 'fi',
      iamGroups: ['grp-toska', 'hy-employees'],
      isAdmin: true,
    });
  });
});

const createMockReq = (headers) => ({ headers });
const createMockRes = () => ({
  setHeader: jest.fn(),
  getHeader: jest.fn()
});
const createMockNext = () => jest.fn();

describe('userMiddleware', () => {
  test('should set req.kirjauduttu to false if uid is missing', async () => {
    const req = createMockReq({});
    const res = createMockRes();
    const next = createMockNext();

    await userMiddleware(req, res, next);

    expect(req.kirjauduttu).toBe(false);
    expect(res.setHeader).toHaveBeenCalledWith('Kirjauduttu', 'false');
    expect(next).toHaveBeenCalled();
  });

  test('should set req.kirjauduttu to false if email is invalid', async () => {
    const req = createMockReq({ ...mockHeaders, mail: 'invalid@helsinki' });
    const res = createMockRes();
    const next = createMockNext();

    await userMiddleware(req, res, next);

    expect(req.kirjauduttu).toBe(false);
    expect(res.setHeader).toHaveBeenCalledWith('Kirjauduttu', 'false');
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
    expect(res.setHeader).toHaveBeenCalledWith('Kirjauduttu', 'true');
    expect(res.setHeader).toHaveBeenCalledWith('User-id', 'testUser');
    expect(next).toHaveBeenCalled();
  });
});
