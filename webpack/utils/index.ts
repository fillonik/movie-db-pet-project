// tslint:disable-next-line:no-any
export function spawnCommand(command: string, params: (string|number)[], envValues?: any) {
  const env = Object.create( process.env );
  const isWindows = require('os').platform() === 'win32';

  for (let key in envValues) {
    if (envValues.hasOwnProperty(key)) {
      env[key] = envValues[key];
    }
  }

  const spawn = isWindows ? require('cross-spawn') : require('child_process').spawn;
  const child = spawn(command, params, { stdio: 'inherit', env });

  return child;
}
