import { a } from '@react-spring/web'
import { STORE_IMAGE_SIZES } from 'constants/config'
import styled from 'styled-components/macro'

export const AnimatedDivContainer = styled(a.div)`
  position: absolute;
  width: 100%;
  will-change: transform;

  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 50px 10px lightsalmon;
  }

  transition: box-shadow 0.2s ease-in-out;
`

export const Scroller = styled.div<{ index?: number; clientHeight?: number }>`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  cursor: pointer;
  // width: calc(100% - ${STORE_IMAGE_SIZES.SMALL}px);
  z-index: 900;

  touch-action: none;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 100%;
  `}
`

export const ScrollerContainer = styled.div`
  height: 100%;

  touch-action: none;
  transition: transform 350ms ease-in-out;
`
