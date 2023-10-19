import { useEffect, useState } from 'react';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
// import { createFile, createFolder } from '../../../redux/actionCreators/filefolderActionCreater';
import { uploadFile } from '../../../redux/actionCreators/fileFolderActionCreator';
import {toast} from "react-toastify";

const UploadFile = ({setIsFileUploadModelOpen})  => {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

// dataget
    const {user , userFiles, currentFolder, currentFolderData} = useSelector(
    (state) => ({
        userFiles: state.filefolders.userFiles,
        user: state.auth.user,
        currentFolder: state.filefolders.currentFolder,
        currentFolderData: state.filefolders.userFolders.find(
            (folder) => folder.docId === state.filefolders.currentFolder
        ),
    }),shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if(success) {
            setFile("");
            setSuccess(false);
            setIsFileUploadModelOpen(false);
        }
    },[success])

// check
    const checkFileAlreadyPresent = (name) => {
        const filePresent = userFiles
        .filter((file) => file.data.parent === currentFolder)
        .find((fldr) => fldr.data.name === name)
        if(filePresent){
            return false;
        }else{
            return true;
        }
    }


// // form handle
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(file) {
                if(checkFileAlreadyPresent(file)){
                    
                    const data = {
                     createdAt: new Date(),
                     name: file.name,
                     userId: user.uid,
                     createdBy: user.displayName,
                     path: currentFolder === "root" ? 
                     []: [...currentFolderData?.data.path, currentFolder],
                     parent: currentFolder,
                     lastAccessed: null,
                     updatedAt: new Date(), 
                     extension: file.name.split(".")[1],
                     data: null,
                     url: "",
                    }

                   dispatch(uploadFile(file, data, setSuccess))
                    console.log(data)

                }else{
                    toast.error("file already present" + folderName)
                }               
            }else{
                toast.error("File must 3 word" + folderName)
            }
   }


    return (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
        style={{background: "rgba(0,0,0,0.4)", zIndex: 9999}}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Upload File</h4>
                        <button className="btn" onClick={() => setIsFileUploadModelOpen(false)}>
                        <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                        <form className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                
                                <input type="file" className="form-control" id="folderName" 
                                
                                onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <button type="Submit" className="btn btn-primary mt-5 from-control">Upload File</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default UploadFile;