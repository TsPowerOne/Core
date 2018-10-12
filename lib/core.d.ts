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
export { empty, htmlParse, replaceAll, escapeTag, err, log };
