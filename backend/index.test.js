jest.mock('./interfaces/koriInterface');

const request = require('supertest');
const app = require('./index'); 



describe('Test Routes', () => {
  test('Kori Info Responds with course description', async () => {
    const response = await request(app).get('/api/kori/get_info_by_name/').query({q : "haku"});
    expect(response.text).toBe("{\"kurssi\":\"tkt10002\",\"nimi\":\"ohjelmoinnin perusteet\"}");
  });
  test('Kori search Responds with courses', async () => {
    const response = await request(app).get('/api/kori/getKori/');
    expect(response.text).toBe("{\"kurssi1\":\"tkt10002\",\"kurssi2\":\"tkt10003\",\"kurssi3\":\"tkt10004\"}");
  });
});