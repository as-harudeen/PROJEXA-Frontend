

import { Input as NexUIInput, extendVariants } from "@nextui-org/react";

export const SearchBar = extendVariants(NexUIInput, {
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
          "text-white",
          "placeholder:text-light_hash",
        ],
        label: [
          "md:text-sm",
          "font-light",
          "text-sm",
          "font-poppins",
          "text-white",
        ],
      },
      hash: {
        label: ["text-white"],
        inputWrapper: [
          "bg-hash_one",
          "border-hash_one",
          "data-[hover=true]:bg-transperent",
          "group-data-[focus=true]:bg-hash_one",
          "rounded-md",
        ],
        input: ["text-white"],
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
        inputWrapper: "h-unit-14 min-h-unit-14",
        input: "text-medium",
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
