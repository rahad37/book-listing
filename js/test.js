let form = document.getElementById('book-form');


class Book{
    constructor(title, author, isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}

class UI{
    constructor(){

    }
    addBook(book){
        let bookList = document.getElementById('book-list');
        let list = document.createElement('tr');
        list.innerHTML =
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' type='button'>Delete</a></td>`
       bookList.appendChild(list);
    }
    clearField(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

form.addEventListener('submit', function(e){
    let title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);
    const ui = new UI();
    ui.addBook(book);
    ui.clearField();
    e.preventDefault();
})