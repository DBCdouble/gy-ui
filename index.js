if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/gy-ui.min.js');
} else {
    module.exports = require('./dist/gy-ui.js');
}
