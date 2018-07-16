export type IdleDeadline = Readonly<{
    didTimeout: boolean;
    timeRemaining: () => number;
}>;

export type IdleCallback = (deadline: IdleDeadline) => void;
export type AnyFunction = (...args: any[]) => void;

export type RequestIdleCallbackOptions = {
    timeout?: number;
};
export type RequestIdleCallback = (fn: IdleCallback | AnyFunction, options?: RequestIdleCallbackOptions) => number;
export type CancelIdleCallback = (id: number) => void;

// tslint:disable-next-line:no-typeof-undefined
const ctx: any = typeof window !== 'undefined' ? window : global;

export const requestIdleCallback: RequestIdleCallback = ctx.requestIdleCallback || requestIdleCallbackShim;
export const cancelIdleCallback: CancelIdleCallback = ctx.cancelIdleCallback || ctx.clearTimeout;

function requestIdleCallbackShim(callback: IdleCallback): number {
    const start = Date.now();
    return ctx.setTimeout(() => {
        callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 12 - (Date.now() - start)),
        });
    });
}
