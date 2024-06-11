import preprocessContent from './preprocessContent';

describe('preprocessContent', () => {
  test('replaces <br> and <p> tags with newlines', () => {
    const input = 'Hello<br>World<p>This is a test</p>';
    const expectedOutput = 'Hello\nWorld\nThis is a test\n';
    expect(preprocessContent(input)).toBe(expectedOutput);
  });

  test('removes all HTML tags', () => {
    const input = '<div>Hello</div> <span>World</span>';
    const expectedOutput = 'Hello World';
    expect(preprocessContent(input)).toBe(expectedOutput);
  });

  test('replaces multiple consecutive newlines with two newlines', () => {
    const input = 'Hello\n\n\nWorld\n\n\nThis is a test\n\n\n';
    const expectedOutput = 'Hello\n\nWorld\n\nThis is a test\n\n';
    expect(preprocessContent(input)).toBe(expectedOutput);
  });

  test('removes surrounding quotes', () => {
    const input = '"Hello World"';
    const expectedOutput = 'Hello World';
    expect(preprocessContent(input)).toBe(expectedOutput);
  });
  
  test('returns an empty string when input is an empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(preprocessContent(input)).toBe(expectedOutput);
  });

  test('handles input with only HTML tags correctly', () => {
    const input = '<p><br><div></div><span></span></p>';
    const expectedOutput = '\n\n';
    expect(preprocessContent(input)).toBe(expectedOutput);
  });
});
