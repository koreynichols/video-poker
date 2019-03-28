let imageLink = '/images/cardImages/';
let cardImages = ['AS.jpg', '2S.jpg', '3S.jpg', '4S.jpg', '5S.jpg', '6S.jpg', '7S.jpg', '8S.jpg', '9S.jpg', '10S.jpg', 'JS.jpg', 'QS.jpg', 'KS.jpg',
                  'AC.jpg', '2C.jpg', '3C.jpg', '4C.jpg', '5C.jpg', '6C.jpg', '7C.jpg', '8C.jpg', '9C.jpg', '10C.jpg', 'JC.jpg', 'QC.jpg', 'KC.jpg',
                  'AD.jpg', '2D.jpg', '3D.jpg', '4D.jpg', '5D.jpg', '6D.jpg', '7D.jpg', '8D.jpg', '9D.jpg', '10D.jpg', 'JD.jpg', 'QD.jpg', 'KD.jpg',
                  'AH.jpg', '2H.jpg', '3H.jpg', '4H.jpg', '5H.jpg', '6H.jpg', '7H.jpg', '8H.jpg', '9H.jpg', '10H.jpg', 'JH.jpg', 'QH.jpg', 'KH.jpg'];
let cardsDelt = [];
let cardsToHold = [];

let dealBtn = document.querySelector('input.deal');
let image = document.querySelectorAll('img.card');
let drawBtn = document.querySelector('input.draw');

dealBtn.addEventListener('click', dealCards);
drawBtn.addEventListener('click', drawCards);

image.forEach(function(e){
    e.addEventListener('click', holdCard);
})

function dealCards() {
    cardsDelt = [];

    while(cardsDelt.length < 5){
        let newCard = Math.floor(Math.random()*52);
        if(!cardsDelt.includes(newCard)){
            let imageSrc = imageLink + cardImages[newCard];
            image[cardsDelt.length].src=imageSrc;
            cardsDelt.push(newCard);
        }
    }
    dealBtn.setAttribute('disabled', true);
    drawBtn.removeAttribute('disabled');
}

function drawCards() {
    console.log(cardsDelt.length + cardsToHold.length);
    dealBtn.removeAttribute('disabled');
    drawBtn.setAttribute('disabled', true);
}

function holdCard(e) {
    if(e.target.classList.contains('hold')){
        e.target.classList.remove('hold');
        cardsToHold = arrayRemove(cardsToHold, e.target);
    } else {
        e.target.classList.add('hold');
        cardsToHold.push(e.target);
    }
    console.log(e.target);
    console.log(cardsToHold);
}

function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
 
 }