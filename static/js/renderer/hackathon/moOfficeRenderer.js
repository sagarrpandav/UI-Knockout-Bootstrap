function moOfficeRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents) {

    htmlComponents.paragraph.classList.add("text-info");
    td.appendChild(htmlComponents.paragraph);
    return td;
};