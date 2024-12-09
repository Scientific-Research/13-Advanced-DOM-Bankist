"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window

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

console.log("---------------------Completing the BANKIST Project-------------");

// Button Scrolling:
// adding addEventListener
btnScrollTo.addEventListener("click", (e) => {
  // section1.setAttribute("href", "section--1");

  // Firts of all, we have to get the coordinates of the section1, where we want to go:
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // OR if we want to know about the coordinates of the 'learn more' button, where we click from:
  console.log(e.target.getBoundingClientRect());

  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset); // Current scroll (X/Y) 8.800000190734863 0

  console.log(
    `height/width viewport`,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // height/width viewport 678 721

  // AND NOW THE QUESTION: WHERE WE WANT TO SCROLL: WE HAVE TO GIVE THESE COORDINATIONS TO THE FOLLOWING METHOD IN window OBJECT:
  // NOTE: we choose only left and top => we want to have only movements in vertical position => top and we don't want to have movement in horizontal position!

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset, // we have to add these two offsets, otherwise, it works relative to the viepwort height and width but we need relative to the coordinations of the page!
  //   s1coords.top + window.pageYOffset // It means curren position + current scroll
  // ); // NOW, IT WORKS WELL!

  // Even much better and smooth creating an object + behaviour:
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,

  //   behavior: "smooth",
  // });

  // BUT THERE IS STILL A MODERN WAY TO DO THAT => WITHOUT ALL ABOVE THE WIERD POSITIONS AND CALCULATIONS: => we give the destination address(section1) and the object with one property!
  section1.scrollIntoView({ behavior: "smooth" }); // AND IT WORKS WELL JUST THE SAME
});

//////////////////////////////////////////////////
// Page Navigation:

// First of all, Implementing the page Navigation WITHOUT using the Event Delegation:

// 1. GETTING THE ALL THREE LINKS => using querySelectorAll gives us a nodeList and with help of Foreach we can attach the addevenetlistener to each of them:
// NOTE: All the thrre links on the TOP of the page ahve the same class: .nav__link

document.querySelectorAll(".nav__link").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault(); // to prevent from jumping to the sections!

    // WE HAVE TO GET THE href FOR EVERY LINK AND SEND IT TO THE SECTION AS ID. WHEN EVERY SECTION SEES ITS OWN ID AFTER CLICKING ON THE RESPECTED LINK => IT WILL MOVES SMOOTHLY TO THAT SECTION:
    const id = e.target.getAttribute("href");
    console.log(id); // #section--1, #section--2, #section--3

    // section1.scrollIntoView({ behavior: "smooth" });
    if (id === "#section--1") {
      document
        .querySelector("#section--1")
        .scrollIntoView({ behavior: "smooth" });
    } else if (id === "#section--2") {
      document
        .querySelector("#section--2")
        .scrollIntoView({ behavior: "smooth" });
    } else if (id === "#section--3") {
      document
        .querySelector("#section--3")
        .scrollIntoView({ behavior: "smooth" });
    }
  });
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

const header = document.querySelector(".header"); // send us the first element matches this class
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

console.log("--------------------Creating and Inserting Elements----------");

//.insertAdjacentHTML => we used this already in bank application to create movements!

// We create now a DOM element from div HTML Element but it is not still on the page => therefore, we can not use it yet and we have to manually insert it on the page!
const message = document.createElement("div");
console.log(message); // div
message.classList.add("cookie-message"); // add a class to the div
// message.textContent =
//   "We use cookies for improved functionality and analytics!";

message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // This is a text and a nicely formatted button!

// and now, we want to put it in the DOM, somewhere in the header:
// we select the header and then append our message to that element:

// NOTE: prepend actually add the message as first child to the header!
header.prepend(message); // and now it is in DOM and wee see it on the page on top of the header!

// NOTE: if we want to add message as last child to the header, we use append instead of prepend. In this case we see the message as last element(child) at the bottom of the header section in HTML and also at page!

header.append(message);
// A DOM ELEMENT IS UNIQUE AND CAN MOVE FROM TOP TO BOTTOM With prepend AND append. It can only be in ONE PLACE like a PERSON that can be only in one place and not in two places at the same time!

// BUT IF WE WANT TO HAVE THE MESSAGE IN MORE THAN ONE PLACE => we make a copy which is a Node copy(several copies) and true to do a deep copy for all child elements!
// header.append(message.cloneNode(true)); // we see the message in both top and botton the header section => but this is the case that we don't want in most cases!

