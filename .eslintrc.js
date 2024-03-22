module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["react-app",
                "plugin:cypress/recommended",
                "eslint:recommended",
        ],
    "ignorePatterns": ["coverage", "dist", "node_modules"],
    "overrides": [
        {
            "env": {
                "node": true,
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ], "rules": {
        "no-unused-vars": "warn",
        "react-hooks/exhaustive-deps": 0,
    },
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ]};
