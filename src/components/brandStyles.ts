import { CSSProperties } from 'react';

import { Brand } from '../services';

/**
 * Produce a style object that sets `borderColor` from the brand's primary background colour.
 *
 * @param brand - Optional brand used to derive the border colour
 * @returns A `CSSProperties` object with `borderColor` set to the brand's primary background colour, or an empty object if that colour is not available
 */
export function getBrandBorderStyle(brand?: Brand): CSSProperties {
  const borderColor = brand?.colors?.primary?.[0]?.background;

  if (!borderColor) {
    return {};
  }

  return { borderColor };
}