"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GAClickEvent = /** @class */ (function () {
    function GAClickEvent() {
        this.trackingItems = document.querySelectorAll('[data-analytics]');
        if (!this.trackingItems.length)
            return;
        this.setEvents();
    }
    GAClickEvent.prototype.updateEvents = function () {
        var _this = this;
        this.trackingItems = document.querySelectorAll('[data-analytics]');
        if (!this.trackingItems.length)
            return;
        Array.from(this.trackingItems).forEach(function (item) {
            item.removeEventListener('click', function (event) { return _this.sendClickEvent(event); });
            item.addEventListener('click', function (event) { return _this.sendClickEvent(event); });
        });
    };
    GAClickEvent.prototype.setEvents = function () {
        var _this = this;
        Array.from(this.trackingItems).forEach(function (item) {
            item.addEventListener('click', function (event) { return _this.sendClickEvent(event); });
        });
    };
    GAClickEvent.prototype.sendClickEvent = function (event) {
        if (!('ga' in window))
            return;
        event.preventDefault();
        var target = event.currentTarget;
        var params = target.getAttribute('data-analytics');
        var category = params.split(',')[0] || '';
        var label = params.split(',')[1] || '';
        if (category && label) {
            ga('send', 'event', category, 'click', label);
        }
        if (target.href) {
            this.openLink(target);
        }
    };
    GAClickEvent.prototype.openLink = function (element) {
        if (element.target === '_blank') {
            window.open(element.href);
        }
        else {
            location.href = element.href;
        }
    };
    return GAClickEvent;
}());
exports.default = GAClickEvent;
