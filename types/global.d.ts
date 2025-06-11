declare module 'gsap' {
  export const gsap: any;
  export function to(targets: any, vars: any): any;
  export function from(targets: any, vars: any): any;
  export function fromTo(targets: any, fromVars: any, toVars: any): any;
  export function set(targets: any, vars: any): any;
  export function timeline(vars?: any): any;
  export function delayedCall(delay: number, callback: Function, params?: any[], scope?: any): any;
  export function registerPlugin(...args: any[]): void;
  export default gsap;
}

declare module 'gsap/dist/ScrollTrigger' {
  const ScrollTrigger: any;
  export { ScrollTrigger };
}

declare module 'gsap/dist/Draggable' {
  const Draggable: any;
  export { Draggable };
}

declare module 'gsap/dist/SplitText' {
  const SplitText: any;
  export { SplitText };
}

declare module '@fortawesome/fontawesome-free' {
  export const fontawesome: any;
} 