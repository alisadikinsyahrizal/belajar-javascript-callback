//Ajax 
// $('.Button-movie').on('click', function () {
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=e2d9a0da&s=' + $('.Search-Movies').val(),
//         success: movies => {
//             const film = movies.Search;
//             let card = '';
//             film.forEach(m => {
//                 card += cardDetails(m);
//             });
//             $('.card-container').html(card);
//             // Ketika Tombol Show Detail di Click
//             $('.modal-detail').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=e2d9a0da&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         moviedetail = filmMovieshow(m);
//                         $('.modal-body').html(moviedetail);
//                     }
//                 });
//             });

//         },
//         error: (a) => {
//             console.log('Data Error')
//         }

//     });
// });



// fetch
// const tombol = document.querySelector('.Button-movie');
// tombol.addEventListener('click', function () {
//     const pencarian = document.querySelector('.Search-Movies');
//     fetch('http://www.omdbapi.com/?apikey=e2d9a0da&s=' + pencarian.value)
//         .then(success => success.json())
//         .then(success => {
//             const movies = success.Search;
//             let cards = '';
//             movies.forEach(m => cards += cardDetails(m));

//             const moviecontainer = document.querySelector('.card-container');
//             moviecontainer.innerHTML = cards;

//             // Ketika Tombol Detail diklik
//             const ModalDetailButton = document.querySelectorAll('.modal-detail');
//             ModalDetailButton.forEach(but => {
//                 but.addEventListener('click', function () {
//                     const omdbid = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=e2d9a0da&i=' + omdbid)
//                         .then(berhasil => berhasil.json())
//                         .then(m => {
//                             const detail = filmMovieshow(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = detail;
//                         });
//                 });
//             });
//         });
// });

// Fetch Defaktori
const tombol = document.querySelector('.Button-movie');
tombol.addEventListener('click', async function () {
    const pencarian = document.querySelector('.Search-Movies');
    const movies = await GetMovies(pencarian.value);
    UpdateDetail(movies);


});

// Event Binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail')) {
        const omdbid = e.target.dataset.imdbid;
        const Detail = await GetDetail(omdbid);
        UpdateGetDetail(Detail);
    }
});

function GetMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=e2d9a0da&s=' + keyword)
        .then(success => success.json())
        .then(success => success.Search);
}


function GetDetail(omdbid) {
    return fetch('http://www.omdbapi.com/?apikey=e2d9a0da&i=' + omdbid)
        .then(berhasil => berhasil.json())
        .then(m => m);
}

function UpdateGetDetail(m) {
    const detail = filmMovieshow(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = detail;
}

function UpdateDetail(movies) {
    let cards = '';
    movies.forEach(m => cards += cardDetails(m));
    const moviecontainer = document.querySelector('.card-container');
    moviecontainer.innerHTML = cards;
}


function cardDetails(m) {
    return `<div class="col-sm-4 col-md-4 my-3">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${m.Poster}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                            <a href="#" class="btn btn-primary modal-detail" data-toggle="modal" data-target="#moviesModal" data-imdbid="${m.imdbID}">Show Detail</a>
                        </div>
                </div>
            </div>`;
}

function filmMovieshow(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-5">
                        <img src="${m.Poster}" alt="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Judul :</strong> ${m.Title} ${m.Year}</li>
                            <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot :</strong> ${m.Plot} </li>

                        </ul>
                    </div>
                </div>
            </div>`;
}