import { Modal } from "./modal"


export const DeleteAccountModal = ({open, title, description, children}) => {
    return (
        <Modal open={open} title={title} description={description}>
            {children}
        </Modal>
    )
}