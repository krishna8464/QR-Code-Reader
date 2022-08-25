const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInPut = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close"),
copyBtn = wrapper.querySelector(".copy");

function  fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code...!";
    // Sending post request to qr server  api with passing
    // Form data as body and getting respond from it
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json() ).then(result => {
        result = result[0].symbol[0].data;        
        infoText.innerText =result ? "Uplode QR Code to Scane" : "Could't Scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText =  "Could't Scan QR Code";
    })
}

fileInPut.addEventListener("change", e => {
    let file = e.target.files[0]; //getting user selected file
    if(!file) return;
    let formData = new FormData(); //creating a new FormData object
    formData.append("file", file); //adding selected file to formData
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
    let text =  wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInPut.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));