
function numberValidation(id) {
    isValid = true;
    let inputNumber = document.getElementById(id);

    if (!inputNumber.checkValidity()) {

        isValid = false;

        document.getElementById('errorField').style.display = 'block';
        document.getElementById('errorField').innerText += inputNumber.validationMessage;
        document.getElementById('errorField').innerText += ' Give an appropriate ' + inputNumber.getAttribute('id') + '.';
        document.getElementById('errorField').innerText += '\r\n';
    }

    return isValid;
}



function getNumber(id) {
    return document.getElementById(id).value;
}



const button = document.getElementById('submitButton');
button.addEventListener('click', function () {

    document.getElementById('errorField').innerText = '';
    document.getElementById('output').innerText = 'no result';

    let resultArray = [];

    for (let i = 1; i <= getNumber('firstNumber'); i++) {
        if ((i % getNumber('secondNumber') == 0) && (i % getNumber('thirdNumber') !== 0)) {
            result = 'Bish';
        }
        else if ((i % getNumber('thirdNumber') == 0) && (i % getNumber('secondNumber') !== 0)) {
            result = 'Bosh';
        }
        else if (i % getNumber('secondNumber') == 0 && i % getNumber('thirdNumber') === 0) {
            result = 'Bish-Bosh';
        }
        else {
            i = i;
            result = i.toString();
        }
        resultArray.push(result);
    }


    let firsNumberIsValid = numberValidation('firstNumber');
    let secondNumberIsValid = numberValidation('secondNumber');
    let thirdNumberIsValid = numberValidation('thirdNumber');


    if (firsNumberIsValid && secondNumberIsValid && thirdNumberIsValid) {
        document.getElementById('output').innerText += resultArray;
        document.getElementById('errorField').style.display = 'none';
    }
    else
        document.getElementById('output').innerText = 'no result';
});