console.log("---------------------INSERTING ELEMENT WITH BEFORE AND AFTER---");
// THERE ARE TWO MORE METHODS:

// header.before(message); // put the message before header element!
// header.after(message); // put the message after header element!

console.log("-----------------------------DELETING ELEMENTS----------------");
// DELETE ELEMENTS:
// DELTE THE MESSAGE WHEN WE CLICK ON THE Got it! BUTTON!

document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  // we don't need to add this here again because the message is already in DOM memory: message.classList.add("cookie-message"); // add a class
  message.remove();

  // THE OLD SCHOOL WAY TO REMOVE - BUT IT STILL IS WORKING:
  // message.parentElement.removeChild(message);
});

console.log("------------------------------Styles------------------------");

// Styles => These are inline styles.
message.style.backgroundColor = "#37383d"; // give the color to the message
message.style.width = "100vw"; // set the width of the message element to 100% of the viewport width! => in this case the message would be from left to the right of the page!

// Is it possible to read the style properties?
console.log(message.style.height); // no answer, because we didn't set it already manually!
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

console.log(message.style.color); // no answer, because this feature in in the class (cookie-message) in style.css file and we didn't set it manually as an inline style!

// we can get all feature in our CSS whether the features which are in style.css or the one that we entered manually as inline-styles!
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 43.4px

// adding 40px to the height of message:
console.log(getComputedStyle(message).height); // 43.4px

const extraHeight = 30;
message.style.height =
  parseFloat(getComputedStyle(message).height) + extraHeight + "px";
console.log(message.style.height);

// WORKING WITH CSS CUSTOM PROPERTIES => CSS VARIABLES!
// when we want to select the root elements(CSS variables) in Style.css, we can use the document.documentElement which is root!

console.log("-----------------------setProperty for CSS VARIABLES----------");

document.documentElement.style.setProperty("--color-primary", "orangered"); // in this case, the color of all elements with --color-primary variable will change to the orangered!

// NOTE: for CSS Variables, we should always use the setProperty as we used it above! The regular style method like this: message.style.backgroundColor will not work!
// BUT OTHER WAY AROUND IT WORKS: WE CAN ALWAYS USE setProperty FOR BOTH CSS VARIABLES AND REGULAR STYLE METHOD! BUT FOR REGULAR STYLE METHOD, IT WOULD BE MUCH EASIER TO USE THIS METHOD AND NOT setProperty!

console.log("--------------------------Attributes----------------------------");

// Attributes are like src, alt, class and id for img Element!

// Reading the Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); // Bankist logo

// to get the absolute URL path:
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png which is different from what we have in HTML and this is the absolute URL.
// What we have in HTML file is a relative URL => src="img/logo.png" to the folder where the index.html is located!

// to get the relative URL path:
console.log(logo.getAttribute("src")); // with this we can get the relative address: img/logo.png

// to get the href for a link:
const link = document.querySelector(".nav__link--btn");
console.log(link.href); // http://127.0.0.1:8080/?# => gives us the absolute URL path
console.log(link.getAttribute("href")); // # gives us the relative URL path

// Data Attributes:
console.log(logo.dataset.versionNumber); // 3.0 => data-version-number="3.0" must always beginns with data word, otherwise it will not work!

// Classes
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // it is contains but not includes like what we had already in arrays!

// OR WE CAN SET THE NAME OF THE CALSS: => Don't use that because it overwrite all the existing classes with this name and we can only have one class on any element!
// NOTE: THE BEST WAY IS TO USE THE ABOVE CLASSLIST, BECAUSE IT WILL NOT INTERFER THE EXISTINGS CLASSES AND WE CAN HAVE DIFFERENT CLASSEAS FOR EVERY ELEMENT!
// logo.className = "Jonas"; // WE DON'T USE THAT!!!

console.log(logo.className); // nav__logo

// Setting the Attributes
logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer); // undefined
console.log(logo.getAttribute("designer")); // Maximilian
// OR creating a new Attribute without touching the HTML file:
logo.setAttribute("company", "Bankist"); // company="Bankist"

console.log("-------------Types of Events and Event Handlers---------------");

// Mouse Enter Event => is like the hover in CSS:
const h1 = document.querySelector("h1");

const alerth1 = () => {
  alert("addEventListener: Great! You are reading the heading :D");
  h1.style.color = "dodgerblue";

  // h1.removeEventListener("mouseenter", alerth1);
  // It will remove the event and listen to the event only once! => when i again enter the mouse => the alert will not appear until i refresh the page again!
  // IT MEANS WITH THIS REMOVEEVENTLISTENER, THE FUNCTION RUNS ONLY ONE TIME(THE FUNCTION LISTENS ONLY ONCE).
};

