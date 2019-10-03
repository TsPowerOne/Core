import * as assert from 'assert';
import { JSDOM } from 'jsdom';
import { empty } from '../lib/core';
let node:HTMLElement = null;
let dom:any = null;
let div:HTMLElement = null;

describe('Empty Function', function() {

    before(function(){
        dom = new JSDOM(`<!DOCTYPE html><div id="nodo">Hello world <span>dentro nodo</span></div>`);
        div = dom.window.document.querySelector('#nodo');
    });

  describe('empty a div element', function() {
    it('should return 0 ', function() {
      empty(div);
      assert(div.children.length == 0, "Error");
    });
  });
});