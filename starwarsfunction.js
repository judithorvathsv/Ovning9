const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function() {
    isEmptyInput = true;
    let swapiLink = 'https://www.swapi.tech/api/people/?name=';
    let inputField = document.getElementById('inputField').value;

    if (inputField == "") {
        isEmptyInput = false;
        document.getElementById('errorField').style.display = 'block';
        document.getElementById('errorField').innerText = 'Please write a character name';
    } else {

        document.getElementById('output').value = '';
        document.getElementById('errorField').style.display = 'none';
        fullUri = swapiLink + inputField;

        fetch(fullUri, {

                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                let person = data.result[0];
                const personProperties = person.properties;

                const value1 = personProperties.height;
                const value2 = personProperties.mass;
                const value3 = personProperties.gender;
                const value4 = personProperties.hair_color;

                let s = `height 1: ${value1}cm, mass 2: ${value2}kg, gender 3: ${value3}, hair color 4: ${value4}`;
                str = JSON.stringify(s);
                document.getElementById('output').value = str;
            })
            // .catch(err => console.log(err),
            .catch(err => {
                document.getElementById('output').value = '';
                document.getElementById('output').value = "An error happened, please try again.";
                console.log('caught it!', err);

            })
    }
});