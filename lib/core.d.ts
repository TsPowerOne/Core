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
declare let htmlParse: (s: string) => HTMLElement;
/**
 *
 * @param str origina string
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
declare class CoreElement {
    private elementName;
    protected Id?: string;
    protected Class?: string;
    protected Style?: string;
    node: HTMLElement;
    constructor(elementName: string, Id?: string, Class?: string, Style?: string);
    private init;
    setId: (value: string) => void;
    setClass: (value: string) => void;
    setStyle: (value: string) => void;
    id: (value: string) => this;
    class: (value: string) => this;
    style: (value: string) => this;
    addClass: (value: string) => void;
    removeClass: (value: string) => void;
    addStyle: (value: string) => void;
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
    constructor(name: string, id: string, value?: string, enabled?: boolean, checked?: boolean, isValid?: boolean);
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
export { empty, htmlParse, replaceAll, escapeTag, err, log, setCookie, getCookie, removeCookie, setLocal, getLocal, removeLocal, collToArray, emptyLocal, unique, uniqueObj, CoreElement, InputElement, InputData, IInputElement, IInputEvent };
