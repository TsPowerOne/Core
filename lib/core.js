"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param node HTMLElement
 * @returns none - remove all childs of node
 */
var empty = function (node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};
exports.empty = empty;
/**
 *
 * @param s string
 * @returns HTMLElement result of string parse
 */
var htmlParse = function (s) {
    var node = document.createElement("div");
    node.innerHTML = s;
    return node.firstChild;
};
exports.htmlParse = htmlParse;
/**
 *
 * @param str origina string
 * @param find string to be find
 * @param replace string replace
 */
var replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
};
exports.replaceAll = replaceAll;
/**
 *
 * @param s string to be escape
 * @returns string escaped
 */
var escapeTag = function (s) {
    s = replaceAll(s, "<", "&#60");
    s = replaceAll(s, ">", "&#62");
    return s;
};
exports.escapeTag = escapeTag;
/**
 *
 * @param s any log s
 * @param label string to identify log
 * @param time stamp datetime of log
 */
var log = function (s, label, time) {
    if (label === void 0) { label = ""; }
    if (time === void 0) { time = false; }
    console.log(((label != "") ? label : "info") + "->" + ((time) ? " " + new Date() : ""), s);
};
exports.log = log;
/**
 *
 * @param s any error s
 * @param label string to identify log
 * @param time stamp datetime of log
 */
var err = function (s, label, time) {
    if (label === void 0) { label = ""; }
    if (time === void 0) { time = false; }
    console.log(((label != "") ? label : "err") + "->" + ((time) ? " " + new Date() : ""), s);
};
exports.err = err;
/**
 * set cookie
 * @param name cookie name
 * @param value cookie value
 * @param days days expire
 */
var setCookie = function (name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
};
exports.setCookie = setCookie;
/**
 * get saved cookie
 * @param name cookie name
 */
var getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
};
exports.getCookie = getCookie;
/**
 * erase cookie
 * @param name cookie name
 */
var removeCookie = function (name) {
    document.cookie = name + '=; Max-Age=-99999999;';
};
exports.removeCookie = removeCookie;
/**
 * set item in local storage
 * @param name item name
 * @param value item value
 */
var setLocal = function (name, value) {
    localStorage.setItem(name, JSON.stringify(value));
};
exports.setLocal = setLocal;
/**
 * get item value
 * @param name item name
 */
var getLocal = function (name) {
    return JSON.parse(localStorage.getItem(name));
};
exports.getLocal = getLocal;
/**
 * remove item from local storage
 * @param name item name
 */
var removeLocal = function (name) {
    localStorage.removeItem(name);
};
exports.removeLocal = removeLocal;
/**
 * transform a collection to an array
 * @param collection collection of HTMLElement
 */
var collToArray = function (collection) {
    var res = Array.prototype.slice.call(collection, 0);
    return res;
};
exports.collToArray = collToArray;
/**
 * clear local storage
 */
var emptyLocal = function () {
    localStorage.clear();
};
exports.emptyLocal = emptyLocal;
