import "./style.css";

let contacts = [];
const ul = document.getElementById("contactList");
const contactsCounter = document.getElementById("contactCounter");
fetchContacs();
const form = document.getElementById("contactForm");
form.addEventListener("submit", addContact);
const btnSort = document.getElementById("sortContacts");
btnSort.addEventListener("click", sortContacts);
let isSorted = false;

function sortContacts() {
  if (isSorted) {
    ul.innerHTML = "";
    contacts.forEach(renderContact);
  } else {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    ul.innerHTML = "";
    sortedContacts.forEach(renderContact);
  }
  isSorted = !isSorted;
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
  updateStorage();
  renderContact(contact);

  form.reset();
}

function renderContact(contact) {
  const li = document.createElement("li");
  li.id = contact.id;
  const span = document.createElement("span");
  span.innerText = contact.name;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.addEventListener("click", () => editContact(contact.id));
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.addEventListener("click", () => deleteContact(contact.id));
  li.appendChild(span);
  li.appendChild(btnEdit);
  li.appendChild(btnDelete);
  ul.appendChild(li);
}

function editContact(id) {
  const contact = contacts.find((contact) => contact.id === id);
  const form = document.createElement("form");
  form.addEventListener("submit", () => saveContact(contact));
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "text";
  input.value = contact.name;
  const btnSave = document.createElement("button");
  btnSave.innerText = "Save";
  label.appendChild(input);
  label.appendChild(btnSave);
  form.appendChild(label);
  const li = document.getElementById(id);
  const span = li.querySelector("span");
  const btnEdit = li.querySelector("button");
  li.replaceChild(form, span);
  btnEdit.style.display = "none";
  input.focus();
  input.select();
}

function saveContact() {
  event.preventDefault();
}

function deleteContact(id) {
  const li = document.getElementById(id);
  ul.removeChild(li);
  contacts = contacts.filter((contact) => contact.id !== id);
  updateStorage();
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

function updateStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function fetchContacs() {
  const storedContacts = localStorage.getItem("contacts");
  if (storedContacts) {
    contacts = JSON.parse(storedContacts);
    contacts.forEach(renderContact);
    updateContactsCounter();
  }
}

function updateContactsCounter() {
  const totalContacts = contacts.length;
  contactsCounter.innerText = `${totalContacts}`;
}
