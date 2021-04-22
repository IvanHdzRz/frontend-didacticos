import {filterWhiteSpaces} from './filterWhiteSpaces'
export const getApiQueryParams=(keyWords)=>{
    return filterWhiteSpaces(keyWords)
        .map(tag=>`tags=${tag}`)
        .join('&')
}