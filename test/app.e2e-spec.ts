import { INestApplication } from '@nestjs/common'

import { getApplicationInstance } from './utils/app'

import * as request from 'supertest'

describe('App (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getApplicationInstance()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be return an object with status 200 (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'query{posts{edges{node{id}}}}',
      })
      .expect(200)
  })
})
