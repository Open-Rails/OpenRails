import styled from '@emotion/styled'
import { lightTheme } from '../../../assets/theme/mui-theme';

const CardBalanceContainer = styled.div`

  //TODO : Delete this (this is an example)
  .card-balance-animation {
    width: 600px; 
    background: blue; 
  }

  .card-balance-paper {
    background: ${lightTheme.palette.background.paper};
    padding: 48px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    flex-direction: column; 

    .card-balance-title {
      margin-bottom: 8px; 
    }
  }



`

export default CardBalanceContainer; 