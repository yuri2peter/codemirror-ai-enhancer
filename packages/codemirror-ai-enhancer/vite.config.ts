import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      formats: ['es', 'cjs'],
      entry: ['src/index.ts'],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
      },
      external: ['@codemirror/state', '@codemirror/view'],
    },
  },
  plugins: [dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json' })],
});
