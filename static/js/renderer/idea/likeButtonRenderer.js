function likeButtonRenderer(instance , td , row , col , prop , value , cellProperties)
{
    var button=document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-info");

    console.log("Liked : ");
    console.log(value);
    if(!value)
    {
        button.innerHTML="<i class='fa fa-thumbs-up fa-lg'>";
        button.addEventListener("click",myObj.goToLike);
    }
    else{

        button.innerHTML="<i class='fa fa-thumbs-down fa-lg'>";
        button.addEventListener("click",myObj.goToDislike);
    }
    Handsontable.dom.empty(td);

    td.appendChild(button);
};