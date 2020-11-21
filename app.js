let $muffinForm = document.querySelector('#create-muffin-form')

$muffinForm.addEventListener('submit', postMuffin)

// get muffins fromi backend
let backendURL = 'http://localhost:3000/'

fetch( backendURL + 'muffins' )
    .then( (response) => {
        return response.json()
    })
    .then( ( muffins ) => {
        for( let muffin of muffins){
            //create an element
            let $newMuffinCard = document.createElement('div')

            //manipulate that element
            $newMuffinCard.classList.add('muffin-card')
            $newMuffinCard.innerHTML = `
                <h3>${muffin.name}</h3>
                <p>${muffin.description}</p>
            `
            //append that element to an existing element
            document
                .querySelector('#muffin-container')
                .append($newMuffinCard)
        }
    })


function postMuffin(event){
    event.preventDefault()
    let formData = new FormData($muffinForm)
    let muffinName = formData.get('muffin-name')
    let muffinDescription = formData.get('description')
    fetch( backendURL + 'muffins', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(
            {
                "name": muffinName,
                "description": muffinDescription
            }
        )
    })
        .then( response => response.json( ))
        .then(console.log)
}