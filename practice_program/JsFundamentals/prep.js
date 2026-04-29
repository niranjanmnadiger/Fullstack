let str = "niranjan";

function palindrome(str) {

    let newstr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let revesre = newstr.split('').reverse().join('');

    return revesre === newstr;

}

console.log(palindrome("niranjan"));

console.log(palindrome("madam"))


