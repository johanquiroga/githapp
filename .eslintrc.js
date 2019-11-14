module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'wesbos',
    './node_modules/react-redux-typescript-scripts/eslint.js',
    './node_modules/react-redux-typescript-scripts/eslint-prettier.js' // optional
  ],
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "all",
        "singleQuote": true,
        "printWidth": 100,
      }
    ],
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
  },
}