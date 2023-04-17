import { IData } from './const';

interface IPosition {
  offset: number;
  itemHeight: number;
}

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
