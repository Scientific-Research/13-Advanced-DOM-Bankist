"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault(); // to prevent the page to jump to the top because of href="#" in html code!
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++) // using forEach to get ride of this old school method!
// NOTE: btnsOpenModal is a NodeList, because is the output of querySelectorAll(). A Node List is not an array(is an array-like structure) and doesn't support most of the methods which has an array, but it supports forEach method!

// WE HAVE TWO BUTTONS TO OPEN AN ACCOUNT, ONE IS ON THE TOP AND ANOTHER ONE AT THE BOTTOM OF THE PAGE! THAT'S WHY NEED A FOREACH TO LOOP OVER BOTH OF THEM(NODE LIST) AND ALWAYS IS READY: WHEN SOMEBODY CLICK ON ONE OF THESE BUTTONS, ADDEVENTLISTENER WILL RUN OPENMODAL FUNCTION AS CALLBACK FUNCTION AND WE WILL SEE THE OPEN ACCOUNT FORM APPEARING ON THE PAGE!
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
// ADVANCED-DOM-Banklist
////////////////////////////////////////////////////////////////////////////////////////////////

console.log("ADVANCED-DOM-Banklist");

console.log("-------------------------------SELECTING ELEMENTS-------------");

// IF WE WANT TO SELECT THE ENTIRE HTML SECTION, WE USE: document.documentElement
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector(".header"); // send us the first element matches this class
const allSections = document.querySelectorAll(".section"); // send us the all elements match this calss => we have here multiple sections with class section!

console.log(allSections); // NodeList(4)

document.getElementById("section--1");

const allButtons = document.getElementsByTagName("button"); // All the elemnts with the name of the button!

console.log(allButtons); // HTMLCollection(9) => all the buttons on our page!
// This send us a HTMLCollection and is different from NodeList!

// NOTE: getElementsByTagName gives us the HTMLCollection and this is a live collection which means when we delete an elemenet for example a button in our HTML, it will reflect on this live collection and we will have one less element => HTMLCollection(8)

// NOTE: Above situation will not happen for the NodeList. When i delete a section, I will have still NodeList with 4 sections and not with 3 setions. NodeList will not update itself!

console.log(document.getElementsByClassName("btn")); // This is like getElementById and getElementsByTagName
// it doesn't need any dot inside -- This is like getElementById which doesn't need any # inside!
// THIS ALSO GIVES US A HTML COLLECTION => HTMLCollection(5)

