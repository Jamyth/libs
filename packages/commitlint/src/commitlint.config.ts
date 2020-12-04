export interface CommitlintConfig {
  extends?: string[];
  formatter?: string;
  rules?: Record<string, any>;
  parserPreset?:
    | string
    | {
        name?: string;
        path?: string;
        parserOpts: {
          commentChar?: string;
          headerCorrespondence?: string[];
          headerPattern?: RegExp;
          issuePrefixes?: string[];
          mergeCorrespondence?: string[];
          mergePattern?: RegExp;
          noteKeywords?: string[];
          revertCorrespondence?: string[];
          revertPattern?: RegExp;
        };
      };
  ignores?: ((commit: string) => boolean)[];
  defaultIgnores?: boolean;
  plugins?: any[];
}

export const RuleSeverity = {
  Disabled: 0,
  Warning: 1,
  Error: 2,
};

const config: CommitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /\[(.*)\]: ([\w-]+(?=: ))?(.+)$/,
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
  rules: {
    "type-case": [RuleSeverity.Error, "always", "upper-case"],
    "type-enum": [
      RuleSeverity.Error,
      "always",
      [
        "CHORE",
        "FEATURE",
        "FIX",
        "FORMAT",
        "REFACTOR",
        // prettier-format-preserve
      ],
    ],
    "scope-case": [RuleSeverity.Error, "always", "lower-case"],
    "subject-case": [RuleSeverity.Error, "always", "sentence-case"],
    "header-max-length": [RuleSeverity.Warning, "always", 100],
    "body-max-length": [RuleSeverity.Warning, "always", 100],
    "footer-max-line-length": [RuleSeverity.Warning, "always", 100],
  },
};

module.exports = config;
