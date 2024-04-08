


// NOT IN USE // IGNORED IN JEST CONFIG //

/* eslint-disable */
import { EditWindowTemplate } from './EditWindow.jsx'
import { useState } from 'react'

export const EditBar = (props) => {
    const [labels, setLabels] = useState(['','']);
    const [desc, setDesc] = useState(['','']);
    const [Cfunction, setCfunction] = useState('');
    const editBarState = props.state;
    const axios = props.axios;
    const courses = props.courses;
    const [editWindowState, setEditWindowState] = useState(false);

    const handleEditWindow = async (newLabel, newDesc, newFunction) => {
        if (!editWindowState) {
            setEditWindowState(true);
            setLabels(newLabel)
            setDesc(newDesc)
            setCfunction(newFunction)
        }
        else {
            setEditWindowState(false)
        }
    }

    if (editBarState===true) {
        return (
            <div>
            <div className='edit-buttons'>
            <button onClick={() => onLayout(nodes, edges)}>Auto Layout</button>
            <button onClick={() => handleEditWindow(
                ['Course name', 'Official ID', 'Kori name'],
                ['Enter course name:', 'Enter official course ID:', 'Enter Kori name:'],
                'add course'
                )}>Add Course</button>
            <button onClick={() => handleEditWindow(
                ['Course name'],
                ['Enter Kori name of the course to remove:'],
                'remove'
                )}>Remove Course</button>
            <button onClick={() => handleEditWindow(
                ['Course name','Prerequisite course name'],
                ['Enter the Kori name of the course:','Enter the Kori name of the prerequisite course:'],
                'add dependency'
                )}>Add Dependency</button>
            <button onClick={() => handleEditWindow(
                ['Course name','Prerequisite course name'],
                ['Enter the Kori name of the course:','Enter the Kori name of the prerequisite course:'],
                'remove dependency'
                )}>Remove Dependency</button>
            <button onClick={() => handleKORIAPITEST(axios)}>KORIAPI TEST</button>
            </div>
            <div>
            {editWindowState? <EditWindowTemplate state={editWindowState} labels={labels} 
            desc={desc} cfunc={Cfunction} axios={axios} courses={courses}/> : <></>}
            </div>
            </div>
        )
    }
}