import { useEffect, useState } from 'react';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {toast} from "react-toastify";

import { createFile, createFolder } from '../../redux/actionCreators/fileFolderActionCreator';

const CreateFile = ({setIsCreateFileModelOpen})  => {
    const [fileName, setFileName] = useState("");
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
            setFileName("");
            setSuccess(false);
            setIsCreateFileModelOpen(false);
        }
    },[success])

// check
    const checkFileAlreadyPresent = (name) => {
        const filePresent = userFiles
        .filter((file) => file.data.parent === currentFolder)
        .find((fldr) => fldr.data.name === name)
        if(filePresent){
            return true;
        }else{
            return false;
        }
    }


// form handle
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(fileName) {
            if(fileName.length > 3){
                // extension
                let extension = false;
                if(fileName.split(".").length > 1){
                    extension = true;
                }
                if(checkFileAlreadyPresent){
                    
                    const data = {
                     createdAt: new Date(),
                     name: extension ? fileName : `${fileName}.txt`,
                     userId: user.uid,
                     createdBy: user.displayName,
                     path: currentFolder === "root" ? 
                     []: [...currentFolderData?.data.path, currentFolder],
                     parent: currentFolder,
                     lastAccessed: null,
                     updatedAt: new Date(), 
                     extension: extension? fileName.split(".")[1] : "txt",
                     data: "",
                     url: null,
                    }

                    console.log("data", data)
                    dispatch(createFile(data, setSuccess))


                }else{
                    toast.error("file already present" + fileName)
                }               
            }else{
                toast.error("File must 3 word" + fileName)
            }
        }else{
            toast.error("File empty" + fileName)
        }
    }


    return (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
        style={{background: "rgba(0,0,0,0.4)", zIndex: 9999}}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Create File</h4>
                        <button className="btn" onClick={() => setIsCreateFileModelOpen(false)}>
                        <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                        <form className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="folderName" placeholder="Folder Name" 
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                />
                            </div>
                            <button type="Submit" className="btn btn-primary mt-5 from-control">Create File</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default CreateFile;