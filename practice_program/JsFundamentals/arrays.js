let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let arr2 = [1, 1, 3, 4, 5, 67, 7, 2, 3, 4, 5, 6, 7, 8, 9, 10];



//duplicates
function dupliacte(arr) {
    let resArr = []

    for (let i = 0; i < arr.length; i++) {
        if (!resArr.includes(arr[i])) {
            resArr.push(arr[i])
        }
    }
    return resArr;
}

let real = dupliacte(arr2);

console.log(real);

let unique = [...new Set(arr2)];

console.log(unique)

// sum of 

//sum
let sumR = arr.reduce((a, b) => a + b)
let multiplyR = arr.reduce((a, b) => a * b);
let subR = arr.reduce((a, b) => a - b);
let divideR = arr.reduce((a, b) => a / b);


console.log([sumR, multiplyR, subR, divideR]);

arr.forEach(x => console.log(x));


//count the elements

let freq = arr.reduce((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;
    return acc;
}, {})
console.log(freq);

let f = arr2.reduce((a, b) => {
    a[b] = ((a[b] || 0) + 1);
    return a;
}, {});

console.log(f);

let y = [1, 2, 3].map(x => { x * 2 });

console.log(y);

//largest array 