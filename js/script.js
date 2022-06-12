const delay = 500;
let imageLink = 'images/cardImages/';
let cardImages = ['AS.jpg', '2S.jpg', '3S.jpg', '4S.jpg', '5S.jpg', '6S.jpg', '7S.jpg', '8S.jpg', '9S.jpg', '10S.jpg', 'JS.jpg', 'QS.jpg', 'KS.jpg',
                  'AC.jpg', '2C.jpg', '3C.jpg', '4C.jpg', '5C.jpg', '6C.jpg', '7C.jpg', '8C.jpg', '9C.jpg', '10C.jpg', 'JC.jpg', 'QC.jpg', 'KC.jpg',
                  'AD.jpg', '2D.jpg', '3D.jpg', '4D.jpg', '5D.jpg', '6D.jpg', '7D.jpg', '8D.jpg', '9D.jpg', '10D.jpg', 'JD.jpg', 'QD.jpg', 'KD.jpg',
                  'AH.jpg', '2H.jpg', '3H.jpg', '4H.jpg', '5H.jpg', '6H.jpg', '7H.jpg', '8H.jpg', '9H.jpg', '10H.jpg', 'JH.jpg', 'QH.jpg', 'KH.jpg'];
let cardsDelt = [];
let cardsToHold = [];
let cardsToFoldIndex = [];
let hand = [];
let suit = [];
let value = [];
let valueCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let scoreOfHand = 0;
let credit = 100;
let bet = 1;
let winnings = 0;


let image = document.querySelectorAll('img.card');

let payoutTable = document.querySelector('.payouts table tbody');

let dealBtn = document.querySelector('input.deal');
let drawBtn = document.querySelector('input.draw');
let upBetBtn = document.querySelector('input.upBet');
let downBetBtn = document.querySelector('input.downBet');
let lblBet = document.querySelector('label.bet');
let lblCredit = document.querySelector('label.credit');

dealBtn.addEventListener('click', deal);
drawBtn.addEventListener('click', draw);

for(i = 0; i < payoutTable.children.length; i++) {
    payoutTable.children[i].children[bet].classList.add('currentBet');
};

upBetBtn.addEventListener('click', function() {
    if(scoreOfHand != 0){
        removeHighlight();
    }
    bet++;
    if(bet == 5) {
        upBetBtn.setAttribute('disabled', true);
    }
    if(bet == 2){
        downBetBtn.removeAttribute('disabled');
    }
    lblBet.innerText = bet;
    shiftTableUp();
});

downBetBtn.addEventListener('click', function() {
    if(scoreOfHand != 0){
        removeHighlight();
    }
    bet--;
    if(bet == 1){
        downBetBtn.setAttribute('disabled', true);
    }
    if(bet == 4){
        upBetBtn.removeAttribute('disabled');
    }
    lblBet.innerText = bet;
    shiftTableDown();
})

function shiftTableUp() {
    for(i = 0; i < payoutTable.children.length; i++) {
        payoutTable.children[i].children[bet].classList.add('currentBet');
        payoutTable.children[i].children[bet-1].classList.remove('currentBet');
    };
}

function shiftTableDown() {
    for(i = 0; i < payoutTable.children.length; i++) {
        payoutTable.children[i].children[bet].classList.add('currentBet');
        payoutTable.children[i].children[bet+1].classList.remove('currentBet');
    };
}

function highlightWinningsOnTable() {
    console.log(payoutTable.children[10-scoreOfHand].children[bet]);
    payoutTable.children[10-scoreOfHand].children[bet].classList.add('winningValue');
}

function removeHighlight() {
    payoutTable.children[10-scoreOfHand].children[bet].classList.remove('winningValue');
}

image.forEach(function(e){
    e.addEventListener('click', holdCard);
})

function deal() {
    if(scoreOfHand != 0){
        removeHighlight();
    }
    upBetBtn.setAttribute('disabled', true);
    downBetBtn.setAttribute('disabled', true);
    cardsDelt = [];
    cardsToHold = [];
    cardsToFoldIndex = [];
    valueCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    scoreOfHand = 0;
    winnings = 0;
    credit -= bet;
    lblCredit.innerText = "Credit: " + credit;
    image.forEach(function(e){
        e.classList.remove('hold');
    });
    dealBtn.setAttribute('disabled', true);
    drawBtn.removeAttribute('disabled');
    dealCards();
}

function draw() {
    dealBtn.removeAttribute('disabled');
    drawBtn.setAttribute('disabled', true);
    drawCards();
    scoreHand();
    payWinnings();
    lblCredit.innerText = "Credit: " + credit;
    if(bet == 5) {
        downBetBtn.removeAttribute('disabled');
    } else if (bet == 1){
        upBetBtn.removeAttribute('disabled');
    } else {
        downBetBtn.removeAttribute('disabled');
        upBetBtn.removeAttribute('disabled');
    }
}

