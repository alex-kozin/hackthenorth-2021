const amazon = require('amazon-buddy');

function randomKeyword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomProduct = async () => {
    const countries = await amazon.countries()
    try {
        // Collect 50 products from a keyword 'xbox one'
        // Default country is US
        console.log(randomKeyword(7))
        //console.log(countries[randomInt(0, countries.length)].country_code)
        let randomCountry = 'US' //countries[randomInt(0, countries.length)].country_code
        let products = await amazon.products({ keyword: randomKeyword(7), number: 10, country: randomCountry }).then(
            result => result.result
        )

        products.forEach(product => {
            console.log(product.title)
            console.log(product.thumbnail)
            console.log(product.price)
            console.log(product.score)
            console.log(product.reviews)
            console.log("-----------------------------------------------------")
        });
        
        return products
    } catch (error) {
        console.log(error)
    }
}

getRandomProduct()