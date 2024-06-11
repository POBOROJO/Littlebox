const number = [1,2,3,4,5];

console.log(number.map(n=> n * n));

// function odd(num){
//     if(num % 2 == 0){
//         return false;
//     }
//     else {
//         return true;
//     }
// }

// function square(num){
//     return num * num;
// }

// function sum(prevValue, num){
//     return prevValue + num;
// }


// const squares = number.map(square);
// console.log(squares);

// const oddNo = number.filter(odd);
// console.log(oddNo);

// const sumNo = number.reduce(sum,0); // here the 0 is going to the preValue
// console.log(sumNo);

// function cube(num){
//     return num * num * num;
// }

// const cubes = number.map(cube);
// console.log(cubes);

// function product(prevValue, num){
//     return prevValue * num;
// }   

// const products = number.reduce(product,1);
// console.log(products);


const student = [{
    name: "kamla",
    age: 21
},{
    name: "jill",    
    age: 22 
},{
    name: "jim",
    age: 23
}];

// function accumulator(added, curr){
//     added[curr.name]= curr.age;
//     return added;
// }

const NameandAge = student.reduce((added, curr)=>{
    added[curr.name]= curr.age;
    return added;
},{});

console.log(NameandAge);
