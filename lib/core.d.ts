/**
 * @param node HTMLElement
 * @returns none - remove all childs of node
 */
declare let empty: (node: HTMLElement) => void;
/**
 *
 * @param s string
 * @returns HTMLElement result of string parse
 */
declare let htmlParseNT: (s: string) => HTMLElement;
declare var htmlParse: (elem: string, context?: any) => any;
/**
 *
 * @param str original string
 * @param find string to be find
 * @param replace string replace
 */
declare let replaceAll: (str: string, find: string, replace: string) => string;
/**
 *
 * @param s string to be escape
 * @returns string escaped
 */
declare let escapeTag: (s: string) => string;
/**
 *
 * @param s any log s
 * @param label string to identify log
 * @param time stamp datetime of log
 */
declare let log: (s: any, label?: string, time?: boolean) => void;
/**
 *
 * @param s any error s
 * @param label string to identify log
 * @param time stamp datetime of log
 */
declare let err: (s: any, label?: string, time?: boolean) => void;
/**
 * set cookie
 * @param name cookie name
 * @param value cookie value
 * @param days days expire
 */
declare let setCookie: (name: string, value: any, days?: any) => void;
/**
 * get saved cookie
 * @param name cookie name
 */
declare let getCookie: (name: string) => any;
/**
 * erase cookie
 * @param name cookie name
 */
declare let removeCookie: (name: string) => void;
/**
 * set item in local storage
 * @param name item name
 * @param value item value
 */
declare let setLocal: (name: string, value: any) => void;
/**
 * get item value
 * @param name item name
 */
declare let getLocal: (name: string) => any;
/**
 * remove item from local storage
 * @param name item name
 */
declare let removeLocal: (name: string) => void;
/**
 * transform a collection to an array
 * @param collection collection of HTMLElement
 */
declare let collToArray: (collection: NodeListOf<Element>) => any[];
/**
 * clear local storage
 */
declare let emptyLocal: () => void;
declare let unique: (array: any[]) => any[];
declare let uniqueObj: (array: object[], objProperty: string) => any[];
/**
 * Core Html Element, contruct html element and provide
 * basic methods for set and get property and element attribute
 */
declare class CoreElement {
    private elementName;
    protected Id?: string;
    protected Class?: string;
    protected Style?: string;
    node: HTMLElement;
    /**
     * Create an Html Element
     * @param {string} elementName name of element like div, span etc
     * @param {string} Id element id
     * @param {string} Class classes assigned to element like in html class attribute format
     * @param {string} Style styles assigned to element like in html style attribute format
     */
    constructor(elementName: string, Id?: string, Class?: string, Style?: string);
    /**
     * Initialize create and initialize element
     */
    private init;
    /**
     * Set id of element
     * @param {string} value id of element
     * @example
     *  @Core.setId('Al12');
     */
    setId: (value: string) => void;
    /**
     * Set class attribute of element like in html class attribute format
     * @param {string} value string of classes with empty space separator
     * @example
     *  Core.setClass('first second third');
     */
    setClass: (value: string) => void;
    /**
     * Set style attribute of element like in html style attribute format
     * @param {string} value string of style with ';' separator
     * @example
     *  Core.setStyle('display:block;width:100%');
     */
    setStyle: (value: string) => void;
    /**
     * Set id of element with a chainable method
     * @param {string} value id of element
     * @example
     *  Core.id('Al12').class('first second');
     */
    id: (value: string) => this;
    /**
     * Set class of element with a chainable method
     * @param {string} value string of classes with empty space separator
     * @example
     *  Core.class('first second').id('Al12');
     */
    class: (value: string) => this;
    /**
     * Set style of element with a chainable method
     * @param {string} value string of style with ';' separator
     * @example
     *  Core.style('display:block;width:100%').class('first second');
     */
    style: (value: string) => this;
    /**
     * Add a class to element
     * @param {string} value class name
     * @example
     *  Core.addClass('bolder');
     */
    addClass: (value: string) => void;
    /**
     * Remove a class by element
     * @param {string} value class name
     * @example
     *  Core.removeClass('bolder');
     */
    removeClass: (value: string) => void;
    /**
     * Add a style rule to element
     * @param {string} value class name
     * @example
     *  Core.addStyle('display:none;');
     */
    addStyle: (value: string) => void;
    /**
     * Remove a style rule by element
     * @param {string} value class name
     * @example
     *  Core.removeStyle('display');
     */
    removeStyle: (value: string) => void;
    protected setAttr(name: string, value: string): void;
    private isValidRule;
    private addStyleRule;
    private removeStyleRule;
}
interface IInputEvent {
    changed$: Observable<any>;
    clicked$: Observable<any>;
    enabled$: Observable<any>;
    disabled$: Observable<any>;
}
interface IInputElement {
    node: HTMLInputElement;
    getValue: () => any;
    setValue: (value: string) => void;
    value: (value: string) => any;
    isEnabled: () => boolean;
    enable: () => any;
    disable: () => any;
    setType: (type: string) => void;
    type: (type: string) => any;
}
declare class InputData {
    name: string;
    id: string;
    value: string;
    enabled: boolean;
    checked: boolean;
    isValid: boolean;
    index: string;
    display: string;
    constructor(name: string, id: string, value?: string, enabled?: boolean, checked?: boolean, isValid?: boolean, index?: string, display?: string);
}
import { Subject, Observable } from 'rxjs';
declare class InputElement extends CoreElement implements IInputElement, IInputEvent {
    protected root: HTMLElement;
    protected Name: string;
    protected Enabled: boolean;
    protected Type: string;
    node: HTMLInputElement;
    protected _value: any;
    protected _enabled: boolean;
    private _disableChanged;
    private _disableClicked;
    private _disableInputed;
    protected changed: Subject<InputData>;
    protected clicked: Subject<InputData>;
    protected enabled: Subject<InputData>;
    protected disabled: Subject<InputData>;
    protected inputed: Subject<InputData>;
    changed$: Observable<InputData>;
    clicked$: Observable<InputData>;
    enabled$: Observable<InputData>;
    disabled$: Observable<InputData>;
    inputed$: Observable<InputData>;
    constructor(root: HTMLElement, Name: string, Enabled?: boolean, Type?: string, Id?: string, Class?: string, Style?: string);
    Init: () => void;
    Event: () => void;
    getValue: () => any;
    setValue: (value: string) => void;
    value: (value: string) => this;
    isEnabled: () => boolean;
    enable: () => this;
    disable: () => this;
    setType: (value: string) => void;
    type: (value: string) => this;
    DisableInputObservable: (value: boolean) => void;
    DisableChangeObservable: (value: boolean) => void;
    DisableClickObservable: (value: boolean) => void;
}
export { empty, htmlParse, replaceAll, escapeTag, err, log, setCookie, getCookie, removeCookie, setLocal, getLocal, removeLocal, collToArray, emptyLocal, unique, uniqueObj, CoreElement, InputElement, InputData, IInputElement, IInputEvent, htmlParseNT };
