let str = "hello world";

console.log(str[0])

function upper(str) {

    let word = str.split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')

    console.log(word[1]);


    return word;



}

console.log(upper(str))