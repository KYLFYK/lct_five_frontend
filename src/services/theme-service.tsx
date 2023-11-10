import { Theme, ThemeProvider } from '@emotion/react';import ConfigProvider from 'antd/lib/config-provider';import { FC, PropsWithChildren } from 'react';import { MainColorsLight, Sizes } from '../styles/theme';export const lightTheme: Theme = {  COLORS: MainColorsLight,};export const ThemeService: FC<PropsWithChildren> = ({ children }) => {  return (    <ThemeProvider theme={lightTheme}>      <ConfigProvider        locale={{          locale: 'ru',        }}        theme={{          token: {            colorPrimary: lightTheme.COLORS.ACCENT.PRIMARY,            colorSuccess: lightTheme.COLORS.ACCENT.SUCCESS,            colorWarning: lightTheme.COLORS.ACCENT.WARNING,            colorError: lightTheme.COLORS.ACCENT.DANGER,            colorInfo: lightTheme.COLORS.ACCENT.SECONDARY,            colorTextBase: lightTheme.COLORS.TEXT.COMMON_TEXT,            colorBgBase: lightTheme.COLORS.WHITE.C100,            borderRadius: Sizes.BORDER_RADIUS,            fontFamily: "'Open Sans', sans-serif",          },        }}      >        {children}      </ConfigProvider>    </ThemeProvider>  );};