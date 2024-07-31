var siteNameInput = document.getElementById("siteName");
var urlInput = document.getElementById("url");
var submitBtn = document.getElementById("submitBtn");
var siteNameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https:\/\/|http:\/\/){0,1}(www\.){0,1}[\w]{1,}[\.][\w]{2,}$/;

var siteArr = JSON.parse(localStorage.getItem("Sites")) ?? [];

displaySites();

function addSiteName() {

    if(isSiteDataValid()) {
        var site = {
            name: siteNameInput.value,
            url: urlInput.value
        }
        siteArr.push(site);
    
        onSiteDateChange();
        clearForm();
    }

}

function displaySites(){
    var cartoona = "";
    for(var i = 0; i < siteArr.length; i++ ) {
        cartoona += `
            <tr>
                <td>${i}</td>
                <td>${siteArr[i].name}</td>
                <td><button onclick="visitSite(${i})" class="btn btn-visit text-white"><i class="pe-2 fa-solid fa-eye"></i>Visit</button></td>
                <td><button onclick="deleteSite(${i})" class="btn btn-danger text-white"><i class="pe-2 fa fa-trash"></i>Delete</button></td>
            </tr>
        `;
    }
    document.getElementById("siteTable").innerHTML = cartoona;
}

function deleteSite(index){
    siteArr.splice(index , 1);
    onSiteDateChange();
}

function visitSite(index) {
    var url = siteArr[index].url;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(url)) {
      open(url);
    } else {
      open(`https://${url}`);
    }
}

function onSiteDateChange(){
    localStorage.setItem("Sites", JSON.stringify(siteArr));
    displaySites();
}

function clearForm(){
    siteNameInput.value = "";
    urlInput.value = "";
    siteNameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
}

function isSiteDataValid(){
    var cartoona = "";
    var errorArr = [];
    if(!siteNameRegex.test(siteNameInput.value)){
        errorArr.push(`<li><i class="fa-regular fa-circle-right p-2"></i>Site name must contain at least 3 characters</li>`);
    }
    if(!urlRegex.test(urlInput.value)){
        errorArr.push(`<li><i class="fa-regular fa-circle-right p-2"></i>Site URL must be a valid one</li>`);
    }
    if(errorArr.length > 0) {
        for(var i = 0; i < errorArr.length; i++) {
            cartoona += errorArr[i];
        }
        document.getElementById("errorList").innerHTML = cartoona;
        var myModal = new bootstrap.Modal(document.getElementById('errorModal'));
        myModal.show();
    }
    else{
        return true;
    }
}

function validationInputValue(inputName) {
    if(inputName == 'name') {
        if(!siteNameRegex.test(siteNameInput.value)){
            siteNameInput.classList.add("is-invalid");
        }else{
            siteNameInput.classList.remove("is-invalid");
            siteNameInput.classList.add("is-valid");
        }
    }else{
        if(!urlRegex.test(urlInput.value)){
            urlInput.classList.add("is-invalid");
        }else{
            urlInput.classList.remove("is-invalid");
            urlInput.classList.add("is-valid");
        }
    }
}
