'use strict';

require('jsdom-global')();

const chai    = require('chai');
const dom     = require('../mock/dom');
const mixitup = require('../../dist/mixitup.js');

chai.use(require('chai-shallow-deep-equal'));
chai.use(require('chai-as-promised'));

describe('Controls', () => {
    describe('#filter (static)', () => {
        let container = dom.getContainer();
        let controls = dom.getFilterControls();

        container.insertBefore(controls, container.children[0]);

        document.body.appendChild(container);

        let mixer = mixitup(container);

        after(() => mixer.destroy());

        it('should detect nested filter controls and set active states upon instantiation', () => {
            let filter = controls.querySelector('[data-filter="all"]');

            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should map filter controls with value "none" to the selector ""', () => {
            let filter = controls.querySelector('[data-filter="none"]');

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '');
            chai.assert.equal(state.totalShow, 0);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should map filter controls with value "all" to the target selector', () => {
            let filter = controls.querySelector('[data-filter="all"]');

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.mix');
            chai.assert.equal(state.totalHide, 0);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a selector value', () => {
            let filter = controls.querySelector('[data-filter=".category-a"]');
            let totalMatching = container.querySelectorAll('.category-a').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.category-a');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound OR selector', () => {
            let filter = controls.querySelector('[data-filter=".category-a, .category-b"]');
            let totalMatching = container.querySelectorAll('.category-a, .category-b').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.category-a, .category-b');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound AND selector', () => {
            let filter = controls.querySelector('[data-filter=".category-a.category-c"]');
            let totalMatching = container.querySelectorAll('.category-a.category-c').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.category-a.category-c');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with an attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a');
            let totalMatching = container.querySelectorAll('[data-category="a"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with an attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a');
            let totalMatching = container.querySelectorAll('[data-category="a"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound OR attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a-or-b');
            let totalMatching = container.querySelectorAll('[data-category="a"], [data-category="b"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"], [data-category="b"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound AND attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a-and-c');
            let totalMatching = container.querySelectorAll('[data-category="a"][data-category="c"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"][data-category="c"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });
    });

    describe('#filter (live)', () => {
        let container = dom.getContainer();
        let controls = dom.getFilterControls();

        container.insertBefore(controls, container.children[0]);

        document.body.innerHTML = '';

        document.body.appendChild(container);

        let mixer = mixitup(container, {
            controls: {
                live: true
            }
        });

        after(() => mixer.destroy());

        it('should detect nested filter controls and set active states upon instantiation', () => {
            let filter = controls.querySelector('[data-filter="all"]');

            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should map filter controls with value "none" to the selector ""', () => {
            let filter = controls.querySelector('[data-filter="none"]');

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '');
            chai.assert.equal(state.totalShow, 0);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should map filter controls with value "all" to the target selector', () => {
            let filter = controls.querySelector('[data-filter="all"]');

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.mix');
            chai.assert.equal(state.totalHide, 0);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a selector value', () => {
            let filter = controls.querySelector('[data-filter=".category-a"]');
            let totalMatching = container.querySelectorAll('.category-a').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.category-a');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound OR selector', () => {
            let filter = controls.querySelector('[data-filter=".category-a, .category-b"]');
            let totalMatching = container.querySelectorAll('.category-a, .category-b').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.category-a, .category-b');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound AND selector', () => {
            let filter = controls.querySelector('[data-filter=".category-a.category-c"]');
            let totalMatching = container.querySelectorAll('.category-a.category-c').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.category-a.category-c');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with an attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a');
            let totalMatching = container.querySelectorAll('[data-category="a"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with an attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a');
            let totalMatching = container.querySelectorAll('[data-category="a"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound OR attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a-or-b');
            let totalMatching = container.querySelectorAll('[data-category="a"], [data-category="b"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"], [data-category="b"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should accept filter controls with a compound AND attribute selector value', () => {
            let filter = controls.querySelector('.mixitup_control__attr-a-and-c');
            let totalMatching = container.querySelectorAll('[data-category="a"][data-category="c"]').length;

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '[data-category="a"][data-category="c"]');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });

        it('should allow new controls to be added', () => {
            let filter = dom.getFilterControl();
            let totalMatching = container.querySelectorAll('.category-d').length;

            controls.appendChild(filter);

            filter.click();

            let state = mixer.getState();

            chai.assert.equal(state.activeFilter.selector, '.category-d');
            chai.assert.equal(state.totalShow, totalMatching);
            chai.assert.isOk(filter.matches('.mixitup-control-active'));
        });
    });
});