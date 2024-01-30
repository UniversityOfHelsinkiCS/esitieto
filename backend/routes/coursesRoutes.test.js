const { findCourseWithDependencies } = require('./coursesRoutes');

describe('Course Searching', () => {
  const courses = [
    { name: 'Tietorakenteet ja algoritmit II', identifier: 'Tira2', dependencies: ['Tira1'], type: 'mandatory'},
    { name: 'Tietorakenteet ja algoritmit I', identifier: 'Tira1', dependencies: ['Ohja', 'Jym'], type: 'mandatory'},
    { name: 'Ohjelmistotuotanto Projekti', identifier: 'Ohtupro', dependencies: ['Ohtu']},
    { name: 'Ohjelmistotuotanto', identifier: 'Ohtu', dependencies: ['Tira2'], type: 'mandatory'},
  ];

  it('should find a course and its direct dependencies', () => {
    const result = findCourseWithDependencies('Tira2', courses);

    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({ identifier: 'Tira2' }),
      expect.objectContaining({ identifier: 'Tira1' })
    ]));
  });

  it('should find a course and exclude those that follow it', () => {
    const result = findCourseWithDependencies('Tira1', courses);

    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({ identifier: 'Tira1' })
    ]));

    expect(result).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ identifier: 'Tira2' })
    ]));
  });

  it('should find the correct course when names are similar', () => {
    const result = findCourseWithDependencies('Ohtu', courses);
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({ identifier: 'Ohtu' })
    ]));

    expect(result).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ identifier: 'Ohtupro' })
    ]));
  });
});