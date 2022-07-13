import { words as list } from './words.js'

let testActive, i, j, words, sum, correctWords, seconds, timer;

function initializeIndex () {
    i = 0; 
    j = 0; 
    words = document.querySelectorAll('.word');
    testActive = document.querySelectorAll('.active'); 
    sum = words[0].textContent.length;
}

function initializeVariables () {
    initializeIndex();
    updateCaret(i);
    correctWords = 0;
    seconds=30;
    timer;
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
    }else if (e.key !== ' ' && testActive[i].textContent != ' '){
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
           initializeIndex();
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
                 if (seconds > 0 ) {
                     seconds--;
                 } else {
                    clearInterval(timer);
                    alert(`Your Typing speed is: ${correctWords*2}WPM`)
                    document.removeEventListener('keypress',handleKey);
                };
        }, 1000);
      }
}

function startTest() {
    document.querySelector('.test').replaceChildren();
    getWord();
    document.addEventListener('keypress', handleKey);
    initializeVariables();
}

getWord();
initializeVariables();
document.addEventListener('keypress', handleKey);
document.querySelector('.button--restart').onclick = startTest;