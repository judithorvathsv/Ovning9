let myArray = [];
let myArrayWithName = [];
let listsArray = [];

const toDoList = {
    listName: "",
    movingItem: "",
    clickedList: "",
    clickedListNameToMovingItem: ""
}




//add item to the list:
let button = document.getElementById('submitButton');
button.addEventListener('click', function() {
    let li = document.createElement('li');
    li.setAttribute('class', 'liClass');
    let ul = document.getElementById('ulId');
    let newItem = document.getElementById('inputField').value;

    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'checkboxClass');

    if (newItem !== "") {
        li.appendChild(document.createTextNode(newItem));
        li.appendChild(checkBox);
        ul.appendChild(li);

        document.getElementById('inputField').placeholder = "Enter item...";
        document.getElementById('inputField').style.backgroundColor = "cornsilk";
        document.getElementById('inputField').value = "";

    } else {
        document.getElementById('inputField').placeholder = "WRITE ITEM HERE";
        document.getElementById('inputField').style.backgroundColor = "greenyellow";
    }
});




//if nothing is written in the input field: background color and placeholder have changed. Double click: these are changing back:
button.addEventListener('dblclick', function(e) {
    document.getElementById('inputField').placeholder = "Enter item...";
    document.getElementById('inputField').style.backgroundColor = "cornsilk";
});




//make lineTrought on one item and back:
const ul = document.getElementById('ulId');
ul.addEventListener('dblclick', function(event) {
    event.target.classList.toggle('lineThrough');
});




//make checked one item and back:
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);




//simple click on button: mark all item:
const markAllButton = document.getElementById('markAllButton');
markAllButton.addEventListener('click', function() {
    let liObj = document.getElementsByTagName('ul')[0].getElementsByTagName('li');
    let i = liObj.length;

    while (i--) {
        if (!(liObj[i].classList.contains("line-through"))) {
            liObj[i].classList.add('lineThrough', 'checked');
        } else {}
    }
});




//double click on button: mark nothing item:
markAllButton.addEventListener('dblclick', function(e) {
    let liObj = document.getElementsByTagName('ul')[0].getElementsByTagName('li');
    let i = liObj.length;
    while (i--) {
        liObj[i].classList.remove('lineThrough', 'checked');
    }
});




//save list and download file:
function download(strData, strFileName, strMimeType) {
    let D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

    if (window.MSBlobBuilder) {
        let bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    }

    if ('download' in a) {
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            let e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    };
};




//eventlistener call the download function above:
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', function() {

    let elementsLI = document.getElementsByTagName('li')
    let length = document.getElementsByTagName('li').length;
    let myArray = [];

    for (let i = 1; i < length; ++i) {
        if (!(elementsLI[i].classList.contains('lineThrough'))) {
            myArray.push(elementsLI[i].textContent);
        }
    }
    download(listsArray, 'filename.txt', 'text/plain');
});




//save the list into "Your saved lists": 
function getListOfListsArray() {
    myArray = [];
    myArrayWithName = [];
    let isValidNameForList = true;

    if (document.getElementById('listNameField').value !== "") {
        if (listsArray.length > 0) {
            for (let i1 = 0; i1 < listsArray.length; i1++) {
                if (listsArray[i1][0] == document.getElementById('listNameField').value) {
                    isValidNameForList = false;
                    document.getElementById('errorField').style.display = 'block';
                    document.getElementById('errorField').innerText = 'Please give a unique name for the list';
                    document.getElementById('listNameField').value = "";
                }
            }
        }

        if (((listsArray.length !== 0) && (isValidNameForList == true)) || listsArray.length == 0) {
            document.getElementById('errorField').style.display = 'none';
            let liObj = document.querySelectorAll('.liClass');
            let liObjLength = liObj.length;

            for (let i = 0; i < liObjLength; i++) {
                let item = document.getElementsByClassName('liClass')[i].textContent;
                myArray.push(item);
            }
            for (let i = 0; i < liObjLength; i++) {
                liObj[i].parentNode.removeChild(liObj[i]);
            }

            toDoList.listName = document.getElementById('listNameField').value;
            myArrayWithName.push(toDoList.listName);
            myArrayWithName.push(myArray);
            listsArray.push(myArrayWithName);

            //put list into a <li> element: 
            let li = document.createElement('li');
            li.setAttribute('class', 'listLiClass');
            let newItem = document.getElementById('listNameField').value;
            let ul = document.getElementById('listsUlId');


            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'checkboxClass');

            li.appendChild(document.createTextNode(newItem));
            li.appendChild(checkBox);
            ul.appendChild(li);

            document.getElementById('listNameField').value = "";
        }
    } else {
        document.getElementById('errorField').style.display = 'block';
        document.getElementById('errorField').innerText = 'Please give a unique name for the list';
    }
    return listsArray;
}




//change the background an color:
const changeBackgroundButton = document.getElementById('changeBackgroundButton');
changeBackgroundButton.addEventListener('click', function() {
    let chosenBackground = document.getElementById('chosenBackground').value;

    if (chosenBackground == "Default") {
        document.body.style = "";
    }
    if (chosenBackground == "White") {
        document.body.style.setProperty('background-color', 'white');
        document.body.style.setProperty('color', 'green');
    }
    if (chosenBackground == "Black") {
        document.body.style.setProperty('background-color', 'black');
        document.body.style.setProperty('color', 'white');
    }
});




//add all lists in a big array and display the lists:
const saveListInListsButton = document.getElementById('saveListInListsButton');
saveListInListsButton.addEventListener('click', function() {
    getListOfListsArray();
});




