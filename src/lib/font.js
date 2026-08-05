import { DM_Sans, Playfair_Display } from "next/font/google"

export const playFairDisplay = Playfair_Display({
  variable:"--font-playfair-display",
  subsets:['latin'],
})

export const dmSans = DM_Sans({
  variable:"--font-dm-sans",
  subsets:['latin'],
})