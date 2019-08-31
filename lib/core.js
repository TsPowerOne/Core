"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var htmlParseNT = function (s) {
    var node = document.createElement("div");
    node.innerHTML = s;
    return node.firstChild;
};
exports.htmlParseNT = htmlParseNT;
var htmlParse = (function () {
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, 
    // We have to close these tags to support XHTML (#13200)
    wrapMap = {
        // Support: IE9
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    /**
     * @param {String} elem A string containing html
     * @param {Document} context
     */
    return function htmlParse(elem, context) {
        context = context || document;
        var tmp, tag, wrap, j, fragment = context.createDocumentFragment();
        if (!rhtml.test(elem)) {
            fragment.appendChild(context.createTextNode(elem));
            // Convert html into DOM nodes
        }
        else {
            tmp = fragment.appendChild(context.createElement("div"));
            // Deserialize a standard representation
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
            // Descend through wrappers to the right content
            j = wrap[0];
            while (j--) {
                tmp = tmp.lastChild;
            }
            // Remove wrappers and append created nodes to fragment
            fragment.removeChild(fragment.firstChild);
            while (tmp.firstChild) {
                fragment.appendChild(tmp.firstChild);
            }
        }
        return fragment;
    };
}());
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
    function CoreElement(elementName, Id, Class, Style) {
        var _this = this;
        this.elementName = elementName;
        this.Id = Id;
        this.Class = Class;
        this.Style = Style;
        this.init = function () {
            try {
                _this.node = document.createElement(_this.elementName);
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
var InputData = /** @class */ (function () {
    function InputData(name, id, value, enabled, checked, isValid, index, display) {
        this.name = name;
        this.id = id;
        this.value = value;
        this.enabled = enabled;
        this.checked = checked;
        this.isValid = isValid;
        this.index = index;
        this.display = display;
    }
    return InputData;
}());
exports.InputData = InputData;
var rxjs_1 = require("rxjs");
var InputElement = /** @class */ (function (_super) {
    __extends(InputElement, _super);
    function InputElement(root, Name, Enabled, Type, Id, Class, Style) {
        if (Enabled === void 0) { Enabled = true; }
        if (Type === void 0) { Type = "text"; }
        var _this = _super.call(this, "input", Id, Class, Style) || this;
        _this.root = root;
        _this.Name = Name;
        _this.Enabled = Enabled;
        _this.Type = Type;
        _this._disableChanged = false;
        _this._disableClicked = false;
        _this._disableInputed = false;
        _this.changed = new rxjs_1.Subject();
        _this.clicked = new rxjs_1.Subject();
        _this.enabled = new rxjs_1.Subject();
        _this.disabled = new rxjs_1.Subject();
        _this.inputed = new rxjs_1.Subject();
        _this.changed$ = _this.changed.asObservable();
        _this.clicked$ = _this.clicked.asObservable();
        _this.enabled$ = _this.enabled.asObservable();
        _this.disabled$ = _this.disabled.asObservable();
        _this.inputed$ = _this.inputed.asObservable();
        _this.Init = function () {
            _this.setAttr("name", _this.Name);
            _this.setAttr("type", _this.Type);
            if (!_this.Enabled)
                _this.setAttr("disabled", "");
            _this._enabled = _this.Enabled;
            _this.root.appendChild(_this.node);
        };
        _this.Event = function () {
            _this.node.addEventListener("click", function () {
                if (!_this._disableClicked) {
                    var data = new InputData(_this.Name, _this.Id, _this._value, _this._enabled);
                    _this.clicked.next(data);
                }
            });
            _this.node.addEventListener("change", function () {
                if (!_this._disableChanged) {
                    var data = new InputData(_this.Name, _this.Id, _this._value, _this._enabled);
                    _this.changed.next(data);
                }
            });
            _this.node.addEventListener("input", function (event) {
                if (!_this._disableInputed) {
                    _this._value = event.target.value;
                    var data = new InputData(_this.Name, _this.Id, _this._value, _this._enabled);
                    _this.inputed.next(data);
                }
            });
        };
        _this.getValue = function () {
            _this._value = _this.node.value;
            return _this._value;
        };
        _this.setValue = function (value) {
            _this._value = value;
            _this.node.value = value;
            var data = new InputData(_this.Name, _this.Id, _this._value, _this._enabled);
            _this.inputed.next(data);
        };
        _this.value = function (value) {
            _this._value = value;
            _this.node.value = value;
            return _this;
        };
        _this.isEnabled = function () {
            _this._enabled = (_this.node.getAttribute("disabled")) ? false : true;
            return _this._enabled;
        };
        _this.enable = function () {
            if (!_this._enabled)
                _this.node.removeAttribute("disabled");
            _this._enabled = true;
            var data = new InputData(_this.Name, _this.Id, _this._value, _this._enabled);
            _this.enabled.next(data);
            return _this;
        };
        _this.disable = function () {
            if (_this._enabled)
                _this.node.setAttribute("disabled", "");
            _this._enabled = false;
            var data = new InputData(_this.Name, _this.Id, _this._value, _this._enabled);
            _this.disabled.next(data);
            return _this;
        };
        _this.setType = function (value) {
            if (value) {
                _this.Type = value;
                _this.setAttr("type", _this.Type);
            }
        };
        _this.type = function (value) {
            if (value) {
                _this.Type = value;
                _this.setAttr("type", _this.Type);
            }
            return _this;
        };
        _this.DisableInputObservable = function (value) {
            _this._disableInputed = value;
        };
        _this.DisableChangeObservable = function (value) {
            _this._disableChanged = value;
        };
        _this.DisableClickObservable = function (value) {
            _this._disableClicked = value;
        };
        _this.Init();
        _this.Event();
        return _this;
    }
    return InputElement;
}(CoreElement));
exports.InputElement = InputElement;
