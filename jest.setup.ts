import * as moment from 'moment';

// Add moment to the global object
global.window = Object.create(window);

Object.defineProperty(window, 'moment', {
  value: moment,
});