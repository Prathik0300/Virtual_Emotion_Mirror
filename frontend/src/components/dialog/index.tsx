import useIsMobile from "@/src/hooks/useIsMobile";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { drawerTitleContainer, drawerContainer } from "./style";
import { Drawer } from "@mui/material";

const CustomDialog = ({
  open,
  title,
  onCloseHandler,
  children,
  dwebStyles = {},
  mwebStyles = {},
}) => {
  console.log({ dwebStyles });
  const isMobile = useIsMobile();
  if (isMobile)
    return (
      <>
        <Drawer
          transitionDuration={300}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#b41859",
              color: "#fff8e6",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              ...mwebStyles,
            },
          }}
          anchor="bottom"
          open={open}
          onClose={onCloseHandler}
        >
          <div className={drawerContainer}>
            <div className={drawerTitleContainer}>
              {title}
              <div>
                <IconButton
                  onClick={onCloseHandler}
                  aria-label="close"
                  sx={(theme) => ({
                    color: theme.palette.secondary.main,
                  })}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </Drawer>
      </>
    );

  return (
    <>
      <Dialog
        onClose={onCloseHandler}
        open={open}
        aria-labelledby="custom-dialog-title"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#b41859",
            color: "#fff8e6",
            borderRadius: "10px",
            ...dwebStyles,
          },
        }}
      >
        <DialogTitle id="custom-dialog-title">{title}</DialogTitle>
        <IconButton
          onClick={onCloseHandler}
          aria-label="close"
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 11,
            color: theme.palette.secondary.main,
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDialog;
