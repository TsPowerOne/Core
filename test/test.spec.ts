import * as assert from 'assert';
import { JSDOM } from 'jsdom';
import { empty, replaceAll, escapeTag, setCookie } from '../lib/core';
let node:HTMLElement = null;
let dom:any = null;
let div:HTMLElement = null;
let document:any = null;
let letter:string = 'abccccde';
describe('Empty Function', function() {

    before(function(){
        dom = new JSDOM(`<!DOCTYPE html><div id="nodo">Hello world <span>dentro nodo</span></div>`);
        div = dom.window.document.querySelector('#nodo');
    });

  describe('when Empty a div element div.children.length', function() {
    it('should be 0 ', function() {
      empty(div);
      assert(div.children.length == 0, "Error");
    });
  });
});

describe('replaceAll Function', function(){
  describe('when replaceAll c with 3 in abccccde string', function(){
    it('should return ab3333de', function(){
      let res = replaceAll(letter, 'c', '3');
      assert(res ==='ab3333de');
    });
  });
});

describe('escapeTag Function', function(){
  describe('when escapeTag in <ciao>', function(){
    it('result string should &#60ciao&#62', function(){
      let res = escapeTag('<ciao>');
      assert(res =='&#60ciao&#62');
    });
  });
});

// describe('setCookie Function', function(){
//   before(function(){
//     dom = new JSDOM(`<!DOCTYPE html><html></html>`);
//     document = dom.window.document;
//     window['document'] = document;
//   });
//   describe('when setCookie(giorno, 2) document.cookie', function(){
//     it('should be giorno=2; path=/', function(){
//       setCookie('giorno', '2');
//       //assert(document.cookie == 'giorno=2; path=/');
//     });
//   });
// });