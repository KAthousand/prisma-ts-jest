
//import app for correct routes and server to close after
import {app} from '../../src/server'
//import supertest to test HTTP req/res
import request from 'supertest';
//import prisma client
import prisma from '../../src/client';

const mockValidUser = {
  email: "testUser@email.com",
  username: "testUser",
  password: "123456"
}

const mockInvalidUser = {
  email: "testUser2@email.com",
  username: "testUser2",
  password: "1234"
}

beforeAll(async ()=>{
  process.env.DATABASE_URL="postgresql://kylethousand@localhost:5432/multi-server-test-test"
  process.env.ACCESS_TOKEN_KEY="a408ffd3c10e22c7a068888f7c4d0739cf71365e64215b6feecdec0e66d2f716e320dc479ec2b9760554ba67c5b68749d284e71070501fb69ac002524d737cd3"
  process.env.REFRESH_TOKEN_KEY="c4c37a06554953f68cc3bb6e68ef37862638ae1d1f5816782b5f59d942730ad8f862c60d4daa1a85031855a101e4745944ccc3af1edd6d1a68ca5526d9e06400"
  await prisma.$connect()
  console.log('connected')
})

afterAll(async()=>{
  await prisma.user.deleteMany({})
  await prisma.$disconnect()
})

//Testing User Post Route
describe('POST /api/users', function() {
  it('responds with 200', function(done) {
      request(app)
      .post("/api/users")
      .send(mockValidUser)
      .end(function(err, res) {
        if (err) {
          console.log(err)
          return done(err);
        }
        expect(res.status).toEqual(200)
        expect(res.body.user.username).toEqual("testUser");
        return done();
      });
  });
  it('Sending invalid user, validation check should catch password error', function(done) {
    request(app)
    .post("/api/users")
    .send(mockInvalidUser)
    .end(function(err, res) {
      if (err) {
        console.log(err)
        return done(err);
      }
      expect(res.status).toEqual(400)
      return done();
    });
});
});