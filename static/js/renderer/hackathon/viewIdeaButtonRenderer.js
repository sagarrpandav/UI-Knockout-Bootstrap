function viewIdeaButtonRenderer(instance, td, row, col, prop, value, cellProperties, htmlComponents)
{
    htmlComponents.button.classList.add("btn");
    htmlComponents.button.classList.add("btn-info");
    htmlComponents.button.addEventListener("click",myObj.goToViewIdea);
    htmlComponents.button.innerText="View Ideass";

    htmlComponents.center.appendChild(htmlComponents.button);
    td.appendChild(htmlComponents.center);
};