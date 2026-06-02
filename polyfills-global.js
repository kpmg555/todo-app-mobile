// Polyfills globales — inyectados por Metro antes de cualquier modulo

// DOMException
if (typeof global.DOMException === "undefined") {
  global.DOMException = function DOMException(message, name) {
    this.message = message || "";
    this.name = name || "DOMException";
  };
  global.DOMException.prototype = Object.create(Error.prototype);
}

// Performance API — se sobreescribe siempre para garantizar que exista
function PerformanceEntry(init) {
  this.name = (init && init.name) || "";
  this.entryType = (init && init.entryType) || "";
  this.startTime = (init && init.startTime) || 0;
  this.duration = (init && init.duration) || 0;
}
PerformanceEntry.prototype.toJSON = function() { return Object.assign({}, this); };
global.PerformanceEntry = PerformanceEntry;

function PerformanceMark(name, init) {
  PerformanceEntry.call(this, { name: name, entryType: "mark", startTime: (init && init.startTime) || 0, duration: 0 });
}
PerformanceMark.prototype = Object.create(PerformanceEntry.prototype);
global.PerformanceMark = PerformanceMark;

function PerformanceMeasure(name, init) {
  PerformanceEntry.call(this, { name: name, entryType: "measure", startTime: (init && init.startTime) || 0, duration: (init && init.duration) || 0 });
}
PerformanceMeasure.prototype = Object.create(PerformanceEntry.prototype);
global.PerformanceMeasure = PerformanceMeasure;

function PerformanceObserver(cb) { this._cb = cb; }
PerformanceObserver.prototype.observe = function() {};
PerformanceObserver.prototype.disconnect = function() {};
PerformanceObserver.supportedEntryTypes = [];
global.PerformanceObserver = PerformanceObserver;

// structuredClone
if (typeof global.structuredClone === "undefined") {
  global.structuredClone = function(obj) { return JSON.parse(JSON.stringify(obj)); };
}
