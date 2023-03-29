// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    app: {
        head: {
            title: 'BloggingInHell',
            meta: [
                { 
                    name: 'charset',
                    content: 'utf-8',
                },
                {
                    name: 'viewport', 
                    content: 'width=device-width, initial-scale=1',
                },
            ],
            
            link: [
                { 
                    rel: 'stylesheet', 
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css', 
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: "use-credentials",
                },
                {
                    href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
                    rel: "stylesheet",
                },
            ], 
        },
    },

    css: [
        '@/assets/css/normalize.css',
        '@/assets/scss/main.scss',
    ],

    modules: [
    
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/colors.scss";',
                },
            },
        },
    },
    
    typescript: {
        strict: true,
        typeCheck: true,
    },
})
