import { fileURLToPath } from 'url'
import { build } from 'vite'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const modules = [
    {
        name: 'slider',
        entry: resolve(__dirname, 'src/slider/main.tsx')
    },
    {
        name: 'example-lib',
        entry: resolve(__dirname, 'src/example-lib/main.tsx')
    }
]

async function buildPackages() {
    for (const module of modules) {
        await build({
            publicDir: false,
            esbuild: {
                jsxFactory: "h",
                jsxFragment: "Fragment",
                jsxInject: `import { h, Fragment } from 'preact'`
            },
            build: {
                lib: {
                    entry: module.entry,
                    name: module.name,
                    fileName: `${module.name}/${module.name}`,
                    formats: ['es'], // Specifies the module format to be generated as an array. The default is ['es', 'umd'], so you do not need to specify this in this case.
                },
                cssCodeSplit: true,
                rollupOptions: {
                    external: [],
                },
                emptyOutDir: false
            },
            configFile: false,
            plugins: [
                cssInjectedByJsPlugin({ styleId: "example-lib" }),
                preact()
            ],
        })
    }
}

buildPackages();