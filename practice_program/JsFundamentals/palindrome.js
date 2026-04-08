let str = "Madam, I'm Adam"

function isPlaindrome(str) {

    let cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    let reverse = cleaned.split('').reverse().join('');

    if (cleaned === reverse) {
        console.log("is a palindrome")
        console.log(str)
    } else {
        console.log("not a palindrom");
    }
}

isPlaindrome(str);

//longest palindrome in the string in the sentance

let str2 = "mam naaaaaan has a paap";

function longestPalindrome(str) {
    let longest = "";

    let words = str.split(' ');


    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        let cleaned = word.toLowerCase().replace(/[^a-z0-9]/g, ''); // word is a string 

        let reverse = cleaned.split('').reverse().join(''); // cleaned is a string - split it and reverse and join

        if (reverse === cleaned && cleaned.length > longest.length) {
            longest = cleaned;
        }
    }
    return longest;

}

let y = longestPalindrome(str2);

console.log(y);

// count the palindromes in a sentance

function palindromeCount(str) {

    let paliCount = 0;

    let words = str.split(' ');

    for (let i = 0; i < words.length; i++) {

        let word = words[i];

        let wordClean = word.toLowerCase().replace(/[^a-z0-9]/g, '');

        let wordrev = wordClean.split('').reverse().join('');

        if (wordrev === wordClean) {
            paliCount = paliCount + 1;

        }

    }

    return paliCount;


}

console.log(palindromeCount(str2));

//palindrome using 2 pointer 

function twoPointer(str) {

    let cl = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    let left = 0;
    let right = cl.length - 1;

    while (left < right) {

        if (cl[left] !== cl[right]) return false;
        left++;
        right--;
    }
    return true;
}

console.log(twoPointer("two pointer way " + str));
