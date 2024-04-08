jest.mock('pg', () => {
  const mockQuery = jest.fn();
  return {
    Pool: jest.fn(() => ({
      query: mockQuery.mockResolvedValueOnce({ rows: [{ id: 1, kori_id: 'CS101', course_name: 'Intro to CS', hy_course_id: 'IntroCS101' }], rowCount: 1 }),
    })),
  };
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

  /*
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
  */

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
      const mockCourses = [
        { 
          official_course_id: 'CS101',
          course_name: 'Intro to CS', 
          kori_name: 'IntroCS101'
        }
      ];

      require('pg').Pool().query.mockResolvedValueOnce({ rows: mockCourses, rowCount: mockCourses.length });
  
      const result = await db.getCourses();
  
      expect(result).toEqual(mockCourses);
      expect(require('pg').Pool().query).toHaveBeenCalledTimes(1);
    });
  });
  
  // --- Prerequisites ---

  describe('addPrerequisiteCourse', () => {
    it('should insert a prerequisite course relation into the database and return the inserted relation', async () => {
      const mockRelation = { course_kori_name: 'AdvCS102', prerequisite_course_kori_name: 'IntroCS101' };
      require('pg').Pool().query.mockResolvedValueOnce({ rows: [mockRelation], rowCount: 1 });
  
      await db.addPrerequisiteCourse(mockRelation.course_kori_name, mockRelation.prerequisite_course_kori_name);
      
      // Normalize the SQL query for comparison
      const expectedSql = normalizeSql(`
        INSERT INTO prerequisite_courses (course_id, prerequisite_course_id)
        SELECT c1.id, c2.id
        FROM (SELECT id FROM courses WHERE hy_course_id = $1) AS c1,
             (SELECT id FROM courses WHERE hy_course_id = $2) AS c2
        ON CONFLICT ON CONSTRAINT unique_course_prerequisite DO NOTHING
        RETURNING *
      `);
      const actualSql = normalizeSql(require('pg').Pool().query.mock.calls[0][0]);
  
      expect(actualSql).toEqual(expectedSql);
      expect(require('pg').Pool().query.mock.calls[0][1]).toEqual([mockRelation.course_kori_name, mockRelation.prerequisite_course_kori_name]);
    });
  });

  describe('removePrerequisiteCourse', () => {
    it('should remove a prerequisite course relation from the database', async () => {
      require('pg').Pool().query.mockResolvedValueOnce({ rowCount: 1 });
  
      const course_hy_id = 'AdvCS102';
      const prerequisite_course_hy_id = 'IntroCS101';
      await db.removePrerequisiteCourse(course_hy_id, prerequisite_course_hy_id);
      
      const expectedSql = normalizeSql(`DELETE FROM prerequisite_courses WHERE course_id = (SELECT id FROM courses WHERE courses.hy_course_id = $1) AND prerequisite_course_id = (SELECT id FROM courses WHERE courses.hy_course_id = $2)`);
      const actualSql = normalizeSql(require('pg').Pool().query.mock.calls[0][0]);
  
      expect(actualSql).toEqual(expectedSql);
      expect(require('pg').Pool().query.mock.calls[0][1]).toEqual([course_hy_id, prerequisite_course_hy_id]);
    });
  });
});

// Generated by chatGPT, helper function used to deal with whitespace in SQL queries
// A utility function to normalize SQL queries by compressing all whitespace down to single spaces
const normalizeSql = (sql) => sql.replace(/\s+/g, ' ').trim();