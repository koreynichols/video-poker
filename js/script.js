let imageLink = '/images/cardImages/';
let cardImages = ['AS.jpg',
                  '2S.jpg',
                  '3S.jpg',
                  '4S.jpg',
                  '5S.jpg',
                  '6S.jpg',
                  '7S.jpg',
                  '8S.jpg',
                  '9S.jpg',
                  '10S.jpg',
                  'JS.jpg',
                  'QS.jpg',
                  'KS.jpg',
                  'AC.jpg',
                  '2C.jpg',
                  '3C.jpg',
                  '4C.jpg',
                  '5C.jpg',
                  '6C.jpg',
                  '7C.jpg',
                  '8C.jpg',
                  '9C.jpg',
                  '10C.jpg',
                  'JC.jpg',
                  'QC.jpg',
                  'KC.jpg',
                  'AD.jpg',
                  '2D.jpg',
                  '3D.jpg',
                  '4D.jpg',
                  '5D.jpg',
                  '6D.jpg',
                  '7D.jpg',
                  '8D.jpg',
                  '9D.jpg',
                  '10D.jpg',
                  'JD.jpg',
                  'QD.jpg',
                  'KD.jpg',
                  'AH.jpg',
                  '2H.jpg',
                  '3H.jpg',
                  '4H.jpg',
                  '5H.jpg',
                  '6H.jpg',
                  '7H.jpg',
                  '8H.jpg',
                  '9H.jpg',
                  '10H.jpg',
                  'JH.jpg',
                  'QH.jpg',
                  'KH.jpg'];
let cards = [];

let image = document.querySelectorAll('img.card');
for(let i = 0; i < 5; i++){
    let newCard = Math.floor(Math.random()*52);
    let matchingCard = false;
    if(i == 0){
        cards.push(newCard);
    }else {
        cards.some(function(card) {
            if(newCard == card){
                i--;
                matchingCard = true;
                return;
            }
        });
        if(!matchingCard){
            cards.push(newCard);
        }
    }
}
console.log(cards);
let value = [];
let suit = [];
let i = 0;
cards.forEach(function(card){
    value.push(card%13 + 1);
    suit.push(parseInt(card/13));
    let imageSrc = imageLink + cardImages[card];
    image[i].src=imageSrc;
    i++;
});

console.log(value);
console.log(suit);
suit.forEach(function(s){
switch(s){
    case 0:
        console.log('spade');
        break;
    case 1:
        console.log('club');
        break;
    case 2:
        console.log('diamond');
        break;
    case 3:
        console.log('heart');
        break;
    default:
        console.log('broken');
}
})




