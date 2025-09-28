"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. string
let name = "Ilma";
console.log(name);
// 2. number
let age = 21;
console.log(age);
// 3. boolean
let isAdmin = true;
console.log(isAdmin);
// 4. any  -> 'any' is a type that disables type checking.  A variable with type any can hold any value, of any type.
let anything = "1";
console.log(anything);
anything = 1;
console.log(anything);
let anyArray = [1, "2", 3, "4"];
console.log(anyArray);
// 5. array
let numberArray = [1, 2, 3, 4, 5];
console.log(numberArray);
let stringArray = ["A", "B", "C"];
console.log(stringArray);
let arrayListOfString = ["a", "b", "c"];
console.log(arrayListOfString);
let arrayForAny = [1, "any", 3, "array"];
console.log(arrayForAny);
let arrayTypeAutomaticallyDefine = [1, "Auto", 3, "Define"];
console.log(arrayTypeAutomaticallyDefine);
// 6. tuple  -> Strict mode, cannot add/remove
let user = ["Ilma", 21];
console.log(user);
// wrong -> let user: [string, number] = ["Ilma", 21, 21]
// correct -> let user: [string, number, number] = ["Ilma", 21, 21]
// tuples are fixed in length
// each position has its own specific type
// 7. enum
var Colours;
(function (Colours) {
    Colours[Colours["RED"] = 0] = "RED";
    Colours[Colours["GREEN"] = 1] = "GREEN";
    Colours[Colours["BLUE"] = 2] = "BLUE"; // By default, the first member starts with 0 and increments by 1
})(Colours || (Colours = {}));
let book_color = Colours.RED;
console.log(book_color); // 0
console.log(Colours.RED); // 0
console.log(Colours.GREEN); // 1
console.log(Colours.BLUE); // 2
// 8. object
let person = {
    name: "Ilma",
    age: 21
};
console.log(person);
let userData = {
    name: "Ilma", // property01
    age: 21, // property02
    email: "seenathulilma121243@gmail.com" // property03 
};
console.log(userData);
let userDataOptional = {
    name: "Ilma", // property01
    age: 21, // property02
    //email: "seenathulilma121243@gmail.com"   // property03  - skipped. bcz, optional
};
console.log(userDataOptional);
let student01 = { name: "Ilma" };
console.log(student01);
let student02 = { name: "Ilma", school: "KMBMV" };
console.log(student02);
// Note: interface Vs type
//      -interface is primarily designed to describe the shape of an object — which properties it has and their types. Andalso, you can describe functions. But Interfaces cannot define primitives, unions, tuples, or enums. Can extend multiple interfaces later.
//      -type also defines the shape of an object (or any type). type can define primitives, unions, intersections, etc. Slightly more flexible than interface, but cannot be re-opened/extended like interface.
// 11. union types
let sinlgeVariableUnion; // only mentioned types are allowed
sinlgeVariableUnion = "A";
console.log(sinlgeVariableUnion);
sinlgeVariableUnion = 10;
console.log(sinlgeVariableUnion);
sinlgeVariableUnion = null;
console.log(sinlgeVariableUnion);
let unionForArrayElement = [1, 2, 3, 4, "5"]; // // only mentioned types are allowed
unionForArrayElement.push(6);
unionForArrayElement.push("7");
console.log(unionForArrayElement);
// 12. function
function add(num1, num2) {
    //return "result: "+ (num1 + num2)  
    return num1 + num2;
}
//let addResult1 = add(2,2)          // invoke add() function
let addResult1 = add(2, 2); // invoke add() function - explicitly defined return type by 'addResult1:number'
console.log(addResult1); // result: 4
function sum(num1, num2) {
    return num1 + num2;
}
//let sumResult1 = sum(2,2)          // invoke sum() function 
let sumResult1 = sum(5, 5); // invoke sum() function - explicitly defined return type by 'sumResult1:number'
console.log(sumResult1); // 10
// 13. optional parameter
function optMethod01(name, age) {
    //return "Name: "+ name + " | " + "Age: " + (age ? age : "Age not provided")
    return `Name: ${name} | Age: ${age ?? "Age not provided"}`;
}
let optMethod01Result1 = optMethod01("Ilma");
console.log(optMethod01Result1);
let optMethod01Result2 = optMethod01("Ilma", 21);
console.log(optMethod01Result2);
const optMethod02 = (name, age) => {
    //return "Name: "+ name + " | " + "Age: " + (age ? age : "Age not provided")
    return `Name: ${name} | Age: ${age ?? "Age not provided"}`;
};
let optMethod02Result1 = optMethod02("Ilma");
console.log(optMethod02Result1);
let optMethod02Result2 = optMethod02("Ilma", 21);
console.log(optMethod02Result2);
// 14. default parameter
function multiply(a, b = 2) {
    return a * b;
}
let multiplyResult01 = multiply(6); // 6*2 = 12
console.log(multiplyResult01);
let multiplyResult02 = multiply(10, 5);
console.log(multiplyResult02); // 10*5 = 50
//# sourceMappingURL=basicDataTypes.js.map