
// API-KEY: RjbdA12nhW2enhVwYr6SHBVnhL5Iae3JuCtSgCJy
let spaceNameInput = document.querySelector("#spaceName");
let submitBtn = document.querySelector("#submitBtn");
let switchBtn = document.querySelector("#switchBtn");
let bodyRef = document.querySelector("body"); //Referens till Body för att kunna skapa dark-mode
let welcomeName = document.querySelector(".welcome"); //Kunna applicera ett namn från form
let formRef = document.querySelector("form");
let cardContainerRef = document.querySelector(".card-container");
let apiRef = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=RjbdA12nhW2enhVwYr6SHBVnhL5Iae3JuCtSgCJy";

//När jag klickar på slidern(switchbtn) ska darkmode aktiveras
switchBtn.addEventListener("click", function() {
    bodyRef.classList.toggle("dark");
});

/* Kontrollerar om det finns minst 3 tecken i textfältet. Om det är färre så är submitBtn disabled */
spaceNameInput.addEventListener("keyup", function(){
    let nameLength = spaceNameInput.value.length;
    if(nameLength >= 3) {
        submitBtn.disabled = false; 
    } else {
        submitBtn.disabled = true;
    }
})
/* Kontrollerar om textfältet är i fokus */
spaceNameInput.addEventListener("focus", function(){
    spaceNameInput.classList.toggle("focusStyle");
})
/* Kontrollerar om textfältet inte är i fokus */
spaceNameInput.addEventListener("blur", function(){
    spaceNameInput.classList.toggle("focusStyle");
})
/*Vad som händer vid klick på submitBtn */
submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    //Döljer form och visar istället en välkomstfras och bilderna från Mars.
    welcomeName.innerHTML = "<h3>Welcome, "+ spaceNameInput.value+"!</h3>";
    formRef.style.display = "none";
    cardContainerRef.style.display = "flex";
})

fetch(apiRef)
.then(response => response.json())
.then(data => {
    if (data.length === 0) {
        cardContainerRef.innerHTML += "<h4>There are no pictures to show</h4>";
    } else {
        //Jag vill visa max 4 bilder
        let nbrOfPhotos;
        if (data.photos.length > 4) {
            nbrOfPhotos = 4;
        //Om det inte finns fler än 4 bilder att visa, vill jag att alla som finns ska visas
        } else {
            nbrOfPhotos = data.photos.length;
        }
        for (let i = 0; i < nbrOfPhotos; i++) {
            cardContainerRef.innerHTML += "<div class='card'><h4>"+data.photos[i].rover.name+"</h4><img src='"+data.photos[i].img_src+"' alt='A picture from Mars'><h4>"+data.photos[i].earth_date+"</h4></div>";
        }
    }
})
.catch(error => console.log("Detta är fel: "+ error));
