import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

export function customRender(ui: ReactElement, options = {}) {
  return render(ui, { ...options });
}
