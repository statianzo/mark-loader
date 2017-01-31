const path = require('path');

const startMark = (markName) => (
  `;global.performance && global.performance.mark && global.performance.mark('${markName}_start');`
);

const endMark = (markName) => (
  `;global.performance && global.performance.mark && global.performance.mark('${markName}_end');`
);

const measure = (markName) => (
  `;global.performance && global.performance.measure && global.performance.measure('${markName}', '${markName}_start', '${markName}_end');`
);

const markLoader = (content) => {
  const context = this._compiler.context || process.cwd();
  const resourcePath = this.resourcePath;
  const markName = path.relative(context, resourcePath).replace(/[^a-zA-Z0-9]/g, '_');

  return [
    startMark(markName),
    content,
    endMark(markName),
    measure(markName),
  ].join('');
};

module.exports = markLoader;
