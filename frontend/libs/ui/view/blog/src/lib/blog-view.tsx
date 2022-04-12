import styles from './blog-view.module.css';

/* eslint-disable-next-line */
export interface BlogViewProps {}

export function BlogView(props: BlogViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BlogView!</h1>
    </div>
  );
}

export default BlogView;
