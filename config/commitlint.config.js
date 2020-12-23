"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleSeverity = void 0;
exports.RuleSeverity = {
    Disabled: 0,
    Warning: 1,
    Error: 2,
};
const config = {
    extends: ["@commitlint/config-conventional"],
    parserPreset: {
        parserOpts: {
            headerPattern: /\[(.*)\]: ([\w-]+(?=: ))?(.+)$/,
            headerCorrespondence: ["type", "scope", "subject"],
        },
    },
    rules: {
        "type-case": [exports.RuleSeverity.Error, "always", "upper-case"],
        "type-enum": [
            exports.RuleSeverity.Error,
            "always",
            [
                "CHORE",
                "FEATURE",
                "FIX",
                "FORMAT",
                "REFACTOR",
                "RELEASE",
            ],
        ],
        "scope-case": [exports.RuleSeverity.Error, "always", "lower-case"],
        "subject-case": [exports.RuleSeverity.Error, "always", "sentence-case"],
        "header-max-length": [exports.RuleSeverity.Warning, "always", 100],
        "body-max-length": [exports.RuleSeverity.Warning, "always", 100],
        "footer-max-line-length": [exports.RuleSeverity.Warning, "always", 100],
    },
};
module.exports = config;
