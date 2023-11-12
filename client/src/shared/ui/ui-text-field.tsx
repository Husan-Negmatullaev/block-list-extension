import clsx from "clsx";
import { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithRef } from "react"

export type UITextfieldProps = {
  label?: string;
  error?: string;
  className?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>; 
}

export function UITextField({className, error, label, inputProps}: UITextfieldProps) {
  
  return (
    <div className={clsx(className, "flex flex-col")}>
      some
    </div>
  )
}