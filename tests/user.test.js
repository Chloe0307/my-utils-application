const request = require('supertest')
const app = require('../api/app')


// Test to verified the creation of a new user
test('should signup a new user', async () => {
    // on utilise une promesse car c'est une requete asynchrone
    // on appelle supertest et on lui passe notre app express en argument
    // on appelle ensuite la méthode http utilisé dans le test, donc post et le chemin utilisé
    // avec .send({datas}) on envoie des données à un point final pour le test
    await request(app).post('/add-user').send({
        name: "chloé",
        email: "chloecuny@yahoo.fr",
        password: "Loulou2916!"
    }).expect(201)
})