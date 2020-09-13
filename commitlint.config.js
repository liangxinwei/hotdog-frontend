const types = ['add', 'update', 'remove', 'fix', 'docs']

module.exports = {
  rules: {
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', types],
  },
}
