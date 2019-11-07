/* eslint-disable prettier/prettier */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'chore',
                'feat',
                'fix',
                'test',
                'perf',
                'style',
                'merge',
                'config',
                'improvement',
            ]
        ]
    }
}