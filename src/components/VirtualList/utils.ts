import { IData } from './const';

interface IPosition {
  offset: number;
  itemHeight: number;
}

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

export const getInitPosition = (data: IData[], itemHeight: number) => {
  const result: IPosition[] = [];
  data.forEach((_, index) => {
    if (index === 0) {
      result.push({
        offset: itemHeight,
        itemHeight
      })
    } else {
      result.push({
        offset: result[index - 1].offset + itemHeight,
        itemHeight
      })
    }
  })
  return result;
}

export const throttle = <T extends (...args: any[]) => any>(fn: T, timeout?: number): T => {
  let isCalling = false
  const wrappedFn: (...args: Parameters<T>) => ReturnType<T> = (...args): any => {
    if (isCalling) {
      return
    }
    isCalling = true
    setTimeout(() => {
      fn(...args)
      isCalling = false
    }, timeout)
  }
  return wrappedFn as T
}

export const debounce = <T extends (...args: any[]) => any>(fn: T, timeout?: number): T => {
  let timerId: number;
  const wrappedFn: (...args: Parameters<T>) => ReturnType<T> = (...args): any => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn(...args)
    }, timeout)
  }
  return wrappedFn as T
}
