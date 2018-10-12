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

export{ empty, htmlParse, replaceAll, escapeTag, err, log}