import "./style.css";

let contacts = [];
const ul = document.getElementById("contactList");
const contactsCounter = document.getElementById("contactCounter");
fetchContacs();
const form = document.getElementById("contactForm");
form.addEventListener("submit", addContact);
const btnSort = document.getElementById("sortContacts");
btnSort.addEventListener("click", sortContacts);
let isEditing = false;

function sortContacts() {
  if (isEditing) return;
  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  ul.innerHTML = "";
  sortedContacts.forEach(renderContact);
  updateContactsCounter();
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
  updateContactsCounter();
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
  isEditing = true;
  const contact = contacts.find((contact) => contact.id === id);
  contacts = contacts.filter((contact) => contact.id !== id);
  updateStorage();
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "text";
  input.value = contact.name;
  input.name = "editName";

  const form = document.createElement("form");
  form.addEventListener("submit", (event) => saveContact(event, id));

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

function saveContact(event, id) {
  event.preventDefault();
  const { elements } = event.currentTarget;
  const input = elements.namedItem("editName");
  const contactName = formatName(input.value);

  if (isFieldEmpty(contactName)) {
    alert("El nombre no puede estar vacío.");
    return;
  }

  if (isContactDuplicate(contactName)) {
    alert("El contacto ya existe.");
    return;
  }

  const updatedContact = {
    id: id,
    timestamp: Date.now(),
    name: contactName,
  };

  contacts.push(updatedContact);
  updateStorage();

  const li = document.getElementById(id);
  const span = document.createElement("span");
  const form = li.querySelector("form");
  span.innerText = contactName;
  li.replaceChild(span, form);
  const btnEdit = li.querySelector("button");
  btnEdit.style.display = "inline";
  isEditing = false;
  updateContactsCounter();
}

function deleteContact(id) {
  const li = document.getElementById(id);
  ul.removeChild(li);
  contacts = contacts.filter((contact) => contact.id !== id);
  updateStorage();
  updateContactsCounter();
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
