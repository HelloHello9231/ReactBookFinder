export default {
  createCollection: name => {
    let collections = getCollections();

    collections.push(new Collection(name));

    saveCollections(collections);

    return collections;
  },

  delelteCollection: id => {
    let collections = getCollections();

    collections.splice(findCollectionIndexByID(id, collections), 1);

    saveCollections(collections);

    return collections;
  },

  updateCollection: (id, newName) => {
    let collections = getCollections();
    let collectionToUpdate = findCollectionIndexByID(id, collections);

    collections[collectionToUpdate].name = newName;

    saveCollections(collections);

    return collections;
  },

  addToCollection: (Book, collectionID) => {
    let collections = getCollections();
    let collectionIndex = findCollectionIndexByID(collectionID, collections);

    collections[collectionIndex].books.push({
      bookInfo: Book,
      Notes: " ",
      PageNum: 0,
      id: Book.id
    });

    saveCollections(collections);
  },

  deleteFromCollection: (BookID, collectionID) => {
    let collections = getCollections();
    let collectionIndex = findCollectionIndexByID(collectionID, collections);

    let bookIndex = collections[collectionIndex].books.findIndex(
      element => element.id === BookID
    );

    collections[collectionIndex].books.splice(bookIndex, 1);

    saveCollections(collections);
  },

  editFromCollection: (BookID, collectionID, notesText, pageNum) => {
    let collections = getCollections();
    let collectionIndex = findCollectionIndexByID(collectionID, collections);

    let bookIndex = collections[collectionIndex].books.findIndex(
      element => element.id === BookID
    );

    collections[collectionIndex].books[bookIndex].Notes = notesText;
    collections[collectionIndex].books[bookIndex].PageNum = pageNum;

    saveCollections(collections);
  },

  GetCollections: () => {
    return JSON.parse(localStorage.getItem("collections")) || [];
  }
};

function Collection(name) {
  this.name = name;
  this.books = [];
  this.id = uuidv4();
}

let getCollections = () => {
  return JSON.parse(localStorage.getItem("collections")) || [];
};

function saveCollections(arrayOfCollections) {
  localStorage.setItem("collections", JSON.stringify(arrayOfCollections));
}

function findCollectionIndexByID(id, collections) {
  return collections.findIndex(element => element.id === id);
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
