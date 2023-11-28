import { extendVariants, CircularProgress as NEXTUICircularProgress } from "@nextui-org/react";



export const CircularProgress = extendVariants(NEXTUICircularProgress, {
    variants: {
        size: {
            xl: {
                base: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium"
            }
        }
    }
})