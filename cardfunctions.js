const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function() {

    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1', {

            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const myCard = data.cards[0];
            const myImage = document.createElement('img');
            myImage.src = myCard.image;
            myImage.setAttribute('class', 'cardclass');
            myImage.setAttribute('width', '200px');
            const myDiv = document.getElementById('output');
            myDiv.innerHTML = "";
            myDiv.appendChild(myImage);
        })
        .catch(err => console.log(err))
});