import { TFC } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'
import { darken, transparentize } from 'polished'

import { Column, Row } from 'components/Layout'
import { ProductPageProps } from './AsideWithVideo'
import { ExternalLink, TYPE } from 'theme'
import { Dribbble, Instagram } from 'react-feather'
import Button from 'components/Button'
import { SocialType } from 'mock/types'
import { STORE_IMAGE_SIZES, CATALOG_MAX_WIDTH } from 'constants/config'
import { MEDIA_WIDTHS } from 'theme/styles/mediaQueries'

const saturateAnimation = css`
  @keyframes saturate {
    0% {
      filter: contrast(1.8) saturate(20) blur(5px);
    }
    10% {
      filter: contrast(1.8) saturate(1) blur(0.8px);
    }
  }
`

const textShadowAnimation = css<{ itemColor: string }>`
  @keyframes textShadowAnimation {
    0% {
      text-shadow: 20px 2px 2px ${({ itemColor }) => itemColor};
      letter-spacing: 20px;
    }
    3% {
      text-shadow: 55px 2px 8px ${({ itemColor }) => itemColor};
    }
    5% {
      text-shadow: -22px 2px 2px pink;
    }
    7% {
      text-shadow: 47px 2px 8px ${({ itemColor }) => itemColor};
    }
    10% {
      text-shadow: 17px 2px 8px ${({ itemColor }) => itemColor};
    }
    47% {
      text-shadow: 10px 2px 2px ${({ itemColor }) => itemColor};
      letter-spacing: 7px;
    }
    48% {
      text-shadow: -20px 2px 1px pink;
    }
    49% {
      text-shadow: 20px 2px 2px ${({ itemColor }) => itemColor};
    }
    53% {
      text-shadow: 55px 2px 8px ${({ itemColor }) => itemColor};
    }
    55% {
      text-shadow: -32px 2px 2px purple;
    }
    57% {
      text-shadow: 47px 2px 7px lightgreen;
    }
    58% {
      text-shadow: -47px 2px 1px ${({ itemColor }) => itemColor};
    }
    60% {
      text-shadow: 20px 2px 2px ${({ itemColor }) => itemColor};
    }
    65% {
      text-shadow: 20px 2px 5px purple;
    }
  }
`

export const fadeInAnimation = css`
  @keyframes fadeIn {
    0% {
      filter: contrast(0) blur(100px);
    }
    100% {
      filter: contrast(1) blur(0px);
    }
  }
`

export const VideoContentWrapper = styled(Row)<{ hide?: boolean }>`
  z-index: -1;

  opacity: 1;
  ${({ hide }) => hide && `opacity: 0;`}
  transition: opacity 0.8s ease-in-out;

  video {
    // lock the video to 16:9 ratio
    // height: calc(100vw * (9 / 16));
    height: 100%;

    filter: contrast(1) saturate(1) blur(0px);

    ${saturateAnimation};

    animation-name: saturate;
    animation-duration: 10.4s;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      display: none;
    `}
  }
`
export const Strikethrough = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  height: 5px;
`
export type ItemHeaderProps = { animation?: boolean; animationDelay?: boolean; itemColor: string; maxWidth?: string }
export const ItemHeader = styled(TYPE.white)<ItemHeaderProps>`
  z-index: 100;
  font-style: italic;
  letter-spacing: 7px;
  font-size: 100px;  

  // logo
  > img {
    max-width: ${({ maxWidth = '100%' }) => maxWidth};
  }
  
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 65px;
  `}

  ${({ animation = false }) => animation && textShadowAnimation}
  ${({ animation = false, animationDelay = true, itemColor }) =>
    animation &&
    `
      text-shadow: 10px 2px 2px ${itemColor};
      animation-name: textShadowAnimation;
      animation-duration: 10s;
      animation-iteration-count: 3;
      ${animationDelay && 'animation-delay: 1s;'}
    `}
