"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let age = 21;
console.log(age);
// age = "Ilma"             // wrong
// shows error : Type error, because 'age' must be a number
// Basic types in TS
let name = "Ilma";
console.log(name);
// TypeScript automatically infers the type based on the initial value
// let numbers : [1, 2, 3]    // when transpiled to js -> let numbers = [1, 2, 3]; 
let numbers = [1, 2, 3]; // inferred as number[]
console.log(numbers);
// You can push more numbers because type is number[]
// numbers.push(4);
// TypeScript will give an error if you try to push a string
// numbers.push("A"); // Error: Type 'string' is not assignable to type 'number'
let values = [1, 2, 3, "A"]; // union type for array
values.push("B"); // ✅ allowed
values.push(4); // ✅ allowed
// numbers.push(true); // ❌ not allowed
console.log(values);
// npx tsc                  // to transpile ts file into js
// TS transpile to JS       // by npx tsc
// auto create js file      // index.js  (we don't manually write/modify there)
// run js file
// ----------------------------
// HOW TO COMPILE & RUN
// ----------------------------
// 1. Transpile TS → JS (one time only):
//    npx tsc
//
// 2. Run JS file:
//    node index.js
//
// 3. To avoid typing "npx tsc" every time you edit .ts files,
//    use **watch mode**:
//
//    npx tsc -w
//
//    // This keeps running in background and auto-recompiles 
//    // your .ts file into .js whenever you save.
//
// 4. Best workflow:
//    - Open one terminal → run: npx tsc -w
//    - Open another terminal → run: node index.js
//
//    // Now, every time you save your TS file, it will recompile automatically.
//    // You just re-run node index.js to see updated output.
//# sourceMappingURL=index.js.map