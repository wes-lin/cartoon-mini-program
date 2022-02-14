module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  'extends': [
    'eslint:recommended'
  ],
  env: {
    node: true,
    es6: true
  },
  //全局变量
  'globals': {
    'App': true,
    'Page': true,
    'Component': true,
    'Behavior': true,
    'wx': true,
    'getApp': true,
    'getCurrentPages': true
  },
  rules: {
    semi: ['error', 'always'],
    quotes: [1, 'single'],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-unreachable': 'off',
    'no-redeclare': 'warn',
    'no-const-assign': 2,
    indent: [2, 2, {SwitchCase: 1}],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    'arrow-spacing': [2, {before: true, after: true}],
    'block-spacing': [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [ 2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [ 2, { words: true, nonwords: false}
    ]
  }
};