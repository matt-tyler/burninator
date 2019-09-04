module.exports = {
    "plugins": [
        "@babel/proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-named-capturing-groups-regex",
        "@babel/plugin-proposal-optional-chaining"
    ],
    "presets": [
        [
            "@babel/env", {
                "targets": {
                    "node": "8.10",
                },
                "modules": "commonjs",
            },
        ],
        "@babel/typescript",
    ]
}
