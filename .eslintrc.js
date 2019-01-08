module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser" : true
  },
  "rules": {
    "linebreak-style": 0,
    "no-underscore-dangle": ["error", { "enforceInMethodNames": false, "allowAfterThis": true }],
    "import/prefer-default-export": "off",
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "max-len" : ["error", {"code": 150}]
  }
};
