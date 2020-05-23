class image {
    constructor(photo) {
        this.photo = photo;
    }
  
    render() {
        let img_src= this.built_Url();
        let div = document.createElement("div")
        div.className = "pic_frame"
        div.style.backgroundImage = `url(${img_src})`;
        div.onclick=()=>{           
            this.expand_img();
        }
        let icons = document.createElement("div");
        icons.className = "buttons";
        
        let expand = document.createElement("button");
        expand.innerHTML = '<i class="fas fa-expand"></i>';
        expand.className = "expand_icon";
        icons.appendChild(expand);
        expand.onclick = () => {
            this.expand_img()
        }
        
        let del_image = document.createElement("button");
        del_image.innerHTML = '<i class="fas fa-trash-alt"></i>';
        del_image.className = "del_image_icon"
        icons.appendChild(del_image);
        del_image.onclick= (event)=>{
            event.stopPropagation();
            div.remove();
        }

		let favorite = document.createElement("button");
		//if its a favor - full heart
		let found = false;
		//looks for ph in the favs
		//let found = finding();
		let arr = JSON.parse(localStorage.getItem("favorites"));
		let i =0;
		for(i=0 ; i<arr.length; i++){
			if(arr[i] == this.photo)
				found = true;
		}
		if(found)
			favorite.innerHTML = '<i class="fas fa-heart"></i>';		
		else
			favorite.innerHTML = '<i class="far fa-heart"></i>';
			
		icons.appendChild(favorite);
		
        favorite.onclick=(event)=>{
			event.stopPropagation();
			//if a fav then un-fav it
			if(found)
			{
				this.del_favorite();
				favorite.innerHTML = '<i class="far fa-heart"></i>';
			}
			else
			{
				this.add_favorite();
				favorite.innerHTML = '<i class="fas fa-heart"></i>';
			}
        }

        div.appendChild(icons);
        
        return div;
    }

    built_Url() {
        let src = `https://farm${this.photo.farm}.staticflickr.com/${this.photo.server}/${this.photo.id}_${this.photo.secret}.jpg`
        return src
    }
    
    expand_img(cur) {
        document.getElementById("expand_img").className="";
        document.getElementById("expand_src").src = this.photo.url_l;
        markAsCur(this.photo.url_l , cur);
    }

    add_favorite(){
		let favorites = JSON.parse(localStorage.getItem("favorites"));
        favorites.push(this.photo);
		localStorage["favorites"] = JSON.stringify(favorites);
		alert("added to favorites!");

	}
	del_favorite(){
		let favorites = JSON.parse(localStorage.getItem("favorites"));
		let i;
		for(i=0 ; i<favorites.length;i++){
			if(favorites[i]==this.photo)
				break;
		}
		favorites.splice(i, 1)
		localStorage["favorites"] = JSON.stringify(favorites);
		alert("removed from favorites!");
	}

	finding()
	{
		let arr = JSON.parse(localStorage.getItem("favorites"));
		for(i=0 ; i<arr.length; i++){
			if(arr[i] == this.photo)
				return true;
		}
		return false;
	}
}