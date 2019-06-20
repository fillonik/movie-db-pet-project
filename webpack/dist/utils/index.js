"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-any
function spawnCommand(command, params, envValues) {
    var env = Object.create(process.env);
    var isWindows = require('os').platform() === 'win32';
    for (var key in envValues) {
        if (envValues.hasOwnProperty(key)) {
            env[key] = envValues[key];
        }
    }
    var spawn = isWindows ? require('cross-spawn') : require('child_process').spawn;
    var child = spawn(command, params, { stdio: 'inherit', env: env });
    return child;
}
exports.spawnCommand = spawnCommand;
//# sourceMappingURL=index.js.map