let itemCounter = 1;
function addItem(columnNumber) {
    let itemNumber = "itemName" + columnNumber;
    let itemName = document.getElementById(itemNumber);
    let errorMessageInList = document.getElementById(
        "errorMessageInList" + columnNumber
    );
    if (!itemName.value) {
        errorMessageInList.style.display = "block";
        return;
    }
    errorMessageInList.style.display = "none";
    let listNumber = "list" + columnNumber;
    let list = document.getElementById(listNumber);
    // Create List Item
    const item = document.createElement("div");
    // Create List Item Left
    const itemLeft = document.createElement("div");
    itemLeft.setAttribute("class", "list-left");
    // Create List Item Right
    const itemRight = document.createElement("img");
    itemRight.setAttribute("class", "list-right");
    itemRight.setAttribute("src", "./Assets/cross.svg");
    itemRight.setAttribute("alt", "Cross Icon");
    itemRight.setAttribute("id", "listItem" + itemCounter);
    itemRight.setAttribute(
        "onclick",
        "deleteListItem(listItem" + itemCounter + ")"
    );
    itemCounter += 1;
    const text = document.createElement("p");
    item.setAttribute("class", "list");
    text.textContent = itemName.value;

    // create img tag
    const dragImg = document.createElement("img");
    dragImg.setAttribute("src", "./Assets/drag-handle.svg");
    dragImg.setAttribute("width", "32px");
    dragImg.setAttribute("alt", "Drag Handle");
    dragImg.setAttribute("class", "drag-handle");
    dragImg.setAttribute("draggable", "true");

    itemLeft.appendChild(dragImg);
    itemLeft.appendChild(text);
    item.appendChild(itemLeft);
    item.appendChild(itemRight);
    list.appendChild(item);
    itemName.value = "";

    setTimeout(() => {
        itemName.focus();
    }, 10);
}

let counter = 1; // Initialize the counter outside the function
function addColumn() {
    let columnName = document.getElementById("columnName").value;
    const errorMessage = document.getElementById("errorMessage");
    const octodox = document.getElementById("octodox");
    if (!columnName) {
        errorMessage.style.display = "block";
        return;
    }
    errorMessage.style.display = "none";
    octodox.style.display = "none";
    let columnId = "column" + counter;
    let listId = "list" + counter;
    let itemName = "itemName" + counter;
    let container = document.getElementById("container");
    // Create the column div
    const column = document.createElement("div");
    column.setAttribute("id", columnId);
    column.setAttribute("class", "column");
    // Create the input div
    const input = document.createElement("div");
    input.setAttribute("class", "input");
    // Create the input tag
    const inputTag = document.createElement("input");
    inputTag.setAttribute("type", "text");
    inputTag.setAttribute("id", itemName);
    inputTag.setAttribute(
        "onfocus",
        "focusColumnField(" + itemName + " ,'focus')"
    );
    inputTag.setAttribute(
        "onblur",
        "focusColumnField(" + itemName + " ,'blur')"
    );
    inputTag.setAttribute("class", "itemName");
    inputTag.setAttribute("placeholder", "Item Name...");
    // Create the "Add Item" button
    const addItemButton = document.createElement("div");
    addItemButton.setAttribute("class", "add-item-btn");
    addItemButton.setAttribute("onclick", "addItem(" + counter + ")");
    addItemButton.textContent = "Add Item";
    input.appendChild(inputTag);
    input.appendChild(addItemButton);
    // Create Error Message
    const errorMessageInList = document.createElement("p");
    errorMessageInList.setAttribute("id", "errorMessageInList" + counter);
    errorMessageInList.setAttribute("class", "errorMessageInList");
    errorMessageInList.textContent = "Please enter column name...";
    // Create the outline div
    const outline = document.createElement("div");
    outline.setAttribute("class", "outline");
    // Create the title div
    const title = document.createElement("div");
    title.setAttribute("class", "title");
    // Create the heading
    const heading = document.createElement("h1");
    heading.textContent = columnName;
    // create delete button div
    const deleteButton = document.createElement("div");
    deleteButton.setAttribute("class", "delete-column-btn");
    deleteButton.setAttribute("onclick", "deleteColumn(" + counter + ")");
    deleteButton.textContent = "Delete Column";
    // Create the list div
    const list = document.createElement("div");
    list.setAttribute("id", listId);
    list.setAttribute("class", "lists");
    // append
    title.appendChild(heading);
    column.appendChild(title);
    outline.appendChild(list);
    column.appendChild(input);
    column.appendChild(errorMessageInList);
    column.appendChild(outline);
    column.appendChild(deleteButton);
    container.appendChild(column);
    // Reset the input field
    let columnInput = document.getElementById("columnName");
    columnInput.value = "";
    // Initialize Sortable for the new column
    Sortable.create(list, {
        group: "columns",
        animation: 300,
        handle: ".drag-handle",
    });
    listInputEvent(counter);
    counter += 1;
    setTimeout(() => {
        columnInput.focus();
    }, 10);
}
function deleteColumn(counter) {
    columnToDelete = document.getElementById("column" + counter);
    columnToDelete.remove();
}
const deleteListItem = (listItemId) => {
    listItemId.parentNode.remove();
};

const columnInputField = document.getElementById("columnName");
columnInputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addColumn();
    }
});
const listInputEvent = () => {
    let container = document.getElementById("container");
    container.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let focusedInput = document.activeElement;
            if (focusedInput.classList.contains("itemName")) {
                event.preventDefault();
                let columnId = focusedInput.closest(".column").id;
                let columnNumber = columnId.replace("column", "");
                addItem(columnNumber);
                focusedInput.blur(); // Remove focus from the input field
            }
        }
    });
};

new Sortable(container, {
    animation: 300,
    handle: ".title",
});

const focusField = (event) => {
    if (event === "focus") {
        document.querySelector(".columnInput").style.outline =
            "2.5px solid #635fc7";
    } else if (event === "blur") {
        document.querySelector(".columnInput").style.outline = "none";
    }
};
const focusColumnField = (inputElem, event) => {
    console.log(inputElem.parentNode);
    if (event === "focus") {
        inputElem.parentNode.style.outline = "2.5px solid #635fc7";
    } else if (event === "blur") {
        console.log("blur");
        inputElem.parentNode.style.outline = "none";
    }
};
