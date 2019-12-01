function eventNameRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents) {
    htmlComponents.paragraph.classList.add("text-info");
    htmlComponents.bold.appendChild(htmlComponents.paragraph);

    td.appendChild(htmlComponents.bold);
    return td;
};