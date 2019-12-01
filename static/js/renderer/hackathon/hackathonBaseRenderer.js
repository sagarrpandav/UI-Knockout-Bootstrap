function hackathonBaseRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.dom.empty(td);

    var paragraph = document.createElement("p");
    var bold = document.createElement("b");
    var center = document.createElement("center");
    var button=document.createElement("button");

    paragraph.innerText = value;

    var htmlComponents = {
        paragraph: paragraph,
        bold: bold,
        center: center,
        button : button
    };

    switch (prop) {
        case "eventName":
            return eventNameRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents);
        case "moOffice":
            return moOfficeRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents);
        case "dateConducted":
            return dateRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents);
        case "totalIdeas":
            return totalIdeasRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents);
        case "":
            return viewIdeaButtonRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents);
    }
};