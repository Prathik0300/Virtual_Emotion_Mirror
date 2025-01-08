const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
} as const;

type Breakpoint = keyof typeof breakpoints;

export const mediaQueryMinWidth = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [
    key,
    `@media (min-width: ${value}px)`,
  ])
) as Record<Breakpoint, string>;


export const mediaQueryMaxWidth = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [
    key,
    `@media (max-width: ${value}px)`,
  ])
) as Record<Breakpoint, string>;