function dealCards() {
    while(cardsDelt.length < 5){
        let newCard = Math.floor(Math.random()*52);
        if(!cardsDelt.includes(newCard)){
            cardsDelt.push(newCard);
        }
    }
    for(let i = 0; i < 5; i++){
        hand[i] = cardsDelt[i];
    }
    displayCards(0);
}

function drawCards() {
    cardsToHoldIndex = [];
    for(let i = 0; i < 5; i++){
        if(!cardsToHold.includes(image[i])) {
            cardsToFoldIndex.push(i);
        }
    }
    let i = 0;
    while(cardsDelt.length < 5 + cardsToFoldIndex.length) {
        let newCard = Math.floor(Math.random()*52);
        if(!cardsDelt.includes(newCard)){
            cardsDelt.push(newCard);
            hand[cardsToFoldIndex[i]] = newCard;
            i++;
        }
    }
    displayCards(0);
}

function displayCards(i) {
    console.log(hand)
    console.log(i)
    console.log(hand[i])
    console.log(image)
    hand.forEach(function(e){
        let imageSrc = imageLink + cardImages[e];
        image[i].src = imageSrc;
        i++;
    })
}

function scoreHand() {
    suit = [];
    value = [];
    hand.forEach(function(e){
        value.push(e%13);
        suit.push(Math.floor(e/13));
    });
    if(suit.every(isFlush)) {
        scoreOfHand = 5;
    }
    value.sort(function(a, b){return a-b});
    isStraight();
    getValueCount();
    countValueCount();
    if(scoreOfHand != 0){
        highlightWinningsOnTable();
    }
}

function holdCard(e) {
    if(e.target.classList.contains('hold')){
        e.target.classList.remove('hold');
        cardsToHold = removeHold(cardsToHold, e.target);
    } else {
        e.target.classList.add('hold');
        cardsToHold.push(e.target);
    }
}

function removeHold(arr, value) {
    return arr.filter(function(e){
        return e != value;
    });
}

function isStraight() {
    let countForStraight = 0;
    for(let i = 0; i < value.length -1; i++) {
        if(value[i] == value[i+1]-1){
            countForStraight++;
        }
    }
    if(countForStraight == 4 || value[0] == 0 && value[1] == 9 && value[2] == 10 && value[3] == 11 && value[4] == 12){
        if(scoreOfHand == 5) {
            if (value[0] == 0 && value[1] == 9 && value[2] == 10 && value[3] == 11 && value[4] == 12){
                scoreOfHand = 9;
            } else {
                scoreOfHand = 8;
            }
        } else {
            scoreOfHand = 4;
        }
    }
}

function isFlush(value) {
    return value === suit[0];
}

function getValueCount() {
    value.forEach(function(e) {
        valueCount[e]++;
    })
}

function countValueCount() {
    if(valueCount.indexOf(4) != -1) {
        scoreOfHand = 7;
    }
    if(valueCount.indexOf(3) != -1) {
        if(valueCount.indexOf(2) != -1){
            scoreOfHand = 6;
            return;
        }
        else {
            scoreOfHand = 3;
        }
    }
    if(valueCount.indexOf(2) != -1){
        if(valueCount.lastIndexOf(2) != valueCount.indexOf(2)){
            scoreOfHand = 2;
        } else if(valueCount.indexOf(2) == 0 || valueCount.indexOf(2) >= 10) {
            scoreOfHand = 1;
        }
    }
}

function payWinnings() {
    switch(scoreOfHand) {
        case 1:
            winnings = bet;
            credit += winnings;
            console.log("pair jacks or better");
            break;
        case 2:
            winnings = bet * 2;
            credit += winnings;
            console.log("2 pair");
            break;
        case 3:
            winnings = bet * 3;
            credit += winnings;
            console.log("3 of a kind");
            break;
        case 4:
            winnings = bet * 4;
            credit += winnings;
            console.log("straight");
            break;
        case 5:
            winnings = bet * 6;
            credit += winnings;
            console.log("flush");
            break;
        case 6:
            winnings = bet * 8;
            credit += winnings;
            console.log("full house");
            break;
        case 7:
            winnings = bet * 25;
            credit += winnings;
            console.log("4 of a kind");
            break;
        case 8:
            winnings = bet * 50;
            credit += winnings;
            console.log("straight flush");
            break;
        case 9:
            if (bet == 5) {
                winnings = 4000;
            } else {
                winnings = bet * 250;
            }
            credit += winnings;
            console.log("royal flush");
            break;
        default:
            winnings = 0
    }
}