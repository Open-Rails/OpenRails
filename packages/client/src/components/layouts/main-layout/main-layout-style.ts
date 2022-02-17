import styled from '@emotion/styled'
import { screenSizes } from '../../../constants/screen-sizes';

const MainLayoutContainer = styled.div`
  .main-app {
    padding: 16px; 

    @media (min-width: ${screenSizes.ipadPro}px) {
      padding:32px; 
    }
  }
`

export default MainLayoutContainer;