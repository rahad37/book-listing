let form = document.getElementById('book-form');
let bookList = document.querySelector('#book-list');

bookList.addEventListener('click', removeBook);

class Book{
    constructor(title, author, isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}

// Local Storage Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static displayBooks(){
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addBook(book);
        })
    }
    static remove(isbn){
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

class UI{
    static addBook(book){
        let bookList = document.getElementById('book-list');
        let list = document.createElement('tr');
        list.innerHTML =
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' type='button'>Delete</a></td>`
       bookList.appendChild(list);
    }
    static clearField(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000)
    }
    static deleteFromBook(target){
        if(target.hasAttribute('href')){
            confirm('Are you sure to delete the book?');
            target.parentElement.parentElement.remove();
            Store.remove(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book Removed!', 'error');
        }
    }
}
document.addEventListener('DOMContentLoaded', Store.displayBooks());
// FORM...

form.addEventListener('submit', function(e){
    let title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all the fields!', 'error')
    }else{
        const book = new Book(title, author, isbn);
        UI.addBook(book);
        UI.showAlert('Book Added!', 'success')
        UI.clearField();
        Store.addBook(book);
    }
    e.preventDefault();
})


function removeBook(e){
    UI.deleteFromBook(e.target);
    e.preventDefault();
}