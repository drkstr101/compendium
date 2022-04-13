import styles from './theme-dark-theme.module.css';

/* eslint-disable-next-line */
export interface ThemeDarkThemeProps {}

export function ThemeDarkTheme(props: ThemeDarkThemeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ThemeDarkTheme!</h1>
    </div>
  );
}

export default ThemeDarkTheme;
