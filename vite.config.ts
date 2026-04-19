import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite plugin: Makes the main CSS non-render-blocking in production builds.
 * Converts <link rel="stylesheet"> to async preload pattern,
 * saving ~150ms on first paint.
 */
function asyncCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-async-css',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html: string) {
      // Convert Vite's render-blocking CSS link to async preload pattern
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
        (_match, href) =>
          `<link rel="preload" as="style" href="${href}" crossorigin onload="this.onload=null;this.rel='stylesheet'" />\n  <noscript><link rel="stylesheet" crossorigin href="${href}" /></noscript>`
      );
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      cssMinify: 'esbuild',
      modulePreload: {
        polyfill: true, // Ensures modulepreload works in all browsers
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
          // Content-hash filenames for cache-busting
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          // Merge tiny chunks (<1KB icons, SEOHead) into their parent
          experimentalMinChunkSize: 5000,
        },
      },
    },
    plugins: [
      react(),
      asyncCssPlugin(),
    ],

    // Pre-bundle these for faster dev starts and optimized production chunks
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
