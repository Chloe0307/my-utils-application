//  on importe notre fichier math.js ainsi que la fonction du fichier 
// qui nous sera utile pour notre test
//  ici notre const est un peu différent car dans notre fichier math.js nous exportons un objet
// qui contient plusieurs fonctions
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')


test('On veut calculer le total avec le pourcentage', () => {
    //  10 = nb de base et 3 = 30% a appliquer sur 10
    const total = calculateTip(10, .3)
    //  traduction du test : "On dit que le total attendu doit être 13" => sinon echec test
    expect(total).toBe(13)
})

//  pour tester une valeur par défaut 
test('On veut calculer le total avec en pourcentage la valeur par defaut', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('devrait convertir 32F en 0C', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('devrait convertir 0C en 32F', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

// test de code asynchrone
// on ajoute done en argument et on l'appelle dans notre fonction pour que jest
// comprenne qu'il s'agit d'une fonction asynchrone mais qu'il soit attendre pour éxécuter 
// // expect avant de donner le resultat du test
// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Devrait additonner 2 nombres', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Devraitadditionner 2 nombre async/await', async () => {
    const sum = await add(10,22)
    expect(sum).toBe(32)
})