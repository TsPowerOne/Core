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
