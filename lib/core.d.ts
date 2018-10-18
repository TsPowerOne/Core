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
declare let uniqueObj: (array: object[], objProperty: string) => object[];
export { empty, htmlParse, replaceAll, escapeTag, err, log, setCookie, getCookie, removeCookie, setLocal, getLocal, removeLocal, collToArray, emptyLocal, unique, uniqueObj };
