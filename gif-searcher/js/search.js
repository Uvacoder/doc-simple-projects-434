const SEARCH_BOX = document.getElementById("filterTag");

let GIF_DATA;

let included_array = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', './js/json/data.json', true);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            GIF_DATA = JSON.parse(xmlhttp.responseText).gifs;
        }
    }
};
xmlhttp.send(null);

function onTextInput() {
    document.querySelector(".gif-grid").innerHTML = "";
    included_array = [];
    GIF_DATA.forEach((item, index) => {
        if (item.tags.includes(SEARCH_BOX.value.toLowerCase())) {
            included_array.push(index);
        }
    });
    included_array.forEach(item => {
        let gif_container = document.createElement("DIV");
        gif_container.setAttribute("class", "gif-item");
        gif_container.style.backgroundImage = `url(${GIF_DATA[item].src})`;
        document.querySelector(".gif-grid").appendChild(gif_container);
        gif_container.addEventListener("click", () => {
            createPopup(item);
        });
    });
}

function createPopup(index) {
    document.querySelector(".popup").style.display = "block";
    GIF_DATA.forEach((item, index2) => {
        if (index2 === index) {
            document.querySelector(".popup-tags").innerHTML = "";
            GIF_DATA[index].tags.forEach(item => {
                let gif_tag = document.createElement("DIV");
                gif_tag.setAttribute("class", "popup-tags-item");
                gif_tag.appendChild(document.createTextNode(item));
                document.querySelector(".popup-tags").appendChild(gif_tag);
                gif_tag.addEventListener("click", () => {
                    document.querySelector(".popup").style.display = "none";
                    document.getElementById("filterTag").value = gif_tag.textContent;
                    onTextInput();
                });
            });
            document.querySelector(".popup-gif").style.backgroundImage = `url(${item.src})`;
            document.querySelector(".popup-title").textContent = item.name;

        }
    });
}

SEARCH_BOX.addEventListener("input", () => {
    onTextInput();
});