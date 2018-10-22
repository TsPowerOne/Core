/**
 * @param node HTMLElement
 * @returns none - remove all childs of node
 */
let empty = (node:HTMLElement):void=> {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
/**
 * 
 * @param s string
 * @returns HTMLElement result of string parse
 */
let htmlParse = (s:string):HTMLElement => {
    var node = document.createElement("div");
    node.innerHTML = s;
    return node.firstChild as HTMLElement;
}

/**
 * 
 * @param str origina string 
 * @param find string to be find
 * @param replace string replace
 */
let replaceAll = (str:string, find:string, replace:string):string => {
    return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * 
 * @param s string to be escape
 * @returns string escaped
 */
let escapeTag = (s: string):string=> {
    s = replaceAll(s, "<", "&#60");
    s = replaceAll(s, ">", "&#62");
    return s;
}

/**
 * 
 * @param s any log s
 * @param label string to identify log
 * @param time stamp datetime of log
 */
let log = (s:any, label:string = "", time:boolean = false):void=>{
    console.log(`${(label!="")?label:"info"}->${(time)?" " + new Date():""}`, s);
}
/**
 * 
 * @param s any error s
 * @param label string to identify log
 * @param time stamp datetime of log
 */
let err = (s:any, label:string = "", time:boolean = false):void=>{
    console.log(`${(label!="")?label:"err"}->${(time)?" " + new Date():""}`, s);
}

/**
 * set cookie
 * @param name cookie name
 * @param value cookie value
 * @param days days expire
 */
let setCookie = (name:string, value:any, days?:any)=>{
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
    document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
}

/**
 * get saved cookie
 * @param name cookie name
 */
let getCookie = (name:string):any=> {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
return null;
}

/**
 * erase cookie
 * @param name cookie name
 */
let removeCookie = (name:string)=> {
    document.cookie = name + '=; Max-Age=-99999999;';
}

/**
 * set item in local storage
 * @param name item name
 * @param value item value
 */
let setLocal = (name: string, value: any): void => {
    localStorage.setItem(name, JSON.stringify(value));
}

/**
 * get item value
 * @param name item name
 */
let getLocal = (name: string): any => {
    return JSON.parse(localStorage.getItem(name));
} 

/**
 * remove item from local storage
 * @param name item name
 */
let removeLocal = (name: string): void => {
    localStorage.removeItem(name);
}

/**
 * transform a collection to an array
 * @param collection collection of HTMLElement
 */
let collToArray = (collection:NodeListOf<Element>):Array<any>=>{
    let res = Array.prototype.slice.call( collection, 0 );
    return res;
}

/**
 * clear local storage
 */
let emptyLocal = ()=>{
    localStorage.clear();
}

let unique = (array:Array<any>):Array<any>=>{
    return array.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
}
let uniqueObj = (array:Array<object>, objProperty:string):Array<any> =>{
    return array.filter(function(item, i, arr){ return arr.map(e=>e[objProperty]).indexOf(item[objProperty]) === i});
}
export{ empty, htmlParse, replaceAll, escapeTag, err, log, 
        setCookie, getCookie, removeCookie, 
        setLocal, getLocal, removeLocal,
        collToArray, emptyLocal,
        unique, uniqueObj
    }
