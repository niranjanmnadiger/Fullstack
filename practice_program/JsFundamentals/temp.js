let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let brr = [];
let y = 100;

//map

let mapR = arr.map(x => x + y)

//filter
let filterR = arr.filter(x => x % 2 === 0);

//reduce 
//let reduceR = arr.reduce()


let res = arr.forEach(x => {
    brr.push(x + y)
});

console.log(arr);
console.log(`map res ${mapR}`);
console.log(`filter res ${filterR}`);
console.log(brr);
console.log(res);

//reduce 

function reduce(arr, acc) {

    for (let i = 0; i < arr.length; i++) {
        let curr = arr[i];
        acc = acc + curr;

    }

    return acc;
}

let reducerRR = reduce(arr, 0);

console.log(reducerRR);