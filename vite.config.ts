import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(({ command, mode }) => {
  // `mode` に基づいて現在の作業ディレクトリにある env ファイルをロードする
  // `VITE_` プレフィックスに関係なく全ての環境変数をロードするには、第 3 引数に '' を設定します
  const env = loadEnv(mode, process.cwd(), '')
  return {
    optimizeDeps: {
      include: ['preact'],
      force: true
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import { h, Fragment } from 'preact'`
    },
    build: {
      lib: {
        entry: {
          // 複数のエントリーポイントを指定してはならない。単一のJSを生成できなくなるため。なお、複数のエントリーポイントを指定するとpreactの共通ランタイムが切り出される。
          slider: resolve(__dirname, 'src/slider/main.tsx'),
        },
        formats: ['es'], // Specifies the module format to be generated as an array. The default is ['es', 'umd'], so you do not need to specify this in this case.
      },
      cssCodeSplit: true,
      rollupOptions: {
        external: [],
        output: {
          banner: '/** my-library version ' + '0.0.1' + ' */'
        }
      }
    },
    plugins: [
      cssInjectedByJsPlugin({ styleId: "example-lib" }),
      preact()
    ],
  }
})
