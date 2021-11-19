import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { setModalShow } from '../../redux/add-edit-modal/add-edit-modal.actions';
import { selectModalShow } from '../../redux/add-edit-modal/add-edit-modal.selector';

import './add-edit-modal.styles.scss';
import { AddEditModalProps } from './add-edit-modal.types';

const AddEditModal = ({ showModal, closeModal } : AddEditModalProps) => {

    const handleClose = () => {
        if(closeModal) {
            closeModal(false);
        }
    };

    const handleAddEdit = () => {
        return;
    };

    return (
        <div>
            <Modal show={showModal  } animation={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>"Woohoo, you're reading this text in a modal!"</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    showModal : selectModalShow,
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    closeModal: (show:boolean) => dispatch(setModalShow(show)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);