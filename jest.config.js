module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['<rootDir>/__test__/**/?(*.)(spec|test).ts?(x)'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '.*\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '^@views(.*)$': '<rootDir>/src/containers/views$1'
    },
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/src/index.tsx',
        '<rootDir>/src/constants/index.ts',
        '<rootDir>/src/services/http.ts',
        '<rootDir>/src/types/typed-css-modules.d.ts'
    ]
}
