module.exports = {
    extends: [
        "standard",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],

    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },

    parser: "@typescript-eslint/parser",

    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },

    plugins: [
        "@typescript-eslint",
        "chai-friendly"
    ],

    rules: {
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_" }],
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": true }],
        "chai-friendly/no-unused-expressions": 2,
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "quotes": [2, "double"],
        "max-len": ["error", { "code": 80 }],
        "no-unused-expressions": 0,
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "object-curly-spacing": [2, "always"],
        "semi": [2, "always", { "omitLastInOneLineBlock": true }]
    }
};
