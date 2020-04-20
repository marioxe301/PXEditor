//html elements
const buttons = document.getElementsByClassName('buttons-items')
let selectedButton = 'pen'

// events for buttons
for(let i = 0; i < buttons.length;i++){
    buttons[i].addEventListener('click',()=>{
        let current = document.getElementsByClassName('active-button')
        current[0].className = current[0].className.replace(" active-button","")
        buttons[i].className +=" active-button"
        selectedButton = buttons[i].name
    })
}