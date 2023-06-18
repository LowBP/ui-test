import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Col, Form, Row, Modal, Container } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import store, { ACTIVITY_TYPE, Activity, PERFORMER, PITCH } from '../../store/activityStore';
import { observer } from 'mobx-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';

type Props = {
    view: string;
    showModal: boolean;
    defaults: ActivityFormValues;
    toggleModal: (flag: boolean) => void;
}

export interface ActivityFormValues {
    performer: string
    activityType: string
    pitch: string
    dateTime: string
}

function CustomModal({ view, showModal, toggleModal, defaults }: Props) {

    const activitySchema = Yup.object().shape({
        performer: Yup.string().required("Performer is required"),
        activityType: Yup.string().required("Activity type is required"),
        pitch: Yup.string().required("Pitch is required"),
        dateTime: Yup.string().required("Date is required"),
    });

    const promptDelete = () => {
        store.toggleEditActivityModal(false);
        store.toggleDeleteActivityModal(true);
    }

    const showError = (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const showAlert = (message: string) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const addNewActivity = async (values: ActivityFormValues) => {
        store.toggleAddActivityModal(false);
        try {
            console.log(values);
            const activity: Activity = {
                id: values.activityType,
                activityType: values.activityType,
                dateTime: values.dateTime,
                performer: values.performer,
                pitch: values.pitch,
            }

            let activityId = await store.createActivity(activity);
            if (!activityId) {
                showError("Error in adding the activity!");
            }
            else {
                showAlert("Added the activity!");
            }
        }
        catch (e) {
            console.log(e);
            showError("Unable to add the activity!");
        }
    }

    const editActivity = (values: ActivityFormValues) => {
        store.toggleEditActivityModal(false);
        try {
            let updatedId = store.updateActivity(values);
            if (!updatedId) {
                showError("Failed to edit the activity!");
            }
            else {
                showAlert("Edited the activity!");
            }
        }
        catch (e) {
            showError("Unable to edit the activity!");
        }
    }

    const deleteActivity = () => {
        store.toggleDeleteActivityModal(false);
        try {
            store.removeCurrentActivity();
            showAlert("Deleted the activity!");
        }
        catch (e) {
            console.log(e);
            showError("Unable to delete the activity!");
        }
    }

    const renderActivtyTypeOptions = () => {
        return Object.values(ACTIVITY_TYPE).map((option) => {
            return <option key={option} value={option}>{option}</option>;
        });
    };

    const renderPerformerOptions = () => {
        return Object.values(PERFORMER).map(option => {
            return <option key={option} value={option}>{option}</option>;
        });
    };
    const renderPitchOptions = () => {
        return Object.values(PITCH).map(option => {
            return <option key={option} value={option}>{option}</option>;
        });
    };

    return (
        <div>
            <Modal show={showModal} onHide={() => view === "add" ? store.toggleAddActivityModal(false) : store.toggleEditActivityModal(false)}>
                <Modal.Header closeButton={true} className='justify-content-end'>
                    {view === "add" ? "Add Activity Details" : "Activity Details"}
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={activitySchema}
                        onSubmit={view === "add" ? addNewActivity : editActivity}
                        initialValues={defaults}
                        enableReinitialize
                    >
                        {(addActivityProps: FormikProps<ActivityFormValues>) => (
                            <div className='amenity-container'>
                                <Form noValidate onSubmit={addActivityProps.handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12">
                                            <Form.Label>Activity Type</Form.Label>
                                            <Form.Select
                                                placeholder="What task do I need?"
                                                value={addActivityProps.values.activityType}
                                                onChange={(e) => {
                                                    addActivityProps.setFieldValue("activityType", e.target.value);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                {renderActivtyTypeOptions()}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {addActivityProps.errors.activityType}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12">
                                            <Form.Label>Performer</Form.Label>
                                            <Form.Select
                                                placeholder="Who should do my task?"
                                                value={addActivityProps.values.performer}
                                                onChange={(e) => {
                                                    addActivityProps.setFieldValue("performer", e.target.value);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                {renderPerformerOptions()}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {addActivityProps.errors.performer}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12">
                                            <Form.Label>Pitch</Form.Label>
                                            <Form.Select
                                                placeholder="Where should I do the task?"
                                                value={addActivityProps.values.pitch}
                                                onChange={(e) => {
                                                    addActivityProps.setFieldValue("pitch", e.target.value);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                {renderPitchOptions()}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {addActivityProps.errors.pitch}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12">
                                            <Form.Label>Time</Form.Label>
                                            <Container>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDateTimePicker
                                                        label=""
                                                        value={dayjs(addActivityProps.values.dateTime)}
                                                        onChange={(newValue) => {
                                                            addActivityProps.setFieldValue("date", newValue);
                                                        }}
                                                        disableFuture={false}
                                                    />
                                                </LocalizationProvider>
                                            </Container>
                                            <Form.Control.Feedback type="invalid">
                                                {addActivityProps.errors.dateTime}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className='mx-2 my-2'>
                                        {
                                            view === "add" ?
                                                < button
                                                    type="submit"
                                                    className='btn btn-success bg-green-700'
                                                    disabled={(!addActivityProps.isValid)}
                                                >
                                                    Add
                                                </button>
                                                :
                                                <div className='manage-activity-btns'>
                                                    < button
                                                        type="submit"
                                                        className='btn btn-success mr-10 w-inherit bg-green-700'
                                                        disabled={(!addActivityProps.isValid)}
                                                    >
                                                        Save
                                                    </button>
                                                    < button
                                                        type="button"
                                                        className='btn btn-danger w-inherit bg-red-700'
                                                        onClick={(e) => promptDelete()}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                        }
                                    </Row>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <Modal show={store.deleteActivityModal} onHide={() => { store.toggleDeleteActivityModal(false) }}>
                <Modal.Header closeButton={true} className='justify-content-end'>
                    Confirm delete
                </Modal.Header>
                <Modal.Body>
                    Do you really want to remove?
                    <div className='manage-activty-btns'>
                        < button
                            type="button"
                            className='btn btn-danger w-inherit bg-red-700 mr-10'
                            onClick={() => deleteActivity()}
                        >
                            Yes
                        </button>
                        < button
                            type="button"
                            className='btn btn-success w-inherit bg-green-700'
                            onClick={() => store.toggleDeleteActivityModal(false)}
                        >
                            No
                        </button>
                    </div>
                </Modal.Body>
            </Modal >
        </div>
    )
}

export default observer(CustomModal)