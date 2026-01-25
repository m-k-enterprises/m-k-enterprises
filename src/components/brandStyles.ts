import { CSSProperties } from 'react';

import { Brand } from '../services';

export function getBrandBorderStyle(brand?: Brand): CSSProperties | undefined {
  const borderColor = brand?.colors?.primary?.[0]?.background;

  if (!borderColor) {
    return undefined;
  }

  return { borderColor };
}
