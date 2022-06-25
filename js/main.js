let poster = document.getElementById('poster'),
    title = document.getElementById('title'),
    discri = document.getElementById('discri'),
    rate = document.getElementById('rate'),
    date = document.getElementById('date'),
    movieRow = document.getElementById('movieRow'),
    searchByName = document.getElementById('searchByName'),
    nameInput = document.getElementById('nameInput'),
    emialInput = document.getElementById('emialInput'),
    phoneInput = document.getElementById('phoneInput'),
    ageInput = document.getElementById('ageInput'),
    passwordInput = document.getElementById('passwordInput'),
    moviesCategory = document.querySelectorAll('#navSlide ul li a'),
    movies = [];


// api part

async function getMovies(){
    let myResponce = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=0c913e2afdf6246f4e4c51b53f2c4d1b`);
    let myData = await myResponce.json()
    movies = myData.results;
    // console.log(movies)
    displayMovies(movies);
}
getMovies();

function displayMovies(movieArr){
    let divs = "";
    for(let i = 0; i< movieArr.length; i++){
      divs +=`       <div class="col-lg-4 col-md-6" >
       <div class="imgContainer position-relative">
        <img src="https://image.tmdb.org/t/p/w500${movieArr[i].poster_path}" class="w-100 rounded-3" alt="" id="poster"> 
        <div class="imgLayer rounded-3 d-flex align-items-center">
        <div class="imgCap text-center px-2">
            <h2 id="title">${movieArr[i].original_title}</h2>
            <p id="discri">${movieArr[i].overview}</p>
            <p >rate: <span id="rate">${movieArr[i].vote_average}</span> </p>
            <h4 id="date">${movieArr[i].release_date}</h4>
        </div>
        </div>

    </div>
    </div>`
    }
    movieRow.innerHTML = divs;
}
searchByName.addEventListener('keyup', function(){
   searchMovie(this.value);
})
async function searchMovie(movieName){
    let moviesFromSearch = [];
    let myResponce = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0c913e2afdf6246f4e4c51b53f2c4d1b&query=${movieName}`)
    let myData = await myResponce.json();
    // nnn = searchWord;
    moviesFromSearch = myData.results

    displayMovies(moviesFromSearch);
}


for (let m =0; m < moviesCategory.length; m++){
    moviesCategory[m].addEventListener('click', function(e){
       let category = moviesCategory[m].getAttribute('class');
       console.log(category)
       getMoviesCateg(category)
    })
}
async function getMoviesCateg(categ){
    let moviesCateg = [];
    if( categ == 'trending'){
        let myResponce = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0c913e2afdf6246f4e4c51b53f2c4d1b&query=${movieName}`)

    }else{
        let myResponce = await fetch(`https://api.themoviedb.org/3/movie/${categ}?api_key=0c913e2afdf6246f4e4c51b53f2c4d1b`);

    }
    let myResponce = await fetch(`https://api.themoviedb.org/3/movie/${categ}?api_key=0c913e2afdf6246f4e4c51b53f2c4d1b`);
    let myData = await myResponce.json()
    moviesCateg = myData.results;
    displayMovies(moviesCateg);
}


// validation

function nameValidation(){
    nameInput.addEventListener('keyup',function(){
        $('#invalidName').css('display' , 'block')
        let regx = /^[A-Za-z]{3,15}/
        if( regx.test(nameInput.value) == true && nameInput.value !==""){
            $('#invalidName').css('display' , 'none')
            console.log('ho')
        }
    })
}
function emailValidation(){
    emialInput.addEventListener('keyup',function(){
        $('#invalidEmail').css('display' , 'block')
        let regx = /@[a-z]{5,10}(\.com)$/
        if( regx.test(emialInput.value) == true && emialInput.value !==""){
            $('#invalidEmail').css('display' , 'none')
        }
    })
}
function phoneValidation(){
    phoneInput.addEventListener('keyup',function(){
        $('#invalidPhone').css('display' , 'block')
        let regx = /^01[015][0-9]{8}/
        if( regx.test(phoneInput.value) == true && phoneInput.value !==""){
            $('#invalidPhone').css('display' , 'none')
        }
    })
}
function ageValidation(){
    ageInput.addEventListener('keyup',function(){
        $('#invalidAge').css('display' , 'block')
        let regx = /[1-9]{1}[0-9]{1}/
        if( regx.test(ageInput.value) == true && ageInput.value !==""){
            $('#invalidAge').css('display' , 'none')
        }
    })
}
function passValidation(){
    passwordInput.addEventListener('keyup',function(){
        $('#invalidPass').css('display' , 'block')
        let regx = /[a-zA-z]{7,10}[0-9]{1,8}/
        if( regx.test(passwordInput.value) == true && passwordInput.value !==""){
            $('#invalidPass').css('display' , 'none')
        }
    })
}

(function(){
    nameValidation()
    emailValidation()
    phoneValidation()
    ageValidation()
    passValidation();
})();


// jquery

$('#slideBtn').click(function(){
    let sideWidth = $('#navSlide').outerWidth();
    if( $('#navBox').css('left') == '0px'){
        $('#slideBtn').attr('class' , 'fa fa-align-justify fs-3')
        $('#navBox').animate({left: `-${sideWidth}`},600);
        $('#navSlide li').animate({
            paddingTop: '500px',
            opacity: 0,
        },1000);
    }
    else
    {
        $('#slideBtn').attr('class' , 'fa-solid fa-xmark fs-3')
        $('#navBox').animate({left: `0px`},500,function(){
            $('#navSlide li').animate({
                paddingTop: '25px',
                opacity: 1,
            },1000);
        })
    }
});
$("#navSlide .contact").click(function() {
    $('body, html').animate({
        scrollTop: $("#contact").offset().top
    }, 2000);
});