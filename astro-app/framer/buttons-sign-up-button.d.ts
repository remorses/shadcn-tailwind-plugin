/* This file was generated by Unframer, do not edit manually */
import * as React from "react"

import { UnframerBreakpoint } from "unframer"

export interface Props {
    children?: React.ReactNode
    style?: React.CSSProperties
    className?: string
    id?: string
    width?: any
    height?: any
    layoutId?: string
    "variant"?: 'Variant 1' | 'Variant 2' | 'Variant 3'
    "buttonText"?: string
    "link"?: string
}

const ButtonsSignUpButtonFramerComponent = (props: Props) => any

type VariantsMap = Partial<Record<UnframerBreakpoint, Props['variant']>> & { base: Props['variant'] }

ButtonsSignUpButtonFramerComponent.Responsive = (props: Omit<Props, 'variant'> & {variants: VariantsMap}) => any

export default ButtonsSignUpButtonFramerComponent

