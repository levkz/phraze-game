let CheckPlayerAnswer, retry, nextPhraze = () => {};
let d, buttons, score, keys;
let data = {};
let answer = 1;
let currentLine = 0;
const buttonsAmount = 4;

let request = new XMLHttpRequest();

let randomInt = (max) => Math.floor(Math.random() * max); // max excluded

function shufleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = randomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
      }
    return array;
}

function mainCode () {
    $(document).ready(() => {
        buttons = new Array();
        score = {
            element : $('#score'),
            value : 0
        }
        answer = 1;
        for (let i = 0; i < buttonsAmount; i++) 
        {
            let button = $("#b" + i);
            buttons.push(button);
            button.attr("onclick", "CheckPlayerAnswer("+ i +")")
        }
        retry = () => {
            location.reload();
            return false;
        }

        keys = shufleArray(Object.keys(data));
        nextPhraze = () => {
            answer = randomInt(buttonsAmount);
            $("#main-phrase").text(keys[currentLine + answer]);
            for (let i = 0; i < buttonsAmount; i++) {
                buttons[i].text(data[keys[currentLine + i]]);
            }
            currentLine += buttonsAmount;
        }
        nextPhraze();
        CheckPlayerAnswer = function(num) {
            if (!(num == answer)) {
                buttons[answer].attr("style", "color: rgb(136, 221, 103); border: 1px solid rgb(136, 221, 103);")
                buttons[num].attr("style", "color: rgb(255, 100, 100); border: 1px solid rgb(255, 100, 100);")

                score.value = "Поразка(";
                score.element.attr("style", "font-size: 8.0rem");
                score.element.attr("class", score.element.className + " unselectable")
                score.element.click(retry);
                buttons.forEach(button => {
                    button.attr("onClick", "retry()");
                }); 
            }
            else {
                nextPhraze();
                score.value++;
            }
            score.element.text(score.value);
            return;
        }
    });
}

request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
        data = JSON.parse(request.responseText);
        mainCode();
    }
}


request.open("GET", 'static/new_data1.json', true);
request.send();

