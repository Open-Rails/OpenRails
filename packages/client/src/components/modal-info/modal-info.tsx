import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import HeadingElement, { THeadings } from '../text/heading-element/heading-element'
import ModalInfoStyle from './modal-info-style'
import ModalInfoContainer from './modal-info-style'
import CloseIcon from '@mui/icons-material/Close'

interface ModalInfoProps {
  open?: boolean
  onClose: () => void
  title: {
    text: string
    tag: THeadings
  }
  message: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}

const ModalInfo: React.FC<ModalInfoProps> = (props: ModalInfoProps) => {
  const { open, onClose, title, message, ariaLabelledBy, ariaDescribedBy } = props
  return (
    <Modal
      open={!!open}
      className={ModalInfoStyle}
      onClose={() => onClose()}
      aria-labelledby={ariaLabelledBy || 'modal-info'}
      aria-describedby={ariaDescribedBy || 'modal-info-description'}
    >
      <div className="modal-info-content">
        <CloseIcon className="close-icon" onClick={() => onClose()} />
        <Typography className="modal-info-title" variant="h5" component="div">
          <HeadingElement heading={title.tag} text={title.text} />
        </Typography>
        <Typography>
          <p>{message}</p>
        </Typography>
      </div>
    </Modal>
  )
}

export default ModalInfo
