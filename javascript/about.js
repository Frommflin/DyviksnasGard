
// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

function getAbouts(){
    $.ajax({
        url: "./php/getAbouts.php",
        method: "POST",
        success: function(data){
            let resultset=data.childNodes[0];

            str = ``;
            // Iterate over all nodes in root node (i.e. abouts)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="about"){
                    let about =  resultset.childNodes.item(i);
                    
                    let info = makeParagraphs(about.attributes["description"].nodeValue, "print");

                    str += `<div class="about">`;                    
                    str += `<img src="./images/${about.attributes["img"].nodeValue}" alt="Om ${about.attributes["name"].nodeValue}">`;
                    str += `<div>`;
                    str += `<h1>${about.attributes["name"].nodeValue}</h1>`;
                    str += info;
                    str += `</div>`;
                    str += `</div>`;
                }
                document.getElementById("abouts").innerHTML = str;
            }
        },
        error: function (error) {
            alert(`Något gick fel. Testa ladda om sidan.`);
        }
    })
}