import { CSSProperties } from 'react';

import { Brand } from '../services';

/**
 * Returns a style object that sets the border color based on the brand's primary color.
 * Intended for components that already define border width/style via CSS.
 */
export function getBrandBorderStyle(brand?: Brand): CSSProperties {
  const borderColor = brand?.colors?.primary?.[0]?.background;

  if (!borderColor) {
    return {};
  }

  return { borderColor };
}
