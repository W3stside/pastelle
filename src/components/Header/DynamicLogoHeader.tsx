import { useMemo } from 'react'
import { TextProps } from 'rebass'
import styled from 'styled-components/macro'
import { useWindowSize } from 'hooks/useWindowSize'
import { MEDIA_WIDTHS } from 'theme/styles/mediaQueries'
import { ItemHeader, ItemHeaderProps } from 'pages/SingleItem/styleds'

const LogoHeader = styled(ItemHeader)`
  flex: 1 0 auto;
  letter-spacing: 0;
  text-decoration: none;
`
type DynamicHeaderLogoProps = TextProps & ItemHeaderProps
export default function DynamicHeaderLogo(props: DynamicHeaderLogoProps) {
  const { width } = useWindowSize()

  const constructedLogo = useMemo(() => {
    if (!width) return null
    if (width < MEDIA_WIDTHS.upToExtraSmall) {
      return 'PSTL'
      // width < 960px
    }
    // width < 720px
    else if (width < MEDIA_WIDTHS.upToSmall) {
      return 'PASTELLE'
      // width < 960px
    } else if (width < MEDIA_WIDTHS.upToMedium) {
      return 'PASTELLE APPAREL'
      // width < 1280px
    } else if (width < MEDIA_WIDTHS.upToLarge) {
      return 'PASTELLE APPAREL'
    } else {
      return 'PASTELLE APPAREL'
    }
  }, [width])

  return <LogoHeader {...props}>{constructedLogo}</LogoHeader>
}
