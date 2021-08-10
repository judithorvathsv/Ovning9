let cardArray = [];
let timeElapsed = false;

function startTimer(duration, display) {
    timeElapsed = false;
    let timer = duration,
        minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = null;
            timeElapsed = true;
        }
    }, 1000);
}

let halfMinutes = 5,
    display = document.querySelector('#time');
startTimer(halfMinutes, display);

function hide() {
    document.getElementById('winField').style.display = 'block';
    document.getElementById('textAreaLabel').style.display = 'none';
    document.getElementById('info').style.display = 'none';
    document.getElementById('submitButton').style.display = 'none';
    document.getElementById('time').style.display = 'none';
}

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
                    if (timeElapsed == false) {
                        hide();
                        document.getElementById('winField').innerText = 'WINNER! ' + '\uD83D\uDE00' + ' Start the game again!';
                        myDiv.innerHTML = "";
                        return;
                    }
                }

                if (timeElapsed == true) {
                    myDiv.removeChild(myDiv.childNodes[0]);
                    hide();
                    document.getElementById('winField').innerText = 'You ran out of time! Start the game again!';
                    return;
                }
            }
            return cardArray;
        })
        .catch(err => console.log(err))
}
