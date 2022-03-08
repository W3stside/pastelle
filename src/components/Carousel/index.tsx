import { useState, useMemo, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { CarouselContainer, CarouselStep, CarouselButtonContainer, CarouselButton } from './styleds'

type CarouselProps = {
  fixedHeight?: string
  buttonColor: string
  imageList: string[]
  mediaStartIndex: number
  onCarouselChange?: (index: number) => void
}

export default function Carousel({
  fixedHeight,
  buttonColor,
  imageList,
  mediaStartIndex,
  onCarouselChange
}: CarouselProps) {
  const [selectedStep, setSelectedStep] = useState(mediaStartIndex)
  const [parentWidth, setParentWidth] = useState<number | undefined>()

  const { isMultipleCarousel, lastStepIndex } = useMemo(
    () => ({
      isMultipleCarousel: imageList.length > 0,
      lastStepIndex: imageList.length - 1
    }),
    [imageList.length]
  )
  // get a ref to the carouselImageboi
  const carouselImageRef = useRef<HTMLImageElement | null>(null)
  useEffect(() => {
    carouselImageRef.current?.focus()
  }, [])
  // get a ref to the carouselboi
  const carouselRef = useRef<HTMLDivElement | null>(null)
  // we need to hold and updated cache of the carousel parent's width in px
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (carouselRef.current) {
      const { parentElement } = carouselRef.current
      setParentWidth(parentElement?.offsetWidth)
    }
  })

  return (
    <CarouselContainer id="#carousel-container" ref={carouselRef} fixedHeight={fixedHeight}>
      {/* CAROUSEL CONTENT */}
      {imageList.map((image, index) => {
        if (!parentWidth) return null
        const isCurrentStep = index === selectedStep
        // has multiple steps and is on last item
        const isLastStep = isMultipleCarousel && selectedStep === lastStepIndex
        const calculatedWidth = isCurrentStep ? parentWidth : 0

        const onNext = () => {
          let indexToSet = undefined
          if (isLastStep) {
            indexToSet = 0
          } else {
            indexToSet = selectedStep + 1
          }
          // change carousel slide
          setSelectedStep(indexToSet)
          // side effect change item video
          onCarouselChange && onCarouselChange(indexToSet)
        }

        const onPrevious = () => {
          let indexToSet = undefined
          if (selectedStep === 0) {
            indexToSet = lastStepIndex
          } else {
            indexToSet = selectedStep - 1
          }
          // change carousel slide
          setSelectedStep(indexToSet)
          // side effect change item video
          onCarouselChange && onCarouselChange(indexToSet)
        }

        return (
          <CarouselStep
            id={'#carousel-step-' + index}
            key={index}
            justifyContent={'center'}
            $calculatedWidth={calculatedWidth + 'px'}
          >
            <img src={image} ref={carouselImageRef} decoding="async" loading="lazy" />
            {isMultipleCarousel && (
              <CarouselButtonContainer>
                <CarouselButton onClick={onPrevious} buttonColor={buttonColor}>
                  <ChevronLeft />
                </CarouselButton>
                <CarouselButton onClick={onNext} buttonColor={buttonColor}>
                  <ChevronRight />
                </CarouselButton>
              </CarouselButtonContainer>
            )}
          </CarouselStep>
        )
      })}
    </CarouselContainer>
  )
}