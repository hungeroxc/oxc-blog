module.exports = {
    extends: 'stylelint-config-standard',

    plugins: ['stylelint-scss'],

    ignoreFiles: [
        'node_modules/**/*.scss',
        '**/*.md',
        '**/*.ts',
        '**/*.tsx',
        '**/*.js'
    ],

    rules: {
        indentation: 4,
        'no-missing-end-of-source-newline': null,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['global', 'local']
        }],
    }
}