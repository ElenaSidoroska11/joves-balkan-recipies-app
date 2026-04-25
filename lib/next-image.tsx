import type { ComponentType } from "react"
import NextImage, { type ImageProps } from "next/image"

/**
 * `next/image` v16.1.7’s declared props omit `alt` while runtime still requires it.
 * This wrapper restores correct `ImageProps` typing.
 */
const Image: ComponentType<ImageProps> = NextImage as ComponentType<ImageProps>
export default Image
export type { ImageProps } from "next/image"
