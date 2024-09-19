import "./style.css";

const contacts = [];
const ul = document.getElementById("contactList");

const form = document.getElementById("contactForm");
form.addEventListener("submit", addContact);

function fetchContacs() {
  //localStorage
}

function addContact(event) {
  event.preventDefault();
  const { elements } = event.currentTarget;
  const input = elements.namedItem("fullName");
  const contactName = formatName(input.value);

  if (isFieldEmpty(contactName)) {
    alert("El nombre no puede estar vacío.");
    return;
  }

  if (isContactDuplicate(contactName)) {
    alert("El contacto ya existe.");
    return;
  }

  const contact = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    name: contactName,
  };

  contacts.push(contact);
  //updateLocalStorage();
  renderContact(contact);

  form.reset();
}

function formatName(fullName) {
  const names = fullName.trim().split(" ").filter(Boolean);

  const formattedNames = names.map((name) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const remaingLetters = name.slice(1).toLowerCase();
    return firstLetter + remaingLetters;
  });

  return formattedNames.join(" ");
}

function isFieldEmpty(value) {
  return value === "";
}

function isContactDuplicate(name) {
  return contacts.some((contact) => contact.name === name);
}

function renderContact(contact) {
  const li = document.createElement("li");
  li.id = contact.id;
  const span = document.createElement("span");
  span.innerText = contact.name;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  li.appendChild(span);
  li.appendChild(btnEdit);
  li.appendChild(btnDelete);
  ul.appendChild(li);
}

function saveContacts() {}

function countContacts() {}

function editContact() {}

function deleteContact() {}

function sortContacts() {}
