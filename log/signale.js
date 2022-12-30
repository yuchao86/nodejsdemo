const signale = require('signale');
const {Signale} = require('signale');

signale.success('Operation successful');
signale.debug('Hello', 'from', 'L59');
signale.pending('Write release notes for %s', '1.2.0');
signale.fatal(new Error('Unable to acquire lock'));
signale.watch('Recursively watching build directory...');
signale.complete({prefix: '[task]', message: 'Fix issue #59', suffix: '(@klauscfhq)'});

const options = {
    types: {
      error: {
        badge: '!!',
        label: 'fatal error'
      },
      success: {
        badge: '++',
        label: 'huge success'
      }
    }
  };
  
  signale.error('Default Error Log');
  signale.success('Default Success Log');
  
  const custom = new Signale(options);
  custom.error('Custom Error Log');
  custom.success('Custom Success Log');