module.exports = {
    extends: [
        "standard"
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
        "@typescript-eslint"
    ],

    rules: {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "quotes": [2, "double"],
        "max-len": ["error", { "code": 80 }],
        "object-curly-spacing": [2, "always"],
        "semi": [2, "always", { "omitLastInOneLineBlock": true }]
    },

    "@typescript-eslint/explicit-function-return-type": "off",

    "@typescript-eslint/no-explicit-any": 1,

    "@typescript-eslint/no-inferrable-types": [
        "warn", {
            "ignoreParameters": true
        }
    ],

    "@typescript-eslint/no-unused-vars": "warn"
};
