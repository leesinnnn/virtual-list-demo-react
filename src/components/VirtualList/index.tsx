import React, { useCallback, useMemo, useState } from "react";
import { IVirtualListProps } from './const';
import { getInitPosition } from './utils';
import './index.css'

const PREFIX = 'virtual-list'

const VirtualList: React.FC<IVirtualListProps> = props => {
  const {
    estimateItemHeight,
    data,
    containerHeight,
    ItemRender
  } = props;

  const [positon, setPosition] = useState(() => getInitPosition(data, estimateItemHeight));
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = positon.findIndex(item => item.offset > scrollTop)
  const endIndex = Math.ceil(containerHeight / estimateItemHeight) + startIndex + 1
  const visibleData = data.slice(startIndex, endIndex)

  const totalHeight = positon.reduce((pre, item) => pre + item.itemHeight, 0)


  const handleScroll: React.UIEventHandler<HTMLDivElement> = e => {
    const { target } = e
    requestAnimationFrame(() => {
      setScrollTop((target as any).scrollTop)
    })
  }

  return (
    <div className={`${PREFIX}-container`} style={{ height: `${containerHeight}px`}} onScroll={handleScroll}>
      <div className={`${PREFIX}-container-placeholder`} style={{ height: `${totalHeight}px` }}/>
      <div className={`${PREFIX}-container-content`} style={{ transform: `translateY(${positon[startIndex -1]?.offset || 0}px)`}}>
        {visibleData.map(item => (
          <ItemRender itemData={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default VirtualList;