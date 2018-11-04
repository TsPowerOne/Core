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
var unique = function (array) {
    return array.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
};
exports.unique = unique;
var uniqueObj = function (array, objProperty) {
    return array.filter(function (item, i, arr) { return arr.map(function (e) { return e[objProperty]; }).indexOf(item[objProperty]) === i; });
};
exports.uniqueObj = uniqueObj;
var CoreElement = /** @class */ (function () {
    function CoreElement(type, Id, Class, Style) {
        var _this = this;
        this.type = type;
        this.Id = Id;
        this.Class = Class;
        this.Style = Style;
        this.init = function () {
            try {
                _this.node = document.createElement(_this.type);
            }
            catch (error) {
                throw new Error("type creation error: " + error);
            }
            _this.setAttr("id", _this.Id);
            _this.setAttr("class", _this.Class);
            _this.setAttr("style", _this.Style);
        };
        this.setId = function (value) {
            _this.setAttr("id", value);
        };
        this.setClass = function (value) {
            _this.setAttr("class", value);
        };
        this.setStyle = function (value) {
            _this.setAttr("style", value);
        };
        this.id = function (value) {
            if (value) {
                _this.Id = value;
                _this.setAttr("id", value);
            }
            return _this;
        };
        this.class = function (value) {
            if (value) {
                _this.Class = value;
                _this.setAttr("class", value);
            }
            return _this;
        };
        this.style = function (value) {
            if (value) {
                _this.Style = value;
                _this.setAttr("style", value);
            }
            return _this;
        };
        this.addClass = function (value) {
            if (value)
                _this.node.classList.add(value);
        };
        this.removeClass = function (value) {
            if (value)
                _this.node.classList.remove(value);
        };
        this.addStyle = function (value) {
            if (value && _this.isValidRule(value))
                _this.addStyleRule(value);
        };
        this.removeStyle = function (value) {
            if (value)
                _this.removeStyleRule(value);
        };
        this.isValidRule = function (rule) {
            if (rule.indexOf(":") == -1)
                return false;
            var r = rule.split(":")[0];
            var v = rule.split(":")[1];
            if (r == null || r == "" || v == null || v == "")
                return false;
            return true;
        };
        this.addStyleRule = function (rule) {
            rule = rule.trim().replace(";", "");
            var style = _this.node.getAttribute("style");
            if (style == null || style == undefined)
                _this.node.setAttribute("style", rule);
            var r = rule.split(":")[0];
            var v = rule.split(":")[1];
            var rules = style.split(";");
            var indexRuleIfPresent = rules.findIndex(function (e) { return e.indexOf(r) != -1; });
            if (indexRuleIfPresent != -1) {
                rules.splice(indexRuleIfPresent, 1);
            }
            rules.push(rule);
            _this.node.setAttribute("style", rules.join(";"));
        };
        this.removeStyleRule = function (rule) {
            rule.trim();
            var style = _this.node.getAttribute("style");
            if (style.indexOf(rule) != -1) {
                var rules = style.split(";");
                var index = rules.findIndex(function (e) { return e.indexOf(rule) != -1; });
                rules.splice(index, 1);
                _this.node.setAttribute("style", rules.join(";"));
            }
        };
        this.init();
    }
    CoreElement.prototype.setAttr = function (name, value) {
        if (name != null && value != null) {
            this.node.setAttribute(name, value);
        }
    };
    return CoreElement;
}());
exports.CoreElement = CoreElement;
