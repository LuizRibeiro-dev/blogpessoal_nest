import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:",
        entities: [__dirname + "./../src/**/entities/*.entity.ts"],
        synchronize: true,
        dropSchema: true
      }),
      AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it("01 - Deve cadastrar um novo usuario", async () => {
    const reposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-'
    })
    .expect(201)

    usuarioId = reposta.body.id;
  })

  it("02 - Deve cadastrar um usuario duplicado", async () => {
    await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-'
    })
    .expect(400)
  });

  it("03 - Deve autenticar o usuario (Login)", async () => {
    const reposta = await request(app.getHttpServer())
    .post('/usuarios/logar')
    .send({
      usuario: 'root@root.com',
      senha: 'rootroot',
    })
    .expect(200)

    token = reposta.body.token;
  });

  it("04 - Deve listar todos os usuarios", async () => {
    return request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  });

  it("05 - Deve atualizar um usuario", async () => {
    return request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Root atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-'
    })
    .expect(200)
    .then(resposta =>{
      expect('Root atualizado').toEqual(resposta.body.nome)
    })
  });

  it("06 - Buscar usuario pelo ID", async () => {
    return request(app.getHttpServer())
    .get('/usuarios/1')
    .set('Authorization', `${token}`)
    .send({id: 1})
    .expect(200)
  });
})
