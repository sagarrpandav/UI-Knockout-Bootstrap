function ideaSummaryRenderer(instance , td , row , col , prop , value , cellProperties)
{
    var paragraph=document.createElement("p");
    paragraph.classList.add("text-primary");
    paragraph.innerText=value;

    Handsontable.dom.empty(td);

    td.appendChild(paragraph);

    return td;
};