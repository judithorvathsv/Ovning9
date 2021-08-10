let cardName = "";
let cardArray = [];

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function() {
    fetchCard();

});

function fetchCard() {

    fetch('http://deckofcardsapi.com/api/deck/new/draw/?count=2', {

            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('winField').style.display = 'none';
            const myCard = data.cards[0];
            const myImage = document.createElement('img');
            myImage.src = myCard.image;
            myImage.setAttribute('class', 'cardclass');
            myImage.setAttribute('width', '200px');
            const myDiv = document.getElementById('output');
            myDiv.innerHTML = "";
            myDiv.appendChild(myImage);

            const cardName = myCard.suit;
            cardArray.push(cardName);

            cardArray[-1] = "";
            cardArray[-2] = "";

            for (i = 0; i < cardArray.length; i++) {
                if ((cardArray[i] == cardArray[i - 1]) && (cardArray[i - 1] == cardArray[i - 2])) {
                    document.getElementById('winField').style.display = 'block';
                    document.getElementById('textAreaLabel').style.display = 'none';
                    document.getElementById('info').style.display = 'none';
                    document.getElementById('submitButton').style.display = 'none';
                    document.getElementById('winField').innerText = 'WINNER! ' + '\uD83D\uDE00' + ' Start the play again!';
                    myDiv.innerHTML = "";
                    return;
                }
            }
            return cardArray;
        })
        .catch(err => console.log(err))
}