let clickedItem = "";
//clickin on a list: display items above:
function displayList(e) {
    if (e.target && e.target.matches('li.listLiClass')) {

        //delete the list above in the screen to get place to the list that user wants to open:
        let liObj = document.getElementsByTagName('ul')[0].getElementsByClassName('liClass');
        let i = liObj.length;
        while (i--) {
            liObj[i].parentNode.removeChild(liObj[i]);
        }

        //get the myArray (=array) from listsArray(=array of arrays):
        for (let i1 = 0; i1 < listsArray.length; i1++) {
            if (listsArray[i1][0] == e.target.textContent) {
                for (let i2 = 1; i2 < listsArray[i1].length; i2++) {
                    for (let i3 = 0; i3 < listsArray[i1][i2].length; i3++) {

                        //display the array:  
                        let li = document.createElement('li');
                        li.setAttribute('class', 'liClass');
                        let newItem = listsArray[i1][i2][i3];

                        let checkBox = document.createElement('input');
                        checkBox.setAttribute('type', 'checkbox');
                        checkBox.setAttribute('class', 'checkboxClass');

                        li.appendChild(document.createTextNode(newItem));
                        li.appendChild(checkBox);

                        let ul = document.getElementById('ulId');
                        ul.appendChild(li);
                    }
                }
            }
        }
        document.getElementById('inputField').placeholder = "Enter name to the list...";
        document.getElementById('inputField').style.backgroundColor = "cornsilk";
    }
    clickedItem = e.target.textContent;
    return clickedItem;
}




//display item function event listener:
document.getElementById('listsUlId').addEventListener('click', function(e) {
    displayList(e);
});




//delete one item function:
let removableItem;

function deleteItem() {
    let liObj = document.querySelectorAll('.liClass');
    let i = liObj.length;
    let unchecked = [];

    for (let index = 0; index < i; index++) {
        let box = liObj[index].childNodes[1];

        if (box.checked) {
            //remove from the screen:
            liObj[index].parentNode.removeChild(liObj[index]);

            //remove from the input, there is no saved list yet:
            if (listsArray.length === 0) {}

            //remove from the list and remove from the listArray:
            if (listsArray.length !== 0) {
                let checkedItemValue = liObj[index].textContent;

                for (let i1 = 0; i1 < listsArray.length; i1++) {
                    if (listsArray[i1][0] == clickedItem) {
                        for (let i2 = 1; i2 < listsArray[i1].length; i2++) {
                            for (let i3 = 0; i3 < listsArray[i1][i2].length; i3++) {
                                if (listsArray[i1][i2][i3] == checkedItemValue) {
                                    listsArray[i1][i2].splice(i3, 1);
                                    break;
                                }

                            }
                        }
                    }
                }
            }
        } else {
            unchecked.push(box.value);
        }
    }
    return myArray;
}




//delete one item eventlistener:
const deleteButton = document.getElementById('deletetButton');
deleteButton.addEventListener('click', function() {
    deleteItem();
});




//delete one list:
const deleteListButton = document.getElementById('deleteListButton');
deleteListButton.addEventListener('click', function() {

    let liObj = document.querySelectorAll('.listLiClass');
    let i = liObj.length;
    let unchecked = [];

    for (let index = 0; index < i; index++) {

        let box = liObj[index].childNodes[1];
        if (box.checked) {
            //delete item from screen:
            let checkedItemValue = liObj[index].textContent;
            liObj[index].parentNode.removeChild(liObj[index]);

            //delete items in the list from listsArray (=array of arrays):
            for (let i1 = 0; i1 < listsArray.length; i1++) {
                if (listsArray[i1][0] == checkedItemValue) {
                    delete listsArray[i1];
                    console.log(listsArray);
                    break;
                }
            }
        } else {
            unchecked.push(box.value);
        }
    }
});




const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', function() {
    toDoList.movingItem = "";
    let liObj = document.getElementsByClassName('liClass');
    let i = liObj.length;
    while (i--) {
        let box = liObj[i].getElementsByTagName('input')[0];
        if (box.checked) {
            if (listsArray.length !== 0) {
                console.log(listsArray);
                //get the name of the item
                toDoList.movingItem = liObj[i].textContent;
                toDoList.clickedListNameToMovingItem = clickedItem;
                box.checked = false;
            }
        }
    }
    return toDoList.movingItem;
});




//put the copied item in the chosen list:
const pasteButton = document.getElementById('pasteButton');
pasteButton.addEventListener('click', function() {
    if (toDoList.movingItem !== "") {
        if (toDoList.clickedListNameToMovingItem !== "") {
            //delete moving item from the original list:
            for (let i1 = 0; i1 < listsArray.length; i1++) {
                if (listsArray[i1][0] == toDoList.clickedListNameToMovingItem) {
                    for (let i2 = 1; i2 < listsArray[i1].length; i2++) {
                        for (let i3 = 0; i3 < listsArray[i1][i2].length; i3++) {
                            if (listsArray[i1][i2][i3] == toDoList.movingItem) {
                                listsArray[i1][i2].splice(i3, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    //paste the moving item to the list:
    for (let i1 = 0; i1 < listsArray.length; i1++) {
        if (listsArray[i1][0] == clickedItem) {
            for (let i2 = 1; i2 < listsArray[i1].length; i2++) {
                for (let i3 = 0; i3 < listsArray[i1][i2].length; i3++) {
                    listsArray[i1][i2].push(toDoList.movingItem);
                    break;
                }
            }
        }
    }

    //display the array:  
    let li = document.createElement('li');
    li.setAttribute('class', 'liClass');
    let newItem = toDoList.movingItem;

    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'checkboxClass');

    li.appendChild(document.createTextNode(newItem));
    li.appendChild(checkBox);

    let ul = document.getElementById('ulId');
    ul.appendChild(li);
});