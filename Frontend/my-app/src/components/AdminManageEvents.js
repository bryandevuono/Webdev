"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Events_1 = require("../api/Events");
const Calendar_1 = __importDefault(require("./Calendar"));
const EditEventPopUp_1 = __importDefault(require("./EditEventPopUp"));
const AddEventPopUp_1 = __importDefault(require("./AddEventPopUp"));
const AdminManageEvents = () => {
    const [succes, setSuccess] = (0, react_1.useState)(false);
    const [failed, setFailed] = (0, react_1.useState)(false);
    const [confirmDelete, setConfirmDelete] = (0, react_1.useState)(false);
    const [events, setEvents] = (0, react_1.useState)(undefined);
    const [currentEvent, setCurrentEvent] = (0, react_1.useState)(undefined);
    const [showEditPopup, setShowEditPopup] = (0, react_1.useState)(false);
    const [showAddPopup, setShowAddPopup] = (0, react_1.useState)(false);
    const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        const AllEvents = yield (0, Events_1.getAllEvents)(false);
        setEvents(AllEvents);
    });
    const handleEventClick = (event) => {
        setCurrentEvent(event);
        setShowEditPopup(true);
        setSuccess(false);
    };
    const handleDeleteClick = () => {
        setConfirmDelete(false);
        if (currentEvent !== undefined && currentEvent.kind === "event") {
            (0, Events_1.deleteEvent)(currentEvent.eventId);
            setSuccess(true);
            getEvents();
        }
    };
    (0, react_1.useEffect)(() => {
        getEvents();
    }, [succes]);
    return (<div className='admin-dashboard'>
        <h1 className='admin-dashboard-text'>Click on one of the event titles to edit an event:</h1>
        <Calendar_1.default events={events} className="admin-events" view="agenda" onSelectEvent={(event) => handleEventClick(event)} toolbar={false} selectable={true}/>
        
        <button className='add-button' onClick={() => setShowAddPopup(true)}>+</button>

        {showEditPopup ?
            <EditEventPopUp_1.default setSuccess={setSuccess} setShowPopup={setShowEditPopup} currentEvent={currentEvent} setConfirmDelete={setConfirmDelete} setFailed={setFailed}/>
            : null}
        
        {showAddPopup ?
            <AddEventPopUp_1.default setShowPopup={setShowAddPopup} setSuccess={setSuccess} setFailed={setFailed}/>
            : null}

        {succes ?
            <div className="success-msg">
                <i className="fa fa-check"></i>
                Changes saved!
            </div>
            : null}

        {failed ?
            <div className="error-msg">
                <i className="fa fa-times"></i>
                Error saving changes!
                </div>
            : null}

        {confirmDelete ?
            <div className="popup-overlay">
                <div className="popup-form">
                    <h2>Are you sure you want to delete this event?</h2>
                    <button onClick={() => setConfirmDelete(false)}>No</button>
                    <button onClick={() => handleDeleteClick()}>Yes</button>
                </div>
            </div>
            : null}
    </div>);
};
exports.default = AdminManageEvents;
