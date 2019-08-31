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
let htmlParseNT = (s:string):HTMLElement => {
    var node = document.createElement("div");
    node.innerHTML = s;
    return node.firstChild as HTMLElement;
}
var htmlParse = (function() {
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
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
    return function htmlParse(elem:string, context?:any) {
        context = context || document;

        var tmp, tag, wrap, j,
            fragment = context.createDocumentFragment();

        if (!rhtml.test(elem)) {
            fragment.appendChild(context.createTextNode(elem));

            // Convert html into DOM nodes
        } else {
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
/**
 * 
 * @param str original string 
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


class CoreElement{
    public node:HTMLElement;
    constructor(private elementName:string, protected Id?:string, protected Class?:string, protected Style?:string){
        this.init();

    }

    private init = ()=>{
        try{
            this.node = document.createElement(this.elementName);
        }catch(error){
            throw new Error("type creation error: " + error);
        }
        this.setAttr("id", this.Id);
        this.setAttr("class", this.Class);
        this.setAttr("style", this.Style);
    }

    public setId = (value:string):void=>{
        this.setAttr("id", value);
    }
    public setClass = (value:string):void=>{
        this.setAttr("class", value);
    }
    public setStyle = (value:string):void=>{
        this.setAttr("style", value);
    }

    public id = (value:string):this=>{
        if(value){
            this.Id = value;
            this.setAttr("id", value);
        }
        return this;
    }
    public class = (value:string):this=>{
        if(value){
            this.Class = value;
            this.setAttr("class", value);
        }
        return this;
    }
    public style = (value:string):this=>{
        if(value){
            this.Style = value;
            this.setAttr("style", value);
        }
        return this;
    }

    addClass =(value:string):void=>{
        if(value)this.node.classList.add(value);
    }
    removeClass = (value:string):void=>{
        if(value)this.node.classList.remove(value);
    }
    addStyle = (value:string):void=>{
        if(value && this.isValidRule(value))this.addStyleRule(value);
    }
    removeStyle = (value:string):void=>{
        if(value)this.removeStyleRule(value);
    }





    protected setAttr(name:string, value:string){
        if(name!=null && value!=null){
            this.node.setAttribute(name, value);
        }
    }
    private isValidRule = (rule:string):boolean=>{
        if(rule.indexOf(":") == -1)return false;
        let r = rule.split(":")[0];
        let v = rule.split(":")[1];
        if(r==null || r=="" || v==null || v=="")return false;
        return true;
    }
    private addStyleRule = (rule:string):void=>{
        rule = rule.trim().replace(";","");
        let style = this.node.getAttribute("style");
        if(style==null || style==undefined)this.node.setAttribute("style", rule);
        let r = rule.split(":")[0];
        let v = rule.split(":")[1];

        let rules:string[] = style.split(";");
        let indexRuleIfPresent = rules.findIndex(e=>e.indexOf(r)!=-1);
        if(indexRuleIfPresent != -1){
            rules.splice(indexRuleIfPresent, 1);
        }
        rules.push(rule);
        this.node.setAttribute("style", rules.join(";"))
    }
    private removeStyleRule = (rule:string):void=>{
        rule.trim();
        let style = this.node.getAttribute("style");
        if(style.indexOf(rule)!=-1){
            let rules = style.split(";");
            let index = rules.findIndex(e=>e.indexOf(rule)!=-1);
            rules.splice(index, 1);
            this.node.setAttribute("style", rules.join(";"));

        }
    }
}

interface IInputEvent{
    changed$:Observable<any>;
    clicked$:Observable<any>;
    enabled$:Observable<any>;
    disabled$:Observable<any>;
}
interface IInputElement{
    node:HTMLInputElement;
    getValue:() => any;
    setValue:(value:string) => void;
    value:(value:string) => any;
    isEnabled:() => boolean;
    enable:() => any;
    disable:() => any;
    setType:(type:string) => void;
    type:(type:string) => any;
}
class InputData{
    name:string;
    id:string;
    value:string;
    enabled:boolean;
    checked:boolean;
    isValid:boolean;
    index:string;
    display:string;
    constructor(name:string, id:string, value?:string, enabled?:boolean, 
        checked?:boolean, isValid?:boolean, index?:string, display?:string){
        this.name = name;
        this.id = id;
        this.value = value;
        this.enabled = enabled;
        this.checked = checked;
        this.isValid = isValid;
        this.index = index;
        this.display = display;
    }
}
import {Subject, Observable} from 'rxjs';
class InputElement extends CoreElement implements IInputElement, IInputEvent{

    node:HTMLInputElement
    protected _value:any;
    protected _enabled:boolean;
    private _disableChanged:boolean = false;
    private _disableClicked:boolean = false;
    private _disableInputed:boolean = false;

    protected changed = new Subject<InputData>();
    protected clicked = new Subject<InputData>();
    protected enabled = new Subject<InputData>();
    protected disabled = new Subject<InputData>();
    protected inputed = new Subject<InputData>();


    public changed$ = this.changed.asObservable();
    public clicked$ = this.clicked.asObservable();
    public enabled$ = this.enabled.asObservable();
    public disabled$ = this.disabled.asObservable();
    public inputed$ = this.inputed.asObservable();

    constructor(protected root:HTMLElement, protected Name:string,  protected Enabled:boolean = true, protected Type:string = "text", Id?:string, Class?:string, Style?:string){
        super("input", Id, Class, Style);
        this.Init();
        this.Event();
    }

    Init = () => {
        this.setAttr("name", this.Name);
        this.setAttr("type", this.Type);
        if(!this.Enabled)this.setAttr("disabled", "");
        this._enabled = this.Enabled;
        this.root.appendChild(this.node);
    }
    Event = () =>{
        this.node.addEventListener("click", ()=>{
            if(!this._disableClicked){
                let data = new InputData(this.Name, this.Id, this._value, this._enabled);
                this.clicked.next(data);
            }
        });
        this.node.addEventListener("change", ()=>{
            if(!this._disableChanged){
                let data = new InputData(this.Name, this.Id, this._value, this._enabled);
                this.changed.next(data); 
            }          
        });
        this.node.addEventListener("input", (event)=>{
            if(!this._disableInputed){
                this._value = (event.target as HTMLInputElement).value;
                let data = new InputData(this.Name, this.Id, this._value, this._enabled);
                this.inputed.next(data);
            }
        });
    }
    getValue = ():any => {
        this._value = (this.node as HTMLInputElement).value;
        return this._value;
    }
    setValue = (value:string):void => {
        this._value = value;
        (this.node as HTMLInputElement).value = value;
        let data = new InputData(this.Name, this.Id, this._value, this._enabled);
        this.inputed.next(data);
    }
    value = (value:string):this => {
        this._value = value;
        (this.node as HTMLInputElement).value = value;
        return this;
    }
    isEnabled = ():boolean => {
        this._enabled = (this.node.getAttribute("disabled"))?false:true;
        return this._enabled;
    }
    enable = ():this => {
        if(!this._enabled)this.node.removeAttribute("disabled");
        this._enabled = true;
        let data = new InputData(this.Name, this.Id, this._value, this._enabled);
        this.enabled.next(data);
        return this;
    }
    disable = ():this =>{
        if(this._enabled)this.node.setAttribute("disabled", "");
        this._enabled = false;
        let data = new InputData(this.Name, this.Id, this._value, this._enabled);
        this.disabled.next(data);
        return this;
    }
    setType = (value:string):void => {
        if(value){
            this.Type = value;
            this.setAttr("type", this.Type);
        }
    }
    type = (value:string):this => {
        if(value){
            this.Type = value;
            this.setAttr("type", this.Type);
        }
        return this;
    }
    DisableInputObservable = (value:boolean) =>  {
        this._disableInputed = value;
    }
    DisableChangeObservable = (value:boolean) => {
        this._disableChanged = value;
    }
    DisableClickObservable = (value:boolean) => {
        this._disableClicked = value;
    }
}

export{ empty, htmlParse, replaceAll, escapeTag, err, log, 
        setCookie, getCookie, removeCookie, 
        setLocal, getLocal, removeLocal,
        collToArray, emptyLocal,
        unique, uniqueObj, CoreElement,
        InputElement, InputData, IInputElement, IInputEvent,
        htmlParseNT
    }
