/* eslint-disable import/no-unused-modules */
import { defineConfig, Options } from 'tsup'

const getConfig = (config: Options): Options[] => {
  return [
    {
      ...config,
      format: ['cjs', 'esm'],
      platform: 'node',
      dts: true,
    },
  ]
}

export default defineConfig([
  // Default entrypoint
  ...getConfig({
    entry: ['src/index.ts'],
    outDir: 'dist',
    sourcemap: true,
    clean: false,
    globalName: 'mongoose.rules',
  }),
])
