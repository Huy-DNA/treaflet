export default {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        // parser: 'babel-eslint' <- REMOVED
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
        '@nuxtjs/eslint-config-typescript'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {},
}