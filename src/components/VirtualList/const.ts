export type IData = Record<string, any>;

export interface IVirtualListProps {
  estimateItemHeight: number;
  data: IData[];
  containerHeight: number;
  ItemRender: React.FC<{ itemData: IData }>
}