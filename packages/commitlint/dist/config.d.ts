export interface CommitlintConfig {
    extends?: string[];
    formatter?: string;
    rules?: Record<string, any>;
    parserPreset?: string | {
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
export declare const RuleSeverity: {
    Disabled: number;
    Warning: number;
    Error: number;
};
export declare const config: CommitlintConfig;
