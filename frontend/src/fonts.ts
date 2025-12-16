import {
  Squada_One,
  Monomaniac_One,
  Barlow_Semi_Condensed,
  JetBrains_Mono,
  Pixelify_Sans
} from 'next/font/google';

// Logo font.
export const pixelify = Pixelify_Sans({
  weight: ['700'],
  subsets: ['latin'],
})

// Title font.
export const monomaniac = Monomaniac_One({
  weight: ['400'],
  subsets: ['latin'],
});

// Subtitle font.
export const barlow = Barlow_Semi_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

// Code font.
export const jetbrains = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});