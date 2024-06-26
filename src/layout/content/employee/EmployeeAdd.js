import clsx from 'clsx'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { EMPLOYEE_TITLE, EMPLOYEE_TYPE } from '../../constants'
import { storage } from '../../../firebaseConfig';
import Create from '../../../component/crud/Create';
import { useAuth } from '../../../component/Context/AuthProvider';
import { renewToken } from '../../../CallApi/renewToken'

// function EmployeeAdd( ) {

//     const navigate = useNavigate();

//     const [employeeName,setEmployeeName] = useState('')
//     const [phone,setPhone] = useState('')
//     const [email,setEmail] = useState('')
//     const [password,setPassword] = useState('')
//     const [urlImage,setUrlImage] = useState('')
//     const [previewImg,setPreviewImg] = useState('')

//     console.log(employeeName,phone, email, password)

//     //Xử lý ảnh
//     const [image, setImage] = useState(null);

//     useEffect(() => {
//         return () => {
//             previewImg && URL.revokeObjectURL(previewImg.preview)
//         }
//     }, [previewImg])

//     const handleChange = (e) => {
//         const img = e.target.files[0]
//         if (img) {
//             setImage(img);
//             img.preview = URL.createObjectURL(img)
//             setPreviewImg(img)
//         }
//     };

//     const metadata = {
//         contentType: 'image/jpeg',
//     };

//     const handleUpload = () => {
// 		const storageRef = ref(storage, `images/${image.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, image, metadata);
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref)
//                     .then((downloadURL) => {
//                         setUrlImage(downloadURL);
//                         setImage(null);
//                         console.log('File available at', downloadURL);
//                     });
//             }
//         );
//     }

//     useEffect(() => {
//         if (urlImage) {
//             createEmployee();
//         }
//     },[urlImage]);

//     const createEmployee = async () => {
//         const newEmployee = {
//             employeeName: employeeName,
//             phone: phone,
//             email: email,
//             password: password,
//             image: urlImage,
//         };
        
//         axios.post(`${EMPLOYEE_API}postEmployee`,newEmployee)
//         .then(() => {
//             navigate('/Ql/Employee');
//         })
//         .catch(error => {
//             console.error('Error creating employee:', error);
//         });
//     };
    
//     return (
//         <div className="col-10">
//             <div className='title'>Thêm nhân viên</div>
//             <div className='row'>
//                 <div className='col-2'></div>
//                 <div className='col-8' style={{borderRadius: '3px', border: '1px solid #333'}}>
//                     <div className="mb-3 row" style={{margin: '24px'}}>
//                         <label className="col-sm-3 col-form-label">Tên nhân viên</label>
//                         <div className="col-sm-9">
//                             <input 
//                                 type="text" 
//                                 className="form-control"
//                                 value={employeeName}
//                                 onChange={e => setEmployeeName(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row" style={{margin: '24px'}}>
//                         <label className="col-sm-3 col-form-label">Số điện thoại</label>
//                         <div className="col-sm-9">
//                             <input 
//                                 type="text" 
//                                 className="form-control"
//                                 value={phone}
//                                 onChange={e => setPhone(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row" style={{margin: '24px'}}>
//                         <label className="col-sm-3 col-form-label">Email</label>
//                         <div className="col-sm-9">
//                             <input 
//                                 type="text" 
//                                 className="form-control"
//                                 value={email}
//                                 onChange={e => setEmail(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row" style={{margin: '24px'}}>
//                         <label className="col-sm-3 col-form-label">Mật khẩu</label>
//                         <div className="col-sm-9">
//                             <input 
//                                 type="text" 
//                                 className="form-control"
//                                 value={password}
//                                 onChange={e => setPassword(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row" style={{margin: '24px'}}>
//                         <label className="col-sm-3 col-form-label">Ảnh</label>
//                         <div className="col-sm-6">
//                             <input 
//                                 type="file" 
//                                 className="form-control"    
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="col-sm-3">
//                             {previewImg && (
//                                 <img src={previewImg.preview} style={{width: '100%', height: '100%'}}/>
//                             )}
//                         </div>
//                     </div>
//                     <div className='d-flex j-flex-end' style={{margin: '24px 38px 24px 24px'}}>
//                         <button
//                             className='btn btn-outline-primary' 
//                             style={{marginRight:'6px'}}
//                             onClick={handleUpload}
//                         >
//                             Lưu
//                         </button>
//                         <Link to='/Ql/Employee' className='btn btn-outline-danger'>
//                             Trở về
//                         </Link>
//                     </div>
//                 </div>
//                 <div className='col-2'></div>
//             </div>
//         </div>
//     )
// }

function EmployeeAdd() {

    const { account, token, refreshToken, reNewToken } = useAuth();

    return (
        <div className="col-10">
            <Create
                type={EMPLOYEE_TYPE}
                url='/Ql/Employee'
                title={EMPLOYEE_TITLE}
                item={
                    [
                        {
                            title: 'Tên nhân viên',
                            name: 'name',
                            type: 'Text',
                        },
                        {
                            title: 'Email',
                            name: 'email',
                            type: 'Text',
                        },
                        {
                            title: 'Mật khẩu',
                            name: 'password',
                            type: 'Text',
                        },
                        {
                            title: 'Ảnh',
                            name: 'image',
                            type: 'Image',
                        }
                    ]
                }
            />
        </div>
    )
}


export default EmployeeAdd;