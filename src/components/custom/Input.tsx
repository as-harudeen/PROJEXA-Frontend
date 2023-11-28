import { Input as NexUIInput, extendVariants } from "@nextui-org/react";

export const Input = extendVariants(NexUIInput, {
  variants: {
    // <- modify/add variants
    color: {
      stone: {
        // <- add a new color variant
        inputWrapper: [
          // <- Input wrapper slot
          "bg-zinc-100",
          "border",
          "shadow",
          "transition-colors",
          "focus-within:bg-zinc-100",
          "data-[hover=true]:border-zinc-600",
          "data-[hover=true]:bg-zinc-100",
          "group-data-[focus=true]:border-zinc-600",
          // dark theme
          "dark:bg-zinc-900",
          "dark:border-zinc-800",
          "dark:data-[hover=true]:bg-zinc-900",
          "dark:focus-within:bg-zinc-900",
        ],
        input: [
          // <- Input element slot
          "text-zinc-800",
          "placeholder:text-zinc-600",
          // dark theme
          "dark:text-zinc-400",
          "dark:placeholder:text-zinc-600",
        ],
      },
      border: {
        innerWrapper: [
          "bg-transperent",
          "border-white",
          "shadow",
          "transition-colors",
          "focus-within:bg-zinc-00",
          "data-[hover=true]:bg-transperent",
          "data-[hover=true]:border-zinc-100",
          "focus-within:bg-transperent",
        ],
        input: [
          "placeholder:text-sm",
          "dark:text-white",
          "placeholder:text-light_hash",
          "dark:placeholder:text-gray-400"
        ],
        label: [
          "md:text-sm",
          "font-light",
          "text-sm",
          "font-poppins",
          "dark:text-white",
        ],
        inputWrapper: ["bg-light_mode_secondary", "dark:bg-hash_one"],
      },
      hash: {
        label: ["dark:text-white", "text-light_mode_text"],
        inputWrapper: [
          "dark:bg-hash_one",
          "bg-light_mode_tertiary",
          "border-hash_one",
          "group-data-[focus=true]:bg-light_mode_secondary",
          "data-[hover=true]:bg-transperent",
          "dark:group-data-[focus=true]:bg-hash_one",
          "rounded-md",
        ],
        input: ["dark:text-white", "text-light_mode_text"],
      },
      searchBar: {
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-xl",
          "bg-default-200/50",
          "dark:bg-default/60",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "dark:hover:bg-default/70",
          "group-data-[focused=true]:bg-default-200/50",
          "dark:group-data-[focused=true]:bg-default/60",
          "!cursor-text",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-unit-6 min-h-unit-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-unit-10 min-h-unit-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "md:h-unit-14  h-unit-10 min-h-unit-14",
        input: "md:text-medium text-sm",
      },
      custom: {
        inputWrapper:
          "h-unit-10 sm:h-unit-11 md:h-unit-12 min-h-unit-10 sm:min-h-unit-11 md:min-h-unit-12",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "stone",
    textSize: "base",
  },
});
