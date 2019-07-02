module.exports = {
  hooks: {
    'pre-commit': 'yarn build && yarn lint && yarn test',
  },
};
