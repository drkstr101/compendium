export interface CSSModule {
  readonly [key: string]: string;
}

declare module '*.module.css' {
  const classes: CSSModule;
  export default classes;
}

declare module '*.module.scss' {
  const classes: CSSModule;
  export default classes;
}

declare module '*.module.sass' {
  const classes: CSSModule;
  export default classes;
}

declare module '*.module.less' {
  const classes: CSSModule;
  export default classes;
}

declare module '*.module.styl' {
  const classes: CSSModule;
  export default classes;
}
