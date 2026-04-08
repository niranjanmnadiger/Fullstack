const obj = {
    name: "niri",
    age: 23,
    address: "bengaluru"
}

let a = Object.keys(obj);
let b = Object.values(obj);
let c = Object.entries(obj);

console.log({ a: a, b: b, c: c });

for (let key in obj) {
    console.log(key, obj[key]);
}