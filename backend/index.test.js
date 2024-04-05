jest.mock('./interfaces/koriInterface');
const request = require('supertest');

const app = require('./index'); 



describe('Test Routes', () => {
  test('Kori Info Responds with course description', async () => {
    const response = await request(app).get('/api/kori/get_info_by_name/').query({search : "TKT10003"});
    expect(response.text).toBe("{\"id\":\"otm-eb0cf926-57aa-4c8e-9ddc-8b6611930674\",\"code\":\"TKT10003\",\"name\":\"Ohjelmoinnin jatkokurssi\",\"groupId\":\"hy-CU-118023947\",\"curriculumPeriodIds\":[\"hy-lv-74\"]}");
  });
  test('Kori search Responds with courses', async () => {
    const response = await request(app).get('/api/kori/getKori/').query({search : "TKT10003"});
    expect(response.text).toBe("\"{\\n  \\\"searchResults\\\": [\\n    {\\n      \\\"id\\\": \\\"otm-eb0cf926-57aa-4c8e-9ddc-8b6611930674\\\",\\n      \\\"code\\\": \\\"TKT10003\\\",\\n      \\\"name\\\": \\\"Ohjelmoinnin jatkokurssi\\\",\\n      \\\"groupId\\\": \\\"hy-CU-118023947\\\",\\n      \\\"curriculumPeriodIds\\\": [\\n        \\\"hy-lv-74\\\"\\n      ]\\n    },\\n    {\\n      \\\"id\\\": \\\"otm-6dd390bf-1710-436e-bebb-a6f4e5032b9e\\\",\\n      \\\"code\\\": \\\"TKT100031\\\",\\n      \\\"name\\\": \\\"Ohjelmoinnin jatkokurssi, lisäosa (Python)\\\",\\n      \\\"groupId\\\": \\\"hy-CU-137766069\\\",\\n      \\\"curriculumPeriodIds\\\": [\\n        \\\"hy-lv-74\\\",\\n        \\\"hy-lv-75\\\",\\n        \\\"hy-lv-76\\\"\\n      ]\\n    }\\n  ]\\n}\"");
  });
});