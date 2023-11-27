//объект кнопки "Добавить"
let item_add_btn = document.getElementById("create");

//функция отметки выполнения
function SuccessCheck() {
    this.firstChild.classList.toggle("check");
    this.nextSibling.classList.toggle("task-done");
}

//функция редактирования элемента
function ItemEdit() {
    let text = this.parentElement.previousSibling.lastChild.textContent;
    this.parentElement.previousSibling.lastChild.insertAdjacentHTML("beforebegin", "<input type=\"text\" class=\"item-text\" value=\"" + text + "\">");
    this.parentElement.previousSibling.lastChild.remove();
    this.parentElement.previousSibling.lastChild.focus();
    this.parentElement.previousSibling.lastChild.addEventListener("focusout", ItemEndEdit);
}

//функция завершения редактирования элемента
function ItemEndEdit() {
    let text = this.value;
    if (text != "") {
        this.insertAdjacentHTML("beforebegin", "<div class=\"item-text\">" + text + "</div>");
        this.remove();
    }
    else {
        this.parentElement.parentElement.remove();
    }
}

//функция удаления элемента из списка
function ItemDelete() {
    this.parentElement.parentElement.remove();
}

//функция вставки нового элемента в список
function ItemAdd(txt) {
    item_add_btn.insertAdjacentHTML("beforebegin", 
        "<div class=\"item\">" +
            "<div class=\"item-box\">" + 
                "<div class=\"item-icon success-box\">" + 
                    "<div class=\"non-check\"></div>" + 
                "</div>" +
                "<input type=\"text\" placeholder=\"Начните писать...\" class=\"item-text\">" +
            "</div>" +
            "<div class=\"item-control\">" +
                "<div class=\"item-icon\">" +
                    "<div class=\"edit\"></div>" +
                "</div>" +
                "<div class=\"item-icon\">" +
                    "<div class=\"delete\"></div>" +
                "</div>" +
            "</div>" +
        "</div>");

    current_elem = document.getElementsByClassName("success-box");
    current_elem[current_elem.length-1].addEventListener("click", SuccessCheck);

    current_edit = document.getElementsByClassName("edit");
    current_edit[current_edit.length-1].parentElement.addEventListener("click", ItemEdit);

    current_delete = document.getElementsByClassName("delete");
    current_delete[current_delete.length-1].parentElement.addEventListener("click", ItemDelete);

    current_text = document.getElementsByClassName("item-text");
    current_text[current_text.length-1].value = txt;
    current_text[current_text.length-1].addEventListener("focusout", ItemEndEdit);
    current_text[current_text.length-1].focus();
}

//обработка события нажатия на кнопку "Добавить"
function ItemAddEvent() {
    ItemAdd("");
}


//нажатие на кнопку "Добавить"
item_add_btn.addEventListener("click", ItemAddEvent);

//обработка события закрытия страницы
window.onunload = function() {
    let items = document.getElementsByClassName("item-text");
    let item_txt = Array();

    for (let i = 0; i < items.length; i++) {
        item_txt.push(items[i].textContent);
    }

    localStorage.setItem("todo_items", JSON.stringify(item_txt));
}

//обработка события загрузки страницы
window.onload = function() {
    let items = localStorage.getItem("todo_items");
    item_txt = JSON.parse(items);

    for (let i = 0; i < item_txt.length; i++) {
        ItemAdd(item_txt[i]);
    }
}