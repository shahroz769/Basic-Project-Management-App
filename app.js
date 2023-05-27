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
    const item = document.createElement("div");
    item.setAttribute("class", "list");
    item.setAttribute("draggable", "true");
    item.textContent = itemName.value;
    list.appendChild(item);
    itemName.value = "";
}
let counter = 1; // Initialize the counter outside the function
function addColumn() {
    let columnName = document.getElementById("columnName").value;
    const errorMessage = document.getElementById("errorMessage");
    if (!columnName) {
        errorMessage.style.display = "block";
        return;
    }
    errorMessage.style.display = "none";
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
    // Create the list div
    const list = document.createElement("div");
    list.setAttribute("id", listId);
    list.setAttribute("class", "lists");
    title.appendChild(heading);
    outline.appendChild(title);
    outline.appendChild(list);
    column.appendChild(input);
    column.appendChild(errorMessageInList);
    column.appendChild(outline);
    container.appendChild(column);
    let columnInput = document.getElementById("columnName");
    columnInput.value = "";
    // Initialize Sortable for the new column
    Sortable.create(list, {
        group: "columns",
        animation: 150,
    });
    counter += 1;
}
