import { Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

const CustomModal = ({ children, open, onCloseHandler }) => {
  const handleModalClose = () => {
    if (typeof onCloseHandler === "function") {
      onCloseHandler();
    }
  };
  return (
    <Modal
      aria-labelledby="custom-modal"
      aria-describedby="custom-modal-desc"
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <>hello</>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
