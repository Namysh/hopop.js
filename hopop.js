function hopop(selector, content_function, poos = "bottom"){
    let firstCharacter = selector.substring(0, 1);
    let followingCharacters = selector.substring(1, selector.length);
    let elementArray = [];
    let posList = ["top", "right", "bottom", "left"];
    //pos = pos in posList && pos;
    var pos = posList.indexOf(poos) > -1 && poos;
    !pos && console.error(`La position "${poos}" n'est pas valide`);
    switch(firstCharacter){
        case ".":
            elementArray =  [...document.getElementsByClassName(followingCharacters)];
        break;

        case "#":
            elementArray = [document.getElementById(followingCharacters)];
        break;

        case "&":
            elementArray = [];
        break;
    }

    elementArray.forEach( (element) => {
       
        // On récupère le contenu du pop (HTML)
        var content = content_function(element);
        element.addEventListener("mouseover", (e) => {
            // On génere un ID aléatoire
            let id =Math.floor((Math.random() * 10000) + 1);
            // On attribu l'ID aléatoire à l'attribut aria-describedby
            e.currentTarget.setAttribute("aria-describedby",id);
            // On prépare la création du code HTML pour le popup
            var popover = document.createElement("div");
            // TODO ADD SPAN ARROW en fonction de la place du popup genre en haut a droite etc
            // On affecte des attributs au popup    
            popover.setAttribute("id","popup"+id);
            popover.setAttribute("class","hopop");
            popover.innerHTML = content;
            // On insère le tout à la fin du code HTML
            document.body.lastElementChild.after(popover);
            // On place le popup dessous le parent en prenons compte de certains paramètres
            let currentElementData = e.currentTarget.getBoundingClientRect();
            let currentPopoverData = popover.getBoundingClientRect();
            currentElementData.detailledData = window.getComputedStyle(element);
            // Valeur de tailles et de positions des éléments
            let get = {
                currentElementX : currentElementData.left + window.scrollX,
                currentElementY : currentElementData.top + window.scrollY,
                currentElementWidth : currentElementData.width,
                currentElementHeight : currentElementData.height,
                currentPopoverWidth : currentPopoverData.width,
                currentPopoverHeight : currentPopoverData.height,
            
            };

            popover.style.top = pos === "bottom" ? get.currentElementY + get.currentElementHeight + 5 + "px" :
                                pos === "right" ? get.currentElementY + get.currentElementHeight / 2 - get.currentPopoverHeight / 2 + "px" :
                                pos === "top" ? get.currentElementY - get.currentPopoverHeight - 5 + "px" :
                                pos === "left" ? get.currentElementY + get.currentElementHeight / 2 - get.currentPopoverHeight/2 + "px" :
                                " 0 px";
            //TODO pb si l'image a pas chargé alors le height sera mauvais et du coup ca va mal positionner au debut
            popover.style.left = pos === "bottom" ? ( get.currentElementX + get.currentElementWidth / 2 - get.currentPopoverWidth / 2 ) >= 0 ?
                                 (get.currentElementX + (get.currentElementWidth / 2) - (get.currentPopoverWidth / 2 ) + "px") :
                                 (0 + "px") : 
                                 pos === "right" ? (get.currentElementX + get.currentElementWidth) + 5 + "px" : 
                                 pos === "top" ? (get.currentElementX + (get.currentElementWidth / 2) - (get.currentPopoverWidth / 2)) + "px" :
                                 pos === "left" ?   get.currentElementX - 5   - get.currentPopoverWidth + "px" :
                                 "0 px";
            // option popup top ou interieur top, gauche ou interieur gauche etc
        });

        element.addEventListener("mouseout", (e) => {
            // On récupère l'ID du aria-describedby de l'élément
            let id = e.currentTarget.getAttribute("aria-describedby");
            // Si l'ID est valide
            if(id!=null && id!=""){
                // On récupère le popup associé
                let item  = document.getElementById("popup"+id);
                // On supprime le popup
                item.parentNode.removeChild(item);
                // On enlève l'attribut aria-describedby à l'élément
                e.currentTarget.removeAttribute("aria-describedby");
            }
        });
    });

}    