let currentPhotos;
let currentPhoto;
let page = 1;

document.addEventListener("DOMContentLoaded", function (event) {

    let div = document.getElementById("image_gallery");
    div.addEventListener("scroll", () => { scroll_func(div) }, false);

    if (!localStorage.getItem("favorites")){
        let arr = [];
        localStorage.setItem("favorites", JSON.stringify(arr));
    }

    let tag = localStorage.getItem("tag");
    document.getElementById("txtSearch").value = tag;
    getPhotos();

}, false)

function arrowMovement(ur)
{
    let prev = new  image(currentPhotos[ur]);
    prev.expand_img(ur)
}
//var arrowFlag = true;
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (document.getElementById("expand_img").className ==="")
     {
        switch (evt.keyCode ){
            //esc
            case 27:{
                reduce_img();
                currentPhoto = null;
                break;
            }
            //left arrow
            case 37: {
              //  arrowFlag = false;
                if (currentPhoto != 0)
                var ur = currentPhoto - 1;
                arrowMovement(ur);
            //    arrowFlag = true;
                break;
            }
            //right arrow
            case 39:   {
               // arrowFlag = false;
                var ur = currentPhoto + 1;
               arrowMovement(ur);
               //arrowFlag = true;
                break;
            }
        } 
    }    
}    


function markAsCur(src , cur)
{
  if (cur) 
  {
    currentPhoto = cur;
      return;
  } 
  outer:  for (var i = 0 ; ; i++)
    {
        if(currentPhotos[i])
        if(currentPhotos[i].url_l === src )
            {
                currentPhoto = i;
                break outer;
            }
    }
}

function populatePhotos(photoArr) {
    currentPhotos = photoArr;
    let container = document.getElementById("image_gallery");
    photoArr.map(
        function (photo) {
            let img = new image(photo)
            let div=img.render();
            container.appendChild(div)
        })
}

function getPhotos() {
    let val = document.getElementById("txtSearch").value;
    if (!val) 
        return;
    localStorage.setItem("tag", val);
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=860dc345a325c43cd56de2229b5a35c7&tags=${val}&extras=url_l&format=json&nojsoncallback=1&page=${page}`;
    fetch(url)
        .then(function (response) {
            return response.json()
        }, function (response) {
            console.log("error")
        })
    .then(function (res) {
        console.log(res)
        populatePhotos(res.photos.photo)
    });
    
    page++;
}

function display_photos(){
    page = 1;
    getPhotos();
    document.getElementById("image_gallery").innerHTML = "";
    //hide the "clear favorites"
    document.getElementById("clear_favorites_btn").className="hide";
}



function checkKey(event) {
    //if hit enter
    if (event.keyCode === 13) {
        display_photos();
        //hide the "clear favorites"
        document.getElementById("clear_favorites_btn").className="hide";
    }
}

function reduce_img(){
		document.getElementById("expand_src").src = "#";
        document.getElementById("expand_img").className="hide";
        currentPhoto = null;
}


function scroll_func(o)
{
    if(o.offsetHeight + o.scrollTop == o.scrollHeight)
    {
        getPhotos();
    }
}

function display_favorite_photos(){
    let claer_favorites = document.getElementById("clear_favorites_btn");
    claer_favorites.className="";
    let favorite_photos = JSON.parse(localStorage.getItem("favorites"));
    document.getElementById("image_gallery").innerHTML = "";
    document.getElementById("txtSearch").value = "";
    populatePhotos(favorite_photos);
}

function clear_favorite_photos()
{
    let obj = JSON.parse(localStorage.getItem("favorites"));
    obj=[];
    localStorage["favorites"] = JSON.stringify(obj);
    document.getElementById("image_gallery").innerHTML="";
}