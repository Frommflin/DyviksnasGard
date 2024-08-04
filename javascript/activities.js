function showNewEventForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Lägg till ny aktivitet</h1>`;
    str += `<button class="btn" onclick="showPage(1)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="newActivityForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Titel *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="activityName" maxlength="50" required>`;
    str += `</div>`;

    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bild *</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="activityImg" required>`;
    str += `</div>`;

    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Beskrivning *</span>`;
    str += `</div>`;
    str += `<textarea class="form-control" name="activityDesc" placeholder="Berätta om aktiviteten här"></textarea required>`;
    str += `</div>`;

    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Pris per tillfälle *</span>`;
    str += `</div>`;
    str += `<input type="number" class="form-control" name="activityPrice" min="0" required>`;
    str += `</div>`;

    str += `<button class="btn">Lägg till aktivitet</button>`;
    str += `</form>`;
    
    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

// Add a new activity
$(document).on("submit", "#newActivityForm", function(event){
    event.preventDefault();


    let title = document.querySelector("input[name='activityName']").value;
    let img = document.querySelector("input[name='activityImg']").files[0];
    let price = document.querySelector("input[name='activityPrice']").value;

    let text = document.querySelector("textarea[name='activityDesc']").value;
    let split = text.split("\n");
    let newText = split.join("¤¤");

    let activity = new FormData();
    activity.append("title", title);
    activity.append("image", img);
    activity.append("description", newText);
    
    let activityPrice = new FormData();

    //Step 1: creating activity
    $.ajax({
        url: "./php/createActivity.php",
        method: "POST",
        data: activity,
        contentType:false,
        processData:false,
        success: function(data){
            //Step 2: collecting id of created activity
            $.ajax({
                url: "./php/getRecentActivity.php",
                method: "POST",
                success: function(data){
                    let resultset = data.childNodes[0];
                    // Iterate over all nodes in root node (i.e. activities)
                    for (i = 0; i < resultset.childNodes.length; i++){
                        if(resultset.childNodes.item(i).nodeName=="activity"){
                            let activity = resultset.childNodes.item(i);

                            activityPrice.append("id", activity.attributes["id"].nodeValue);
                            activityPrice.append("price", price);
                        }
                    }

                    //Step 3: Add first price tag to created activity
                    $.ajax({
                        url: "./php/createActivityPrice.php",
                        method: "POST",
                        data: activityPrice,
                        contentType:false,
                        processData:false,
                        success: function(data){
                            //TODO: Show page with created activity
                        },
                        error: function (error) {
                            ajaxError(error);
                        }
                    })
                },
                error: function (error) {
                    ajaxError(error);
                }
            })
        },
        error: function (error) {
            ajaxError(error);
        }
    })
});

function getActivities(){
    $.ajax({
        url: "./php/getAllActivities.php",
        method: "POST",
        success: function(data){
            let resultset = data.childNodes[0];
            
            let str = ``;
            // Iterate over all nodes in root node (i.e. activities)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="activity"){
                    let activity = resultset.childNodes.item(i);

                    // Creating navigation links
                    str += `<a id="nestedActivityLink${activity.attributes["id"].nodeValue}" `;
                    str += `class="dropdown-item spaLink" href="#" `;
                    str += `onclick="showPage(7,${activity.attributes["id"].nodeValue}); `;
                    str += `getActivity('${activity.attributes["id"].nodeValue}')" >`;
                    str += `${activity.attributes["name"].nodeValue}`;
                    str += `</a>`;
                }
            }
            document.getElementById("activityLinks").innerHTML = str;

        },
        error: function (error) {
            alert(`Något gick fel. Testa ladda om sidan.`);
        }
    })
}

function getActivity(id){
    $.ajax({
        url: "./php/getActivity.php",
        method: "POST",
        data: { 
            activityId: id
        },
        success: function(data){
            let resultset = data.childNodes[0];
            let str = ``;
            // Iterate over all nodes in root node (i.e. activities)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="activity"){
                    let activity = resultset.childNodes.item(i);

                    let paragraphs = makeParagraphs(activity.attributes["description"].nodeValue, "print");

                    str += `<div id="activityData">`;
                    str += `<img src="./images/activityUploads/${activity.attributes["image"].nodeValue}">`;
                    str += `<table id="priceTable">`;
                    str += `<tr>`;
                    str += `<th>Tillfällen</th>`;
                    str += `<th>Pris</th>`;
                    str += `</tr>`;
                    str += `</table>`;
                    str += `</div>`;
                    str += `<div id="activityInfo">`;
                    str += `<h1>${activity.attributes["name"].nodeValue}</h1>`;
                    str += `<div>${paragraphs}</div>`;
                    str += `</div>`;

                    // if(localStorage.getItem("userRole") == "Admin"){
                    //     str += ``;
                    // }
                }
            }
            document.getElementById("activities").innerHTML = str;
            getActivityPrices(id);
        },
        error: function (error) {
            alert(`Något gick fel. Testa ladda om sidan.`);
        }
    })
}

function getActivityPrices(id){
    $.ajax({
        url: "./php/getActivityPrices.php",
        method: "POST",
        data: { 
            activityId: id
        },
        success: function(data){
            let resultset = data.childNodes[0];
            let str = ``;
            // Iterate over all nodes in root node (i.e. activity)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="lesson"){
                    let row = resultset.childNodes.item(i);

                    let lessons;
                    if(row.attributes["lesson"].nodeValue > 1){
                        lessons = row.attributes["lesson"].nodeValue + " tillfällen";
                    } else {
                        lessons = row.attributes["lesson"].nodeValue + " tillfälle";
                    }

                    str += `<tr>`;
                    str += `<td>${lessons}</td>`;
                    str += `<td>${row.attributes["price"].nodeValue} kr</td>`;
                    str += `</tr>`;
                    str += `<tr>`;

                    // if(localStorage.getItem("userRole") == "Admin"){
                    //     str += ``;
                    // }
                }
            }
            document.getElementById("priceTable").innerHTML += str;
        },
        error: function (error) {
            alert(`Något gick fel. Testa ladda om sidan.`);
        }
    })
}
