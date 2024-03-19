const { Pool } = jest.requireActual('pg');

jest.mock('pg', () => {
  const mockQuery = jest.fn().mockResolvedValue({ rows: [], rowCount: 0 });
  return { Pool: jest.fn(() => ({ query: mockQuery })) };
});

const db = require('./index');

describe('Database operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Courses ---

  describe('addCourse', () => {
    it('should insert a course into the database and return the inserted course', async () => {
      const mockCourse = { official_course_id: 'CS101', course_name: 'Intro to CS', kori_name: 'IntroCS101' };
      require('pg').Pool().query.mockResolvedValueOnce({ rows: [mockCourse], rowCount: 1 });

      const result = await db.addCourse(mockCourse.official_course_id, mockCourse.course_name, mockCourse.kori_name);

      expect(result).toEqual(mockCourse);
      expect(require('pg').Pool().query).toHaveBeenCalledWith(
        'INSERT INTO course_info (official_course_id, course_name, kori_name) VALUES ($1, $2, $3) RETURNING *',
        [mockCourse.official_course_id, mockCourse.course_name, mockCourse.kori_name]
      );
    });
  });

  describe('updateCourse', () => {
    it('should update a course in the database and return the updated course', async () => {
      const mockCourse = { id: 1, official_course_id: 'CS102', course_name: 'Advanced CS', kori_name: 'AdvCS102' };
      require('pg').Pool().query.mockResolvedValueOnce({ rows: [mockCourse], rowCount: 1 });
  
      const result = await db.updateCourse(mockCourse.id, mockCourse.official_course_id, mockCourse.course_name, mockCourse.kori_name);
  
      expect(result).toEqual(mockCourse);
      expect(require('pg').Pool().query).toHaveBeenCalledWith(
        'UPDATE course_info SET official_course_id = $2, course_name = $3, kori_name = $4 WHERE id = $1 RETURNING *',
        [mockCourse.id, mockCourse.official_course_id, mockCourse.course_name, mockCourse.kori_name]
      );
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course from the database and return the rowCount', async () => {
      require('pg').Pool().query.mockResolvedValueOnce({ rowCount: 1 });
  
      const kori_name = 'IntroCS101';
      const result = await db.deleteCourse(kori_name);
  
      expect(result).toBe(1);
      expect(require('pg').Pool().query).toHaveBeenCalledWith(
        'DELETE FROM course_info WHERE kori_name = $1 RETURNING *',
        [kori_name]
      );
    });
  });

  describe('getCourses', () => {
    it('should retrieve all courses from the database', async () => {
      const mockCourses = [{ id: 1, official_course_id: 'CS101', course_name: 'Intro to CS', kori_name: 'IntroCS101' }];
      require('pg').Pool().query.mockResolvedValueOnce({ rows: mockCourses, rowCount: mockCourses.length });
  
      const result = await db.getCourses();
  
      expect(result).toEqual(mockCourses);
      expect(require('pg').Pool().query).toHaveBeenCalledWith('SELECT * FROM course_info');
    });
  });
  
  // --- Prerequisites ---

  describe('addPrerequisiteCourse', () => {
    it('should insert a prerequisite course relation into the database and return the inserted relation', async () => {
      const mockRelation = { course_kori_name: 'AdvCS102', prerequisite_course_kori_name: 'IntroCS101' };
      require('pg').Pool().query.mockResolvedValueOnce({ rows: [mockRelation], rowCount: 1 });
  
      const result = await db.addPrerequisiteCourse(mockRelation.course_kori_name, mockRelation.prerequisite_course_kori_name);
  
      expect(result).toEqual(mockRelation);
      expect(require('pg').Pool().query).toHaveBeenCalledWith(
        `INSERT INTO prerequisite_course_relation (course_kori_name, prerequisite_course_kori_name)
     VALUES ($1, $2) RETURNING *`,
        [mockRelation.course_kori_name, mockRelation.prerequisite_course_kori_name]
      );
    });
  });
  
  describe('removePrerequisiteCourse', () => {
    it('should remove a prerequisite course relation from the database', async () => {
      require('pg').Pool().query.mockResolvedValueOnce({ rowCount: 1 });
  
      const course_kori_name = 'AdvCS102';
      const prerequisite_course_kori_name = 'IntroCS101';
      await db.removePrerequisiteCourse(course_kori_name, prerequisite_course_kori_name);
  
      expect(require('pg').Pool().query).toHaveBeenCalledWith(
        `DELETE FROM prerequisite_course_relation
     WHERE course_kori_name = $1 AND prerequisite_course_kori_name = $2`,
        [course_kori_name, prerequisite_course_kori_name]
      );
    });
  });
});
