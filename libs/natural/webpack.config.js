import webpack from "webpack";
export const mode = 'none';
export const target = 'web';
export const resolve = {
    extensions: ['.js', '.json'],
    modules: ['node_modules', '.'],
    // Use our versions of Node modules.
    alias: {
        fs: 'browserfs/dist/shims/fs.js',
        buffer: 'browserfs/dist/shims/buffer.js',
        path: 'browserfs/dist/shims/path.js',
        processGlobal: 'browserfs/dist/shims/process.js',
        bufferGlobal: 'browserfs/dist/shims/bufferGlobal.js',
        bfsGlobal: require.resolve('browserfs')
    }
};
export const watch = false;
export const output = { filename: 'spec.js' };
export const plugins = [
    // Expose BrowserFS, process, and Buffer globals.
    // NOTE: If you intend to use BrowserFS in a script tag, you do not need
    // to expose a BrowserFS global.
    new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' })
];
export const node = {
    process: false,
    Buffer: false
};
export const stats = 'normal';
export default {
    mode,
    target,
    resolve,
    // REQUIRED to avoid issue "Uncaught TypeError: BrowserFS.BFSRequire is not a function"
    // See: https://github.com/jvilk/BrowserFS/issues/201
    module: {
        noParse: /browserfs\.js/
    },
    watch,
    output,
    plugins,
    node,
    stats
};
