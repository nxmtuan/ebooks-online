// const { override, useBabelRc } = require("customize-cra");

// module.exports = override(
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useBabelRc()
// );

const path = require('path');
const { override, useBabelRc, addWebpackAlias } = require('customize-cra');

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
    addWebpackAlias({
        '~': path.resolve(__dirname, 'src'),
    }),
);
