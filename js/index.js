
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
    clearField(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    addBook(book){
        let bookList = document.getElementById('book-list');
        let row = document.createElement('tr');
        row.innerHTML = 
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' type='button'>Delete</a></td>`;
        bookList.appendChild(row);
    }
    deleteBook(target){
        if(target.hasAttribute('href')){
            confirm('Are You Sure to delete the book?');
            target.parentElement.parentElement.remove();
        }
    }
   
}


let form = document.getElementById('book-form');
form.addEventListener('submit', function(e){
    let title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);
    const ui = new UI();
    ui.addBook(book);
    ui.clearField(book);
    e.preventDefault();
})

let bookList = document.getElementById('book-list');
bookList.addEventListener('click', function(e){
    let ui = new UI();
    ui.deleteBook(e.target);
    e.preventDefault();
})