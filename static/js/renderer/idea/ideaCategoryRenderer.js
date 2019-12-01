function ideaCategoryRenderer(instance , td , row , col , prop , value , cellProperties)
{
    var paragraph=document.createElement("p");
    var bold=document.createElement("b");
    paragraph.classList.add("text-info");
    bold.innerText=value;
    paragraph.appendChild(bold);

    Handsontable.dom.empty(td);

    td.appendChild(paragraph);

    return td;
};