module.exports = {
    env: {
        es6: true,
        node: true,
    },

    extends: [
        "airbnb-base",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],

    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },

    ignorePatterns: ["node_modules/"],

    parser: "@typescript-eslint/parser",

    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },

    plugins: [
        "@typescript-eslint",
        "import",
        "chai-friendly"
    ],

    rules: {
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": true }],
        "arrow-body-style": 0,
        "arrow-parens": 0,
        "chai-friendly/no-unused-expressions": 2,
        "class-methods-use-this": 0,
        "comma-dangle": ["error", "never"],
        "consistent-return": 0,
        "function-paren-newline": 0,
        "import/extensions": 0,
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "import/prefer-default-export": 0,
        "import/order": 0,
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-confusing-arrow": 0,
        "no-restricted-syntax": 0,
        "no-use-before-define": 0,
        "quotes": [2, "double"],
        "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "max-len": ["error", { "code": 80 }],
        "no-console": 0,
        "no-unused-expressions": 0,
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "object-curly-spacing": [2, "always"],
        "operator-linebreak": 0,
        "semi": [2, "always", { "omitLastInOneLineBlock": true }],
        "space-before-function-paren": ["error", "always"]
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts"]
        },

        "import/resolver": {
            typescript: {
                directory: "./"
            }
        }
    }
};
