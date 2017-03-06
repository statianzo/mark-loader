const path = require('path');

const markLoaderGlobal = (markName) => (
  `; var __markLoaderGlobal = typeof global === 'object' ? global : window;`
);

const startMark = (markName) => (
  `;__markLoaderGlobal.performance && __markLoaderGlobal.performance.mark && __markLoaderGlobal.performance.mark('${markName}_start'); `
);

const endMark = (markName) => (
  `;__markLoaderGlobal.performance && __markLoaderGlobal.performance.mark && __markLoaderGlobal.performance.mark('${markName}_end'); `
);

const measure = (markName) => (
  `;__markLoaderGlobal.performance && __markLoaderGlobal.performance.measure && __markLoaderGlobal.performance.measure('${markName}', '${markName}_start', '${markName}_end'); `
);

const markLoader = function markLoader(content) {
  const context = this._compiler && this._compiler.context || process.cwd() || '';
  const resourcePath = this.resourcePath;
  const markName = path.relative(context, resourcePath).replace(/[^a-zA-Z0-9]/g, '_');

  return [
    markLoaderGlobal(),
    startMark(markName),
    content,
    endMark(markName),
    measure(markName),
  ].join('');
};

module.exports = markLoader;
