let library = [];
let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

//creates a book. constructor
class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        if (this.read == true){
          return this.read = "[x]";
        }
        else{
          return this.read = "[ ]";
        };

     }
}   


function updateLocalStorage(e){
  localStorage.setItem("myLibrary", JSON.stringify(e));
}



//just some initial entries to test things out.
let hobbit = new Book("The Hobbit","J.R.R. Tolkein", 245, true);
let horus = new Book("Horus Heresy", "Dan Abnett", 400, true);

//pushes book(x) to library
function addBookToLibrary (x) {
     library.push(x);
}

addBookToLibrary(hobbit);
addBookToLibrary(horus);


// a function that combines a new book and pushes it into the library array. change prompt
function createNewBook(title, author, pages, read){
    
    let userBook = new Book(title, author, pages, read);
    addBookToLibrary(userBook);
}

createNewBook("taco", "tuesday", "235", true);

let table = document.getElementById("table");

//renders the table of books
function displayLibrary(){
    table.innerHTML="";
    for (i=0; i<library.length; i++){
        let tr = document.createElement('tr');
        let tdTitle = document.createElement('td');
        let tdAuthor = document.createElement('td');
        let tdPages = document.createElement('td');
        let tdRead = document.createElement('td');
        let tdReadBtn = document.createElement('td');
        let tdDelete = document.createElement('td');
        
        tr.id = "tableRow" + i;
        tdTitle.appendChild(document.createTextNode(library[i].title));
        tdAuthor.appendChild(document.createTextNode(library[i].author));
        tdPages.appendChild(document.createTextNode(library[i].pages));
        tdRead.appendChild(document.createTextNode(library[i].read));
        
        //button creation that splices out index of button and reintializes displaylibrary.
        let libraryIndex = i; 

        let btn = document.createElement("BUTTON");
        btn.innerHTML = "clear table row";
        btn.addEventListener("click", function () {
            library.splice(libraryIndex, 1);
            displayLibrary();

           
        })

        let btnRead = document.createElement("BUTTON");
        btnRead.innerHTML = "change read";
        btnRead.addEventListener("click", function() {
          let isRead = library[libraryIndex].read;
          console.log(isRead);
          if (isRead == "[x]"){
            library[libraryIndex].read = "[ ]";
          } else if (isRead == "[ ]"){
            library[libraryIndex].read = "[x]";
          } else {};
          displayLibrary();
        });

           
        //appends the button to a td
        tdDelete.appendChild(btn); 
        tdReadBtn.append(btnRead);

        

//appends all tds into the tr
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPages);
        tr.appendChild(tdRead);
        tr.appendChild(tdReadBtn);
        tr.appendChild(tdDelete);
        table.appendChild(tr);


    }
}


displayLibrary();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 



function formSubmit(){ 
  let titleForm = document.getElementById("title").value;
  let authorForm = document.getElementById("author").value;
  let pagesForm = document.getElementById("pages").value;
  let readForm = document.getElementById("read")
  let readOrNotRead = false;
  if (readForm.checked == true){
    readOrNotRead = true;
  } else {};
  createNewBook (titleForm, authorForm, pagesForm, readOrNotRead);
  displayLibrary();
  modal.style.display = "none";

}



