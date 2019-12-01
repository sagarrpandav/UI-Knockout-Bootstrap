function editIdeaButtonRenderer(instance , td , row , col , prop , value , cellProperties)
{
    var button=document.createElement("button");
    button.classList.add("btn");
    //button.classList.add("btn-info");
    button.innerHTML="<i class='fa fa-pencil-square-o fa-lg'>";
    button.addEventListener("click",myObj.goToEditIdea);

    Handsontable.dom.empty(td);

    td.appendChild(button);
};