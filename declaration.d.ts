declare module 'non-typed-module';

declare module '*.svg' {
  const content: string;
  export default content;
}
