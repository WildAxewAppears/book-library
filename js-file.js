const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#open");
const closeButton = document.querySelector("#close-dialog");
const addBook = document.querySelector("#add-book")

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

const myLibrary = [];

function book (author, title, page) {
    // the constructor...
    this.author = author
    this.title = title
    this.page = page
}

book.prototype.status = ""

function addBooktoArray() {
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const page = document.querySelector("#page").value
    const status = document.querySelector("#status").value

    const newBook = new book(author, title, page)
    newBook.status = status
    myLibrary.push(newBook)
}

function addBookToLibrary() {
    // do stuff here
    const form = document.querySelector("#myForm")
    const bookContainer = document.querySelector(".main-content")

    while(bookContainer.firstChild){
        bookContainer.removeChild(bookContainer.firstChild)
    }

    myLibrary.forEach((book, index) => {
        const container = document.createElement("div");
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const remove = document.createElement("button");
        const changeStatus = document.createElement("button");
          
        h3.textContent = book.title;
        p1.textContent = `Author: ${book.author}` ;
        p2.textContent = `Pages: ${book.page}` ;
        p3.textContent = `Read: ${book.status}` ;

        remove.textContent = "Remove"
        changeStatus.textContent = "changeStatus"


        container.appendChild(h3);
        container.appendChild(p1);
        container.appendChild(p2);
        container.appendChild(p3);
        container.appendChild(remove);
        container.appendChild(changeStatus);

        container.classList.add("cards");

        container.dataset.index = index;
        bookContainer.appendChild(container);

        form.reset()
        
        remove.addEventListener("click", function(){
           bookContainer.removeChild(container)
          myLibrary.splice(container.dataset.index, 1)
          addBookToLibrary()
        })

        changeStatus.addEventListener("click", function(){
            if(book.status==="yes"){
                book.status = "no"
            }
            else {
                book.status = "yes"
            }
            addBookToLibrary()
        })
    })
}

addBook.addEventListener("click", function(event){

    event.preventDefault();

    addBooktoArray();
    addBookToLibrary();
    dialog.close();

})

const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".cards");

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});