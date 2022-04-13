export type MDXComponent = (props) => JSX.Element;

declare module '*.mdx' {
  export default MDXComponent;
}
