function createDeck()
{
    deck = new Array()
    for (var i = 0  i < 10 i++)
    {
        var pricePoints = randomInt(1, 5)
        var ratingPoints = randomInt(1, 5)
        var reviewsPoints = randomInt(1, 5)
        var card = {
            PricePoints: pricePoints,
            RatingPoints: ratingPoints,
            ReviewsPoints: reviewsPoints
        }

        deck.push(card)
    }

    return deck
}

function renderDeck(deck)
{
      document.getElementById("deck").innerHTML = ""

	for(let i = 0 i < deck.length i++)
	{   
		let price = document.createElement("div")
		let rating = document.createElement("div")
        let reviews = document.createElement("div")
        
		price.className = "price"
		rating.className = "rating"
        reviews.className = "reviews"

		price.innerHTML = deck[i].PricePoints
		rating.innerHTML = deck[i].RatingPoints
        reviews.innerHTML = deck[i].ReviewsPoints
        
        let card = document.createElement("div")
        card.id = `card-${i}`
        card.className= `card`
        card.appendChild(price)
        card.appendChild(rating)
        card.appendChild(reviews)
        card.appendChild(document.createElement("hr"))

		document.getElementById("deck").appendChild(card)
	}
}




function randomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function startGame() {
    var deck = createDeck()
    renderDeck(deck)
}