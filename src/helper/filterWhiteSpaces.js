export const filterWhiteSpaces=(word)=>{
    return word
        .trim()
        .split(' ')
        .filter(tag=>tag!==' '&&tag!=='')
}