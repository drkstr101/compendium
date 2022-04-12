import styles from './expo-view.module.css';

/* eslint-disable-next-line */
export interface ExpoViewProps {}

export function ExpoView(props: ExpoViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ExpoView!</h1>
    </div>
  );
}

export default ExpoView;
