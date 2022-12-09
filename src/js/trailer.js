import * as basicLightbox from 'basiclightbox';

function createTrailerLink(elementRef) {

    //   console.log("🚀  elementRef", elementRef);
    const ids = Number(elementRef);

    //   trailerBtn.forEach(el =>
    //     el.addEventListener('click', e => {
    //       drawModalForTrailler(e.target.dataset.id);
    //     }),
    //   );
    drawModalForTrailler(ids)
    function drawModalForTrailler(ids) {
        const ApiKey = '22fa368820f7f9af3c30ea0e6b34461d';
        const url = `https://api.themoviedb.org/3/movie/${ids}/videos?api_key=${ApiKey}&language=en-US`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const id = data.results[0].key;
                console.log("🚀  id", id);
                const instance = `https://www.youtube.com/embed/5e382d1b4ca676001453826d'frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; 
        picture-in-picture" allowfullscreen`
                // instance.show();

                console.log("🚀  instance", instance);
                // modalClBtTrailer(instance);
            })
            .catch(() => {
    //             const instance = basicLightbox.create(`
    // <iframe width="560" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    //   `);

                // console.log("🚀  instance", instance);

                // instance.show();
                // modalClBtTrailer(instance);
            });
    }

    function modalClBtTrailer(instance) {
        const button = document.createElement('button');
        button.classList.add('trailer')
    }
}
export default { createTrailerLink };