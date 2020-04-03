var Module = {
    preRun: [],
    postRun: [],
    print: (function() {
        return function(text) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
            console.log('PRINT', text);
        };
    })(),
    printErr: function(text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        console.log('ERROR', text);
    },
    setStatus: function(text) {
        console.log('STATUS', text)
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
        if (!left) {
            Module.run();
            _handleFiles();
        };
    }
};

let wasmSource = scriptArgs[0] || './helloworld-c.wasm';
console.log('Running wasm source', wasmSource);
Module.wasmSource = wasmSource;

load('./polyfill.js');
drainJobQueue();
