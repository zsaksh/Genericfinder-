import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("focus-ring inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      primary: "bg-ink px-5 py-3 text-paper shadow-card hover:bg-moss",
      secondary: "border border-ink/15 bg-paper px-5 py-3 text-ink hover:border-moss hover:bg-mist",
      ghost: "px-3 py-2 text-moss hover:bg-mist"
    }
  },
  defaultVariants: { variant: "primary" }
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
