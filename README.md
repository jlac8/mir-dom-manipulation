# Make It Real - Gestión de contactos usando JS y DOM

Solución al proyecto **Gestión de contactos usando JS y DOM** del programa top fullstack de MIR.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

- Un formulario:
  - Campo de texto para ingresar el nombre del contacto.
  - Botón para agregar el contacto.
  - Asegúrate de que el campo de texto no esté vacío antes de agregar un contacto.
  - Evita duplicados en la lista de contactos.
- Una lista vacía donde se mostrarán los contactos creados:
  - Implementa un contador de contactos que muestre cuántos contactos hay en la lista.
  - Agrega la funcionalidad de ordenar los contactos alfabéticamente.
- Cuando el usuario ingrese un nombre en el campo de texto y haga clic en el botón "Agregar", el contacto debe aparecer en la lista.
- Usa localStorage para que los contactos persistan incluso después de recargar la página.
- Cada contacto en la lista debe tener un botón para Editar y un botón para Eliminar.
- Al hacer clic en el botón "Eliminar" junto a un contacto, este debe eliminarse de la lista.
- Al hacer clic en el botón "Editar", el nombre del contacto debe volverse editable. Al hacer clic en un botón de "Guardar" (que debe reemplazar al de "Editar"), el contacto debe actualizarse en la lista con el nuevo nombre.

### Screenshot

![](./screenshot.jpg)

## My process

1. Estructura HTML (main, section, form)
2. Definir funciones (fetchContacs, addContact, validateNonEmptyField, checkForDuplicates, saveContacts, displayContacts, countContacts, editContact, deleteContact, sortContacts )
3. Agregar estilos
4. Prueba end-to-end
5. Refactorización

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.
