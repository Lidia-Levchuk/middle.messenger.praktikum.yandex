module.exports = {
  extends: [
    "stylelint-config-standard",
  ],
  rules: {
    "no-empty-source": true,
    "selector-class-pattern": /^([a-z]+(?:[-_]{1,2}[a-z]+)*)+$/,
  },
};
