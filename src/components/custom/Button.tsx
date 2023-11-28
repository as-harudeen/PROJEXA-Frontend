import {extendVariants, Button as NextUIButton} from "@nextui-org/react";

export const Button = extendVariants(NextUIButton, {
  variants: {
    color: {
        hash: "dark:text-white bg-light_mode_hard dark:bg-[#393939] shadow-md",
        light_hash: "text-white bg-black dark:bg-light_hash",
        transperant: "dark:text-white bg-transperant border-2 dark:border-white border-black"
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small",
      xl: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium",
      custom: "px-unit-4 md:px-unit-8 md:min-w-unit-28 md:h-unit-12 text-medium  gap-unit-4 rounded-medium"
    },
  },
  defaultVariants: { 
    color: "hash",
    size: "custom",
    type: 'button'
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: "hash",
      class: "bg-[#84cc16]/80 opacity-100",
      isLoading: "false"
    },
  ],
});