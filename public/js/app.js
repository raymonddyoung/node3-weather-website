console.log('client side js loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })


fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data)=> {

        if (data.error) {
            console.log (data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })
})

const weatherForm = document.querySelector('form')

const search  = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent=''
messageTwo.textContent=''


//messageOne.textContent='ssss'

weatherForm.addEventListener('submit', (e)=> {

    e.preventDefault() //prevent from refreshing the page

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location) .then((response) => {
    response.json().then((data)=> {

        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent= ''
            //console.log (data.error)
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
        }
        
    })
})


    //console.log(location)
})