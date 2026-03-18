/**
 * data.js — Shared Book Database
 * Single source of truth for book data used across all pages.
 * Update books here and it reflects everywhere automatically.
 */
const BOOKS_DATA = [
    { id: 1,  title: "Dune",                  author: "Frank Herbert",       price: 15, desc: "Sonsuz səhraların və taleyin hekayəsi.",          img: "./images/1.jpeg", genre: "Sci-Fi"    },
    { id: 2,  title: "1984",                  author: "George Orwell",       price: 12, desc: "Böyük Qardaş səni izləyir.",                       img: "./images/2.jpg",  genre: "Dystopia"  },
    { id: 3,  title: "Sapiens",               author: "Y.N. Harari",         price: 20, desc: "Bəşəriyyətin inanılmaz səyahəti.",                  img: "./images/3.jpg",  genre: "History"   },
    { id: 4,  title: "Atomic Habits",         author: "James Clear",         price: 18, desc: "Kiçik vərdişlərin böyük gücü.",                    img: "./images/4.jpg",  genre: "Self-Help" },
    { id: 5,  title: "The Alchemist",         author: "Paulo Coelho",        price: 14, desc: "Xəzinəni öz daxilində tap.",                       img: "./images/5.jpg",  genre: "Fiction"   },
    { id: 6,  title: "Clean Code",            author: "Robert Martin",       price: 45, desc: "Professional proqramçının bələdçisi.",             img: "./images/6.jpg",  genre: "Tech"      },
    { id: 7,  title: "The Witcher",           author: "Andrzej Sapkowski",   price: 22, desc: "Canavarlar və insanlar arasındakı sərhəd.",         img: "./images/7.jpg",  genre: "Fantasy"   },
    { id: 8,  title: "Steve Jobs",            author: "Walter Isaacson",     price: 25, desc: "Dizayn və texnologiyanın dühası.",                  img: "./images/8.jpg",  genre: "Biography" },
    { id: 9,  title: "Psychology of Money",   author: "Morgan Housel",       price: 19, desc: "Varlı olmaq və varlı qalmaq sənəti.",              img: "./images/9.jpg",  genre: "Finance"   },
    { id: 10, title: "Sherlock Holmes",       author: "Arthur Conan Doyle",  price: 16, desc: "Dünyanın ən məşhur detektivi.",                    img: "./images/10.jpg", genre: "Mystery"   }
];
