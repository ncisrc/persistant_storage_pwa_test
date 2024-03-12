import { mergeConfig } from "vite"
import { defineConfig } from "vitest/config"
import viteConfig from "./vite.config"

export default defineConfig(
    mergeConfig(viteConfig, { // extending app vite config
        test : {
            setupFiles  : ["__tests__/test.config.js"],
            environment : "jsdom",
        }
    })
)
