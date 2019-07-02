module.exports = {
  hooks: {
    'pre-commit': 'yarn build && yarn test',
  },
};
