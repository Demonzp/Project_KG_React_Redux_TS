import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type Props = {
  modal: boolean;
  toggleModal: ()=>void;
  modalHandler?: (v:any)=>void;
  textHeader?: string;
  textSubmit?: string;
  textCancel?: string;
  children: ReactElement;
}

const CustomModal:React.FC<Props> = ({ modal, toggleModal, modalHandler = () => { }, textHeader = '', textSubmit = 'Ok', textCancel = 'Cancel', children }) => {
    const [modifyChildren, setModifyChildren] = useState<React.ReactElement|undefined>();
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (args:any) => {
        setIsSubmit(false);
        if(args){
          modalHandler(args);
        }
    }

    useEffect(() => {
      setModifyChildren(React.cloneElement(children, { isSubmit, handleSubmit }));
    }, [children, isSubmit]);

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{textHeader}</ModalHeader>
            <ModalBody>
                {modifyChildren}
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={()=>setIsSubmit(true)}>{textSubmit}</Button>{' '}
                <Button color='secondary' onClick={toggleModal}>{textCancel}</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CustomModal;