import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
          // directives: true,
          // version: "2.1.5",
        }),
      ],
    }),
  ],
  server: {
    https: false,
    open: false, // 是否在浏览器自动打开
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8099/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  // 自定义主题色
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  build: {
    // 指定输出路径，默认'dist'
    outDir: 'dist',
    // 指定生成静态资源的存放路径(相对于build.outDir)
    assetsDir: 'assets',
    // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
    assetsInlineLimit: 4096,
    // 启用/禁用CSS代码拆分，如果禁用，整个项目的所有CSS将被提取到一个CSS文件中,默认true
    cssCodeSplit: true,
    // 构建后是否生成source map文件，默认false
    sourcemap: false,
    // 为true时，会生成manifest.json文件，用于后端集成
    manifest: false
  }
})
