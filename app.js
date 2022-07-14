import { words as list } from './words.js'

function addRestartButton () {
    let restartButton = document.createElement('a');
    restartButton.className = 'button--restart';
    restartButton.append('⭯');
    restartButton.href = '';
    let buttonBox = document.createElement('div');
    buttonBox.className = 'button-box';
    document.querySelector('.button-box').appendChild(restartButton);
    document.querySelector('.container').appendChild(buttonBox);
}

let testActive, i, j, words, sum, correctWords, seconds, scaleSeconds, timer;

function initializeTestIndex () {
    i = 0; 
    j = 0; 
    words = document.querySelectorAll('.word');
    testActive = document.querySelectorAll('.active'); 
    sum = words[0].textContent.length;
}

function initializeVariables () {
    initializeTestIndex();
    updateCaret(i);
    correctWords = 0;
    seconds=14;
    scaleSeconds = 60 / (seconds + 1)  
    document.querySelector('#timer').textContent = seconds + 1;

    
}

function updateCaret(index){
    testActive[index].classList.add('caret')
}


function getWord() {
    for (let i = 0; i < 150; i++) {
    let word = document.createElement('div');
    word.className = 'word';
    let tempWord = list[Math.floor(Math.random() * 1400)];
    tempWord = tempWord.split('');
    tempWord.push(' ');
    for (let i = 0; i < tempWord.length; i++) {
        let letters = document.createElement('span');
        letters.className = 'active';
        letters.append(tempWord[i]);
        word.appendChild(letters);
    }
     document.querySelector('.test').appendChild(word);
    }
}

function handleKey(e) {
    

    if (e.key === testActive[i].textContent) {
        updateCaret(i+1);
        testActive[i].className = 'passed';
        i++;
    } else if (e.key !== ' ' && testActive[i].textContent != ' '){
        testActive[i].className = 'error';
        updateCaret(i+1);
    }

    if  (e.key === ' ') {        
        testActive[i].classList.remove('caret')        
        testActive[i+1].classList.remove('caret')
        let passedLetters = words[j].querySelectorAll('.passed'); 
        if (passedLetters.length !== words[j].textContent.length) { 
            words[j].classList.add('error');
        } else {
            words[j].classList.add('correct');
            correctWords++;
        }
        
        if(i >= 70) {
            let passed = document.querySelectorAll('.correct, .error')
            passed.forEach( object => {
                object.remove();
            })
           initializeTestIndex();
        } 
        
        else {
            i = sum;
            sum += words[j + 1].textContent.length;
            j++;
        }        
        updateCaret(i);;
    }
    
    if(!timer) {
        timer = window.setInterval(function() {
                document.getElementById("timer").innerHTML = seconds;
                 if (seconds > 1 ) {
                    seconds--;
                    document.querySelector('#live-WPM').textContent = Math.floor(scaleSeconds * (correctWords * 60)/(60-seconds));
                } else {
                    document.getElementById("timer").innerHTML = 0;
                    clearInterval(timer);
                    endTest();
                };
        }, 1000);
    }
}

function endTest () {
    document.querySelector('.header').remove();
    document.querySelector('.test-box').remove();
    let resultBox = document.createElement('div');
    resultBox.className = 'result-box';
    let secondaryResultText = document.createElement('div');
    secondaryResultText.className = 'secondary'
    secondaryResultText.innerHTML = 'Your Result is:';
    resultBox.appendChild(secondaryResultText);
    let primaryResultText = document.createElement('div');
    primaryResultText.className = 'primary';
    primaryResultText.textContent = correctWords * scaleSeconds + ' WPM';
    resultBox.appendChild(primaryResultText);
    document.querySelector('.container').insertBefore(resultBox, document.querySelector('.container').firstElementChild);
    
}

function startTest() {
    getWord();
    initializeVariables();
    document.addEventListener('keypress', handleKey);
}

startTest();

