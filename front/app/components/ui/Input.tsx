"use client"
import { FC } from "react"
import { UseFormRegister, FieldValues, FieldErrors, Control, useWatch } from "react-hook-form"
import clsx from "clsx"

type InputProps = {
  disabled: boolean,
  required: boolean,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>
  type: string,
  id: string,
  label: string,
  control?: Control,
  forNumber?: boolean,
}

const Input: FC<InputProps> = ({
  disabled,
  required,
  register,
  errors,
  type,
  id,
  label,
  control,
  forNumber,
}) => {
  let watch
  if (control) {
    watch = useWatch({ name: id, control })
  }
  return (
    <div className='mb-6'>
      <p>{errors[id]?.message as string}</p>
      <label
        htmlFor={id}
        className={clsx(
          // 共通スタイル
          `
            mb-2
            block 
            text-l 
            font-bold 
          `
          ,
          // 画像のinput
          type === "file" &&
          ` 
            cursor-pointer
            border
            border-[#d9d9d9] 
            py-2
          `
          ,
          // 画像が選択されたら色を変更
          (type === 'file' && watch?.length) &&
          'bg-[#72c4ff] text-white'
        )}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, {
          required: {
            value: required,
            message: `${id}を入力してください`
          },
          pattern: {
            value: forNumber ? /^\d+(?:\.\d+)?$/ : /.*/,
            message: forNumber ? "数字を入力してください" : "使用不可能な文字が使用されています"
          },
          maxLength: {
            value: 30,
            message: `${id}は30字までです`
          }
        })}
        className={clsx(
          `
              w-full 
              border 
            border-[#d9d9d9]
          `
          ,
          type === 'file' &&
          'hidden'
        )}
      />

    </div>
  )
}

export default Input