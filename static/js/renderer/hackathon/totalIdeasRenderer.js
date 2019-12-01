function totalIdeasRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents) {
    htmlComponents.paragraph.classList.add("text-info");

    htmlComponents.bold.appendChild(htmlComponents.paragraph);
    htmlComponents.center.appendChild(htmlComponents.bold);

    td.appendChild(htmlComponents.center);
    return td;
};