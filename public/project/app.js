/**
 * Created by debsh on 20-05-2017.
 */
var module = angular.module("MyCalculatorApp",[]);
module.controller("MyController",ctrlr);

function ctrlr() {
    this.operation = operation;
    this.calculate = cal;

    function operation(op) {
        this.operator = op;
    }
    function cal(){
        if(this.operator == '+')
            this.result = this.num1 + this.num2;
        if(this.operator == '-')
            this.result = this.num1 - this.num2;
        if(this.operator == '/')
            this.result = this.num1 / this.num2;
        if(this.operator == '*')
            this.result = this.num1 * this.num2;
    }
}
