'use client'

import React from 'react'
import clsx from 'clsx'

import styles from './form-input.module.css'

import { Input } from '../../atoms/input'

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  type = 'text',
  className,
  label,
  ...props
}) => {
  const classNames = clsx(styles.formInputGroup, className)
  return (
    <div className={classNames}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} type={type} {...props} />
    </div>
  )
}
