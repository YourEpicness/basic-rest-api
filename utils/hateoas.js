const express = require('express')
const apiEndpoint = "hi";

const hateoasLinks = {
    _links: {
        self: {
            href: "/"
        },
        profiles: {
            href: "/"
        },
        comments: {
            href: "/"
        }
    },
}

function generateHal() {

}

const generateHalLinks = (req) => {
    const hal = {
        self: {
            href: req.originalUrl
        },
        messages: {
            href: "/messages"
        },
        comments: {
            href: "/messages/1/comments"
        }
    }
    return _checkRepeatLinks(hal);
}

function _checkRepeatLinks(halObj) {
    const hal = halObj;
    const [key, value] = Object.entries(halObj)
    // console.log(key[1].href, value[1].href)
    const selfUrl = key[1].href;
    const apiUrl =  value[1].href;
    if(selfUrl === apiUrl) {
        const apiRef = apiUrl.slice(1)
        delete hal[apiRef]
        return hal;
    };
    // const parent = Object.entries(halObj)
    // const [index, [key, value]] = parent;
    // console.log(parent);
    // console.log(`Index is: ${index[0]}, Key is: ${key[0]}, Value is: ${value[0]}`)
    // Object.entries(halObj).forEach(([key, value]) => {
    //     if(key in value) delete parent
    // })
    
}

function getEndpoint(req) {
    return req.originalUrl
}

function getBaseUrl(req) {
    return req.baseUrl
}

module.exports = {
    hateoasLinks,
    getEndpoint,
    getBaseUrl,
    generateHalLinks,
}