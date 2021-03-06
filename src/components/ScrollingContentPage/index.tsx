import { FixedAnimatedLoader } from 'components/Loader'
import { ScrollingContentIndicator, ScrollingIndicatorParams } from 'components/ScrollingIndicator'
import { ScrollerContainer, Scroller, AnimatedDivContainer } from './styleds'

import PastelleIvoryOutlined from 'assets/svg/pastelle-ivory-outlined.svg'
import useScrollingPageAnimation from 'hooks/useScrollingPageAnimation'
import { LoadInView } from 'hooks/useDetectScrollIntoView'

interface ScrollingContentPageParams<D> {
  data: D[]
  dataItem: D | undefined
  fixedHeight?: number
  hideHeight?: number
  showIndicator?: boolean
  onContentClick?: React.MouseEventHandler<HTMLDivElement>
  IterableComponent: (props: D & ScrollableContentComponentBaseProps) => JSX.Element
}

export interface ScrollableContentComponentBaseProps {
  itemIndex: number
  isActive: boolean
  firstPaintOver: boolean
  loadInView?: LoadInView
}

type Params<P> = ScrollingContentPageParams<P> & Omit<ScrollingIndicatorParams, 'isLastIndex'>

export function ScrollingContentPage<D>({
  data,
  dataItem,
  fixedHeight,
  showIndicator = true,
  onContentClick,
  IterableComponent,
  ...indicatorProps
}: Params<D>) {
  const { springs, setTargetRef, height, currentIndex, firstPaintOver } = useScrollingPageAnimation(data, {
    visible: 1,
    fixedHeight,
    snapOnScroll: false,
    // defaults to 0.8 scale on scroll and 1 scale default
    scaleOptions: {
      initialScale: 0.87
    }
  })

  if (!dataItem) return null

  return (
    <>
      <FixedAnimatedLoader loadText={<img src={PastelleIvoryOutlined} />} left="50%" animation width="40vw" />
      <ScrollerContainer>
        {/* scroll div */}
        <Scroller ref={setTargetRef} onClick={onContentClick && onContentClick} />
        {/* Were in mobile or the data passed only has 1 item, don't run loop animations */}
        {springs.map(({ y, scale }, i) => {
          return (
            <AnimatedDivContainer key={i} style={{ scale, height, y }}>
              {showIndicator && <ScrollingContentIndicator {...indicatorProps} />}
              <IterableComponent
                loadInView={{
                  container: document,
                  conditionalCheck: firstPaintOver
                }}
                firstPaintOver={firstPaintOver}
                isActive={currentIndex === i}
                itemIndex={currentIndex}
                key={i}
                {...data[i]}
              />
            </AnimatedDivContainer>
          )
        })}
      </ScrollerContainer>
    </>
  )
}