h1.addEventListener("mouseenter", alerth1);

// We can also say after how many seconds the addeventlistener has to be removed?
setTimeout(() => h1.removeEventListener("mouseenter", alerth1), 3000);

// THE SECOND WAY TO SHOW THE MESSAGE WHEN MOUSE ENTERS => But this is a bit OLD SCHOOL WAY and now, we use addEventListener() like what we used above!
// h1.onmouseenter = () => {
//   alert("mouseenter: Great! You are reading the heading :D");
// };

// WHY addEventListener is better? => it has two advantages:
// 1. we can add multiple eventListener to the same Event:
// But with mouseenter => the second one will overwrite the first one!

// 2. We can remove an eventHandler in the case that we don't need it anymore!
// FIRST, WE HAVE TO A FUNCTION WITH NTHE SAME CONTENTS AND CALL IT AS CALLBACK FUNCTION IN ADDEVENTLISTENER:

// Another way of handling an event is using an HTML attribute: => BUT RECOMMENDED TO NOT BE USED, THIS IS AN OLD SCHOOL WAY:
// <!-- <h1 onclick="alert('HTML alert')"> OLD SCHOOL; NOT RECOMMENDED TO USE THIS!-->

console.log("-------------------------Event Propagation in Practice-------");

// Random color => rgb(255,255,255)

// GET A RANDOM NUMBER:
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
console.log(randomInt(1, 6));

// HOW TO CREATE A RANDOM CLOR FOLLOWING THE RANDOM NUMBER PROCEDURE:
const randomColor = (min, max) =>
  `rgb(${randomInt(min, max)},${randomInt(min, max)},${randomInt(min, max)})`;

console.log(randomColor(0, 255));

// connect the addEvenetListener to all the nav-links on top of the page:
// FIRST ONE FOR Features:
document.querySelector(".nav__link").addEventListener("click", (e) => {
  // console.log("LINK");
  // In addEventListener(),  this points to the elemnet which is connected to that and that element is a link here => nav__link

  // NOTE: the this keyword will not work with ARROW FUNCTION AS EXPECTED:
  // SOLUTIONS:
  // 1. USING REGULAR FUNCTION OR 2. USING event.target instead of this keyword => I use the second
  // this.style.backgroundColor = randomColor(0, 255);
  // e.target.style.backgroundColor = randomColor(0, 255); // The features get the random colors!
  // console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === e.target); // ONLY HERE FOR .nav__link IS TRUE!

  // WE CAN EVEN STOP THE PROPAGATION:
  // e.stopPropagation(); // The other two parent elements didn't change its color and also we don't see the info from other links in the terminal => the event never arrived at those two elements, that's why handling didn't happend and all because of we stopped the event propagation!

  // WHEN WE HAVE TO STOP THE PROPAGATION:
  // Stopping the event propagation like this can sometimes be very helpful and fix the problems in very complex applications with many handlers for the same events!
  // BUT IN GENERAL IS NOT A GOOD IDEA TO STOP THE PROPAGATION OF EVENTS!
});

// SECOND ONE FOR nav__links which is the parent of nav__link and includes the complete block of the nav:
document.querySelector(".nav__links").addEventListener("click", (e) => {
  // console.log("LINK");
  // e.target.style.backgroundColor = randomColor(0, 255); // The whole block of nav get the random colors when i click on the nav block!
  // console.log("CONTAINER", e.target, e.currentTarget); // e.currentTarget: current link attached to the handler --- e.target: event BUBBLING
  console.log(e.currentTarget === e.target); // false
});

document.querySelector(".nav").addEventListener(
  "click",
  (e) => {
    // console.log("LINK");
    // e.target.style.backgroundColor = randomColor(0, 255);
    // console.log("NAV", e.target, e.currentTarget);
    console.log(e.currentTarget === e.target); // false
  }
  // true //the eventhandler no longer listen to the bubbling events, but instead listen to the capturing phase! and now NAV is at TOP because of capturing Phase and two others are still waiting for the Bubbling Event and happens after NAV because these feature for them is false as default!=> but nowadays it uses rarely and we can set it as false which is default!
);

// NOTE: When i click on the Features nav link, all the three get the same class => nav__link which comes from e.target because all three handlers are handling the same event and that is because event BUBBLING!
// WHAT DOES IT MEANS event BUBBLING: the event originates here in this link and then it bubbles up to its parent element which is nav__links and from there to its next parent element which is nav and go further up in the DOM TREE!
