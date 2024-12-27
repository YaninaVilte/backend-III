import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;

chai.use(chaiHttp);

before(function (done) {
    this.timeout(5000);
    setTimeout(done, 2000);
});

describe('Adoptions API', () => {

    describe('GET /api/adoptions', () => {
        it('debería obtener todas las adopciones', (done) => {
            chai.request.execute(app)
                .get('/api/adoptions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('payload');
                    expect(res.body.payload).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('debería obtener una adopción por ID', (done) => {
            const adoptionId = '676ead6ab6208111ffa980c2'; // ID de adopción válido
            chai.request.execute(app)
                .get(`/api/adoptions/${adoptionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('payload');
                    done();
                });
        });

        it('debería devolver error 404 si la adopción no existe', (done) => {
            const adoptionId = '123ead6ab6208111ffa980c2'; // ID de adopción no válido
            chai.request.execute(app)
                .get(`/api/adoptions/${adoptionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('status', 'error');
                    expect(res.body).to.have.property('error', 'Adoption not found');
                    done();
                });
        });
    });

    // Test para crear una adopción
    describe('POST /api/adoptions/:uid/:pid', () => {
        it('debería crear una adopción', (done) => {
            const uid = '676eaa3b68e226af82cbb8a6'; // ID de user válido
            const pid = '676eaa3b68e226af82cbb8ae'; // ID de pet válido
            chai.request.execute(app)
                .post(`/api/adoptions/${uid}/${pid}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('message', 'Pet adopted');
                    done();
                });
        });

        it('debería devolver error 404 si el usuario no existe', (done) => {
            const uid = '123e08cfe3e1b0d606b215c8'; // ID de user no válido
            const pid = '676eaa3c68e226af82cbb8b2'; // ID de pet válido
            chai.request.execute(app)
                .post(`/api/adoptions/${uid}/${pid}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('status', 'error');
                    expect(res.body).to.have.property('error', 'user Not found');
                    done();
                });
        });

        it('debería devolver error 404 si la mascota no existe', (done) => {
            const uid = '676eaa3b68e226af82cbb8ac'; // ID de user válido
            const pid = '123eaa3c68e226af82cbb8b2'; // ID de pet no válido
            chai.request.execute(app)
                .post(`/api/adoptions/${uid}/${pid}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('status', 'error');
                    expect(res.body).to.have.property('error', 'Pet not found');
                    done();
                });
        });

        it('debería devolver error 400 si la mascota ya está adoptada', (done) => {
            const uid = '676eaa3b68e226af82cbb8aa'; // ID de user válido
            const pid = '676eaa3b68e226af82cbb8b0'; // ID de pet adoptado
            chai.request.execute(app)
                .post(`/api/adoptions/${uid}/${pid}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('status', 'error');
                    expect(res.body).to.have.property('error', 'Pet is already adopted');
                    done();
                });
        });
    });
});