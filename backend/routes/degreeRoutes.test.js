jest.mock('../db/index');

const routes = require('./degreesRoutes');
const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());
app.use('/', routes);

describe("Search By Degree", () => {
  const degreecode = 'kh50_005';
  const degreeyears = '2023-2026';
  const courses = [
    {
      "name": "Johdatus yliopistomatematiikkaan",
      "kori_id": "hy-CU-117375151",
      "identifier": "MAT11001",
      "type": "compulsory",
      "x": null,
      "y": null,
      "dependencies": []
    },
    {
      "name": "Tietorakenteet ja algoritmit I",
      "kori_id": "hy-CU-132986295",
      "identifier": "TKT200011",
      "type": "compulsory",
      "x": null,
      "y": null,
      "dependencies": [
          "TKT10003",
          "MAT11001"
      ]
    }
  ];

  it('should find courses by degree', async () => {
    const result = await request(app).get('/search_by_degree')
      .set('degree-id', degreecode)
      .set('degree-years', degreeyears)
    expect(result._body).toEqual(courses);
  });
});

