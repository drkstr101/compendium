// teardown.js
module.exports = async function () {
  (global as any).__SSR_SERVER__?.terminate();
};
