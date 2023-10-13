import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { changeFolder } from '../../../redux/actionCreators/fileFolderActionCreator';
import {toast} from "react-toastify";

const ShowItems = ({title, items, type}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDblClick = (itemId) => {
    if (type==="folder") {
      dispatch(changeFolder(itemId))
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      toast.error("File clicked")
    }
  }
  return (
    <div className='w-100'>
        <h4 className='text-center border-bottom'>{title}</h4>
        <div className='row gap-2 py-4 flex-wrap'>
            {items.map((item,index) => {
                return( 
                <a href={item.data.url} target="_blank">
                  <p key={index * 55} className='col-md-2 py-3 text-center border d-flex flex-column'
                onDoubleClick={()=> handleDblClick(item.docId)}
                >
                  {type === "folder" ? (
                    <i class="fa-solid fa-folder"></i>
                  ):(
                    <i class="fa-solid fa-file"></i>
                  )}
                  {item.data && item.data.name ? item.data.name : 'No Name'} 
                  </p>
                </a>
                )
            })}
        </div>
    </div>
  )
}

export default ShowItems;
