import '@emotion/react';

import { MainColors } from './styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    COLORS: MainColors;
  }
}
