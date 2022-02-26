import { css, cx } from '@emotion/css'
import { lightTheme } from '../../assets/theme/mui-theme';

const ModalInfoStyle = css`
  display: flex; 
  align-items: center; 
  justify-content: center; 

  .modal-info-content {
    position: relative; 
    padding: 24px;
    padding-top: 16px;
    width: 400px;
    background: ${lightTheme.palette.background.paper};
    border-radius: 8px;

    .close-icon {
      position: absolute; 
      top: 16px; 
      right: 16px;
      cursor: pointer; 
    }

    .modal-info-title {
      margin-bottom: 8px;
    }
  }
`

export default ModalInfoStyle; 