import clsx from 'clsx'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import style from './category.module.scss'
import { CATEGORY_API } from '../constants'
import {getCategoriesAPI} from '../../../api/category'
import CategoryEdit from './CategoryEdit'


function Category({isrender}) {
    console.log('re-render-Category')
    const [categories,setCategories] = useState([])
    const [categoriesSearch,setCategoriesSearch] = useState([])
    const [category,setCategory] = useState('')

    useEffect(() => {
        axios.get(CATEGORY_API)
            .then(res => {
                setCategories(res.data);
                setCategoriesSearch(res.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [])

    useEffect(() => {
        setCategoriesSearch(Category ? categories.filter(item => item.title.includes(category)) : categories);
    }, [category])
    
    console.log(category)
    console.log(categories)
    console.log(categoriesSearch)

    const classCategorySearch = clsx(style.categorySearch, 'input-group')
    const classCategoryButton = clsx(style.categoryButton, 'btn btn-outline-primary')
    const classCategoryIcon = clsx(style.categoryIcon)
    const classCategoryTable = clsx(style.categoryTable, 'table')
    const classCategoryColId = clsx(style.categoryCol, 'col-1')
    const classCategoryColName = clsx(style.categoryCol, 'col-4')
    const classCategoryColDes = clsx(style.categoryCol, 'col-6')
    const classCategoryColAction = clsx(style.categoryCol, 'col-1')
    const classCategoryTableIcon = clsx(style.categoryTableIcon)

    return (
        <div className="col-10">
            <div className='title'>Danh sách loại món ăn</div>
            <div className={classCategorySearch}>
                <input type="text" className="form-control" placeholder="Nhập loại món ăn cần tìm..." 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
                <button className={classCategoryButton} type="button">
                    <FontAwesomeIcon icon={faSearch} className={classCategoryIcon} style={{width: '100%'}}/>
                </button>
                <Link className={classCategoryButton} to='/Category/Add'>
                    <FontAwesomeIcon icon={faPlus} className={classCategoryIcon}/>
                    Thêm
                </Link>
            </div>

            <table className={classCategoryTable}>
                <thead>
                    <tr>
                        <th className={classCategoryColId}>#</th>
                        <th className={classCategoryColName}>Tên loại</th>
                        <th className={classCategoryColDes}>Mô tả</th>
                        <th className={classCategoryColAction}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoriesSearch?.map((item) => {
                            return (
                                <tr key={item.categoryId}>
                                    <th className={classCategoryColId}>{item.categoryId}</th>
                                    <td className={classCategoryColName}>{item.categoryName}</td>
                                    <td className={classCategoryColDes}>{item.description}</td>
                                    <th className={classCategoryColAction}>
                                        <Link to={`/Category/Edit/${item.categoryId}`}>
                                            <FontAwesomeIcon icon={faEdit} className={classCategoryTableIcon} style={{color:'#5c94ff'}}/>
                                        </Link>
                                        <Link to={`/Category/Delete/${item.categoryId}`}>
                                            <FontAwesomeIcon icon={faTrash} className={classCategoryTableIcon} style={{color:'#ff5252'}}/>
                                        </Link>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}


export default Category;