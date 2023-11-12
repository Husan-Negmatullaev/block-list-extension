import clsx from "clsx";
import { ButtonHTMLAttributes } from "react"

export type UIButtonVariant = "primary" | "secondary" | "outlined";

export type UIButtonProps = {
  variant: UIButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

export function UIButton({className, variant, ...props}: UIButtonProps) {
  
  return (
    <button {...props} className={
      clsx(className,
      "px-4 h-10 rounded cursor-pinter flex items-center justify-center gap-2",
      {
        "primary": "text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50 shadow shadow-teal-500/30",
        "secondary": "text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 shadow shadow-teal-500/30",
        "outlined": "border border-slate-300 hover:bg-slate-500 disabled:opacity-50"
      }[variant])} 
    />
  )
}