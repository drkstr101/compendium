import styles from './theme-light-theme.module.css';

/* eslint-disable-next-line */
export interface ThemeLightThemeProps {}

export function ThemeLightTheme(props: ThemeLightThemeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ThemeLightTheme!</h1>
    </div>
  );
}

export default ThemeLightTheme;