`

export const ItemLogo = styled.div<{ mobileView?: boolean; maxWidth?: string }>`
  > img {
    max-width: ${({ maxWidth = '100%' }) => maxWidth};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: -35px;  
  `}

  z-index: 100;
`

export const ItemLogoCssImport = styled(ItemLogo)<{ logoUri: string }>`
  position: fixed;
  // width: 710px;
  // bottom: -55px;
  // left: -45px;
  // right: 0;
  background: ${({ logoUri }) => `url(${logoUri}) center no-repeat, url(${logoUri}?tr=q-2) center no-repeat`};
  background-size: contain;
  height: 300px;
`

export const ItemSubHeader = styled(TYPE.black).attrs(props => ({
  fontSize: 16,
  padding: 2,
  fontWeight: 500,
  fontStyle: 'italic',
  ...props
}))<{ bgColor?: string; useGradient?: boolean }>`
  background: ${({ useGradient = false, bgColor = 'transparent' }) =>
    useGradient
      ? `linear-gradient(15deg, ${bgColor} 0%, ${transparentize(1, bgColor)} 35%, transparent 70%)`
      : bgColor};
  width: 100%;
`

export const ItemBreadcrumb = styled(NavLink)`
  color: ${({ theme }) => theme.black};
  font-size: 10px;
  font-weight: 300;
  text-decoration: none;
  text-transform: uppercase;

  > span:first-child {
    margin: 0 5px;
  }
`
export const ItemDescription = styled(TYPE.black).attrs({ fontSize: 18, padding: 2, fontWeight: 400 })`
  text-transform: uppercase;
  font-style: italic;

  .item-description-p:first-child {
    margin-top: 0;
  }
`

export const InnerContainer = styled(Column)<{ bgColor?: string }>`
  width: 100%;
  max-width: ${STORE_IMAGE_SIZES.SMALL}px;

  background: ${({ theme, bgColor }) => (bgColor ? transparentize(0.62, bgColor) : transparentize(0.35, theme.white))};
`

export const ItemAsidePanel = styled(Column)`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`

export const ItemContainer = styled(Row)<{ side?: 'LEFT' | 'RIGHT'; mobileView?: boolean; bgColor?: string }>`
  width: 100%;
  max-width: ${CATALOG_MAX_WIDTH}px;
  height: 100%;
  justify-content: center;
  align-items: stretch;

  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: stretch;
  `}

  > ${ItemAsidePanel} {
    overflow-y: auto;
    position: relative;
    justify-content: ${({ side = 'LEFT' }) => (side === 'LEFT' ? 'flex-start' : 'flex-end')};
    
    height: 100%;
    width: 100%;

    > ${InnerContainer} {
      position: relative;
      background: ${({ theme }) => transparentize(0.35, theme.white)};

      ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 100%;
      `}

      > ${ItemLogo} {
        margin-top: ${({ mobileView = false }) => (mobileView ? '0' : '-35px')};
      }

      ${({ mobileView }) =>
        mobileView &&
        `
        min-height: 100%;

        ${ItemLogo} {
          position: fixed;
          max-width ${STORE_IMAGE_SIZES.SMALL}px;
          bottom: -55px;
          left: 0px; right: 0;

          @media only screen and (max-width: ${MEDIA_WIDTHS.upToSmall}) {
            position: absolute;
            max-width: 100%;
          } 
        `}
      }
    }

    z-index: 2;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      border: none;
      margin: 0;
  `}
  }

  > ${VideoContentWrapper} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  select {
    min-width: 15ch;
    max-width: 100%;
    border: 1px solid var(--select-border);
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
    margin: 0 5px;
    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #fff;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

    display: grid;
    grid-template-areas: 'select';
    align-items: center;

    &:after {
      content: '';
      width: 0.8em;
      height: 0.5em;
      background-color: #777;
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);

      justify-self: end;
    }

    select,
    .select:after {
      grid-area: select;
    }
  }
`

export const ItalicStrikethrough = styled.i`
  text-decoration: line-through;
`

export const ItemCredits: TFC = ({ children }) => (
  <TYPE.black fontSize={14} padding="13px 8px" fontWeight={300} width="100%">
    {children}
  </TYPE.black>
)

function _showSocialUrl(type: string | SocialType) {
  switch (type) {
    case SocialType.INSTAGRAM:
      return <Instagram />
    case SocialType.DEVIANTART:
      return <Instagram />
    case SocialType.DRIBBBLE:
      return <Dribbble />
    case SocialType.TIKTOK:
      return <Instagram />
    case SocialType.BEHANCE:
      return <Instagram />
    default:
      return null
  }
}

export const ItemArtistInfo = (props: (ProductPageProps['artistInfo'] & { bgColor: string }) | undefined) => {
  if (!props) return null

  const { name, type, url, display, bgColor } = props

  return (
    <TYPE.black fontSize={14} padding={2} fontWeight={300}>
      <HighlightedText bgColor={bgColor}>
        <ItalicStrikethrough>PASTELLE</ItalicStrikethrough> x {name}
      </HighlightedText>
      <br />
      <br />
      <ExternalLink
        key={url}
        href={url}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 5 }}
      >
        {_showSocialUrl(type)} {display}
      </ExternalLink>
    </TYPE.black>
  )
}
type FloatingColoredBlock = {
  width?: number
  height?: number
  top?: number
  left?: number
  gradientBase?: string
  gradientEnd?: string
  rotation?: number
}

export const FloatingBlockContainer = styled.div<FloatingColoredBlock>`
  position: absolute;
  background-image: ${({ gradientBase = 'rgba(33, 114, 229, 0.1)', gradientEnd = 'rgba(33, 36, 41, 1)' }) =>
    `radial-gradient(50% 50% at 50% 50%, ${gradientBase} 0%, ${gradientEnd} 100%)`};

  transform: rotate(${({ rotation = 45 }) => rotation}deg);

  width: ${({ width = 755 }) => width}px;
  height: ${({ height = 292 }) => height}px;
  top: ${({ top = 57 }) => top}px;
  left: ${({ left = -106 }) => left}px;

  z-index: -1;
`

const FloatingColouredBlock = styled.div<{ color: string }>`
  height: 100%;
  width: 100%;
  background: ${({ color }) => color};
`

export const FloatingStrip = ({ color, ...rest }: FloatingColoredBlock & { color: string }) => (
  <FloatingBlockContainer {...rest}>
    <FloatingColouredBlock color={color} />
  </FloatingBlockContainer>
)

export const BreadcrumbWrapper = styled(ItemSubHeader)`
  display: flex;
  gap: 5px;
  margin-bottom: -24px;
  z-index: 100;
  padding-top: 4px;
  font-size: 12px;
`

export const PASTELLE_CREDIT = (
  <>
    Homegrown at <ItalicStrikethrough>PASTELLE</ItalicStrikethrough> labs
  </>
)

export const VideoControlButton = styled(Button)`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10;
  border-radius: 0 0 0 10px;
  z-index: 950;

  > ${ItemSubHeader} {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 5px;
    color: ${({ theme }) => theme.black};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
      display: none;
  `}
`

export const MobileItemCTA = styled(Row)`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  background-color: lavender;
  font-size: 40px;
  font-weight: 100;
  width: calc(100% - 600px);
  color: #000;
  letter-spacing: -3.5;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 100%;
      display: block;
  `}
`

export const HighlightedText = styled.span<{ color?: string; bgColor: string }>`
  color: ${({ theme, color = theme.white }) => color};
  background-color: ${({ bgColor }) => darken(0.3, bgColor)};
  padding: 5px 10px;
  line-height: 1.8;
`
