let cards = [];

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
cards.forEach(function(card){
    value.push(card%13 + 1);
    suit.push(parseInt(card/13));
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




