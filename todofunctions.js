 let myArray = [];
let listsArray = [];

const toDoList = {
    listName: "",
    movingItem: "",
    clickedList: "",
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
        document.getElementById('inputField').placeholder = "Enter item...";
        document.getElementById('inputField').style.backgroundColor = "cornsilk";

        ul.appendChild(li);
        li.appendChild(document.createTextNode(newItem));
        li.appendChild(checkBox);

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
ul.addEventListener('click', function(event) {
    event.target.classList.toggle('lineThrough');
});




//make checked one item and back:
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);




//delete one item function:
let removableItem;

function deleteItem() {
    getListOfListsArray();

    let liObj = document.querySelectorAll('.liClass');
    let i = liObj.length;
    let unchecked = [];
    let keyCount = Object.keys(listsArray).length;

    for (let index = 1; index < i; index++) {
        let box = liObj[index].childNodes[1];

        if (box.checked) {
            //remove from the screen:
            liObj[index].parentNode.removeChild(liObj[index]);

            //remove from the input, there is no saved list yet:
            if (listsArray.length === 0) {
                for (let x = 0; x < listsArray.length; x++) {
                    listsArray.splice(x, 1);
                    break;
                }
            }

            //remove from the list and remove from the listArray:
            if (listsArray.length !== 0) {
                for (let x = 0; x < listsArray.length; x++) {
                    for (let y = 0; y <= keyCount; y++) {
                        if (listsArray[x] == removableItem) {
                            listsArray[x].splice(y, 1);
                            break;
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
    download(myArray, 'filename.txt', 'text/plain');
});




//put items and listname [at index=0] into a list (=myArray):
function getListInArray() {
    toDoList.listName = document.getElementById('listNameField').value;
    let elementsLI = document.getElementsByClassName('liClass');
    let lenght = document.getElementsByClassName('liClass').length;

    myArray = [];
    for (let i = 0; i < lenght; ++i) {
        myArray.push(elementsLI[i].textContent);
    }
    //put the listname into the array:

    myArray.unshift(toDoList.listName);
    return myArray;
}




//save the list into "Your saved lists": 
function getListOfListsArray() {
    getListInArray();

    //put list into a <li> element: 
    let li = document.createElement('li');
    li.setAttribute('class', 'listLiClass');
    let ul = document.getElementById('listsUlId');
    let newItem = document.getElementById('listNameField').value;

    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'checkboxClass');

    if (newItem !== "") {
        document.getElementById('inputField').placeholder = "Enter name to the list...";
        document.getElementById('inputField').style.backgroundColor = "cornsilk";

        ul.appendChild(li);
        li.appendChild(document.createTextNode(newItem));
        li.appendChild(checkBox);


        //put the created list into a big list(array of arrays):
        let listsLength = listsArray.length;
        listsArray[listsLength] = myArray;

        //to empty the array of the list to reuse later (the list items are saved in the big list):
        myArray = [];

        //remove list items from the input:
        let liObj = document.getElementsByTagName('ul')[0].getElementsByClassName('liClass');
        let i = liObj.length;
        while (i--) {
            liObj[i].parentNode.removeChild(liObj[i]);
        }
        document.getElementById('listNameField').value = "";
    }
    return listsArray;
}




//add all lists in a big array and display the lists:
const saveListInListsButton = document.getElementById('saveListInListsButton');
saveListInListsButton.addEventListener('click', function() {
    getListOfListsArray();
});




//delete one list:
const deleteListButton = document.getElementById('deleteListButton');
deleteListButton.addEventListener('click', function() {

    let liObj = document.querySelectorAll('.listLiClass');


    let i = liObj.length;
    let unchecked = [];


    for (let index = 1; index < i; index++) {
        let box = liObj[index].childNodes[1];
        if (box.checked) {
            //delete item from screen:
            liObj[index].parentNode.removeChild(liObj[index]);
            //delete items in the list from listsArray (=array of arrays):
            for (let x = 0; x < listsArray.length; x++) {
                if (listsArray[x][0] == liObj[index].textContent) {
                    delete listsArray[x];
                    break;
                } else {}
            }

        } else {
            unchecked.push(box.value);
        }
    }
});



//clickin on a list: display items above:
function displayList(e) {
    deleteItem();
    getListOfListsArray();


    if (e.target && e.target.matches('li.listLiClass')) {
        //delete the list above in the screen to get place to the list that user wants to open:
        let liObj = document.getElementsByTagName('ul')[0].getElementsByClassName('liClass');
        let i = liObj.length;
        while (i--) {
            liObj[i].parentNode.removeChild(liObj[i]);
        }
        //get the myArray (=array) from listsArray(=array of arrays):
        for (let i = 0; i < listsArray.length; i++) {
            if (listsArray[i][0] == e.target.textContent) {
                for (let j = 1; j < listsArray[i].length; j++) {
                    //display the array:  
                    let li = document.createElement('li');
                    li.setAttribute('class', 'liClass');
                    let ul = document.getElementById('ulId');
                    let newItem = listsArray[i][j];
                    let checkBox = document.createElement('input');
                    checkBox.setAttribute('type', 'checkbox');
                    checkBox.setAttribute('class', 'checkboxClass');
                    ul.appendChild(li);
                    li.appendChild(document.createTextNode(newItem));
                    li.appendChild(checkBox);
                }
            }
        }
    }
    document.getElementById('inputField').placeholder = "Enter name to the list...";
    document.getElementById('inputField').style.backgroundColor = "cornsilk";
}




//display item function event listener:
document.getElementById('listsUlId').addEventListener('click', function(e) {
    displayList(e);
});




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




// copy button to delete item from list and listsarray it will be copied by paste button:
const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', function() {
    let liObj = document.getElementsByClassName('liClass');
    let i = liObj.length;
    while (i--) {
        let box = liObj[i].getElementsByTagName('input')[0];
        if (box.checked) {
            toDoList.movingItem = liObj[i].textContent;
            removableItem = toDoList.movingItem;
            deleteItem();
            box.checked = false;
        }
    }
    return toDoList.movingItem;
});




//to get in which list the user would like to put the copied item:
document.getElementById('listsUlId').addEventListener('click', function(ev) {
    if (ev.target && ev.target.matches("li.listLiClass")) {
        let liObj = ev.target;
        toDoList.clickedList = liObj.textContent;
        return toDoList.clickedList;
    }
});




//put the copied item in the chosen list:
const pasteButton = document.getElementById('pasteButton');
pasteButton.addEventListener('click', function() {
    getListOfListsArray();

    //get listrows:
    let listRows = document.getElementsByClassName('listLiClass');

    //how many listrows:
    let i = listRows.length;

    while (i--) {
        let box = listRows[i].getElementsByTagName('input')[0];
        if (box.checked) {

            //create a new item in the list (the copied item):
            let li = document.createElement('li');
            li.setAttribute('class', 'liClass');
            let ul = document.getElementById('ulId');
            let newItem = toDoList.movingItem;

            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'checkboxClass');

            ul.appendChild(li);
            li.appendChild(document.createTextNode(newItem));
            li.appendChild(checkBox);

            //put item to the listArray:
            let keyCount = Object.keys(listsArray).length;
            if (keyCount !== 0) {
                for (let x = 0; x < keyCount; x++) {
                    for (let y = 0; y <= keyCount; y++) {
                        if (listsArray[x][y] == toDoList.clickedList) {
                            listsArray[x].push(toDoList.movingItem);
                            box.checked = false;
                        }
                    }
                }
            }
        }
    }
    return listsArray;
});
