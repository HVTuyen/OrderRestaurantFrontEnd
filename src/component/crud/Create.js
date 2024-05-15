import { useState } from "react"
import { Link } from "react-router-dom";

import TextInput from "../input/TextInput"

const Create =(props) => {

    const [formData, setFormData] = useState({});

    const handleDataFromInput = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value 
        }));
    };

    const handleCreate = () => {
        props.sendData(formData)
    };

    return (
        <>
            <div className='title'>Thêm {props.title}</div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8' style={{borderRadius: '3px', border: '1px solid #333'}}>
                    
                    {props.item.map((item, index) => (
                        <div key={index} className="mb-3 row" style={{ margin: '24px' }}>
                            {item.type === 'Text' && (
                                <TextInput 
                                    title={item.title}
                                    name={item.name}
                                    type={item.type} 
                                    sendData={handleDataFromInput} 
                                />
                            )}
                        </div>
                    ))}


                    <div className='d-flex j-flex-end' style={{margin: '24px 38px 24px 24px'}}>
                        <button
                            className='btn btn-outline-primary' 
                            style={{marginRight:'6px'}}
                            onClick={handleCreate}
                        >
                            Lưu
                        </button>
                        <Link to={props.url} className='btn btn-outline-danger'>
                            Trở về
                        </Link>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
        </>
    )
}

export default Create;