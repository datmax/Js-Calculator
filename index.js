var numbers = ["0", "1", "2", "3", "4",
               "5","6", "7", "8", "9", "0"];

var operands = ['+', '-', '*', '/', '%']

var expr = [];

var mainText = $(".text")

var background = $("button").css("background");

var result = null;
var equalPressed = false;
var waitSecondOperand = false;
var firstOperand = null;
var secondOperand = null;
var operator = null;

updateText = () =>{
    $(".sub-text").text(expr.join('  '));
}



makeOperations = (list) => {
        for(var i = 0; i < list.length; i++){
            if(operands.indexOf(list[i]) > -1){
                switch(list[i]){
                    case '+':
                    list.splice(list[i-3], 3, parseFloat(list[i-1]) + parseFloat(list[i+1]));
                    break;
                    case '-':
                    list.splice(list[i-3], 3, parseFloat(list[i-1]) - parseFloat(list[i+1]));
                    break;
                    case '*':
                    list.splice(list[i-3], 3, parseFloat(list[i-1]) * parseFloat(list[i+1]));
                    break;
                    case '/':
                    list.splice(list[i-3], 3, parseFloat(list[i-1]) / parseFloat(list[i+1]));
                    break;
                    case '%':
                    list.splice(list[i-3], 3, parseFloat(list[i-1]) % parseFloat(list[i+1]));
                    break;    
                }
                if(list.length > 1){
                makeOperations(list);
                }
            }
        }

}

clearScreen = () => {
    expr = [];
    mainText.text("0");
    $(".sub-text").text("0");
}

$(document).ready(function(){


    $("button").click(function(){
        if(mainText.text().length > 13){
            mainText.text("error");
        }
        //checking if input was a digit, and in case we are not expecting a second number 
        //we will just append the digit to the number that we already have
        if(numbers.indexOf(this.value) !== -1){
            if(mainText.text()[0] === '0' && mainText.text()[1] !== "." || waitSecondOperand === true || mainText.text() === 'error'){
                mainText.text(this.value);
                waitSecondOperand = false;
                
            }
            else{
                mainText.append(this.value);
            }
        }
        else if(this.value === 'ac'){
            clearScreen();
        }


        else if(this.value === "."){
            if(mainText.text().indexOf(".") === -1){
                mainText.append(this.value);
            }
        }

        //checking if input is an operation sign 
        else if(operands.indexOf(this.value) !== -1 && equalPressed !== true){
            expr.push(mainText.text(), this.value);  
            waitSecondOperand = true;
            console.log(expr)
        }
        else if(operands.indexOf(this.value) !== -1 && equalPressed === true){
            expr.splice(0, 1, mainText.text());
            expr.push(this.value);          
            waitSecondOperand = true;
            equalPressed = false;
        }

        //
        else if(this.value === "="){
            if(expr.indexOf('+') <0 && expr.indexOf('-') <0 && expr.indexOf('*') <0 
               && expr.indexOf('/') <0 && expr.indexOf('%') <0){
                mainText.text(expr);
                equalPressed = true;
            }
            else{
                console.log(expr);
                waitSecondOperand = false;
                equalPressed = true;
                expr.push(mainText.text());
                makeOperations(expr);
                mainText.text(expr);
            }


        }
        expr.length > 0 ? updateText() : $(".sub-text").text("0");

    });


});