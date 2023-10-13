import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeFolder } from "../../../redux/actionCreators/fileFolderActionCreator";

const Subbar = ({setIsCreateFolderModelOpen, setIsCreateFileModelOpen, setIsFileUploadModalOpen}) => {
      const navigate = useNavigate();
      const dispatch = useDispatch();


    const {currentFolder, currentFolderData, userFolders} = useSelector((state) => ({
    currentFolder: state.filefolders.currentFolder,
    currentFolderData: state.filefolders.userFolders.find(
      (folder) => folder.docId === state.filefolders.currentFolder
    ),
    userFolders: state.filefolders.userFolders,
    }),shallowEqual);


    const handleNavigate = (link, id) =>{
      navigate(link);

      dispatch(changeFolder(id));
 
   }


return (
  <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 px-4">
           <nav aria-label="breadcrumb">
           <ol class="breadcrumb d-flex align-items-center">

           {currentFolder != "root" ? (
            <>
            <button onClick={() => handleNavigate("/dashboard", "root")} 
            className='breadcrumb-item btn btn-link text-decoration-none'
            >
              Root
            </button>
            
            {currentFolderData?.data.path.map((folder, index) => (
              <button key={index} className='breadcrumb-tem btn btn-link text-decoration-none'
              onClick={() => 
              handleNavigate(
                `/dashboard/folder/${
                  userFolders.find((fldr) => folder === fldr.docId).docId
                }`,
                userFolders.find((fldr) => folder === fldr.docId).docId
              )
            }
            >
              {userFolders.find((fldr) => folder === fldr.docId).data.name}
            </button>
            ))}
            <li className='breadcrumb-item active'>
              {currentFolderData?.data.name}
            </li>
            </>
           ):(
            <>
             <li className='breadcrumb-item active'>
            Root
          </li>
            </>
           ) }
</ol>
</nav>

<ul className='navbar-nav ms-auto'>
<li className='nav-item '>
            <button className='btn btn-outline-dark btn-sm'
            onClick={()=>setIsFileUploadModalOpen(true)}>
            <i class="fa-regular fa-folder mx-2 "></i>
            Upload File
            </button>
        </li>

<li className='nav-item mx-2'>
            <button className='btn btn-outline-dark btn-sm'
            onClick={()=>setIsCreateFileModelOpen(true)}>
            <i class="fa-regular fa-folder mx-2 "></i>
            Create File
            </button>
        </li>

        <li className='nav-item '>
            <button className='btn btn-outline-dark btn-sm'
            onClick={()=>setIsCreateFolderModelOpen(true)}>
            <i class="fa-regular fa-folder mx-2 "></i>
            Create Folder
            </button>
        </li>
       </ul>
    </nav>
)


}
export default Subbar;
