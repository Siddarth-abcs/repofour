import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { createFolder } from "../../../redux/actionCreators/fileFolderActionCreator";
import {toast} from "react-toastify";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
    const [folderName, setFolderName] = useState("");

    const { userFolders,user,currentFolder, currentFolderData } = useSelector(
        (state) => ({
            userFolders: state.filefolders.userFolders,
            user: state.auth.user,
            currentFolder: state.filefolders.currentFolder,
            currentFolderData: state.filefolders.userFolders.find(
                (folder) => folder.docId == state.filefolders.currentFolder
            ),
        }),
        shallowEqual
    )

        const dispatch = useDispatch();

    const checkFolderAlreadyPresent = (name) => {
        const folderPresent = userFolders
        .filter((folder) => folder.data.parent === currentFolder)
        .find((folder) => folder.data.name == name);
        if(folderPresent) {
            return true;
        }else {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (folderName) {
            if (folderName.length > 2) {
                if (!checkFolderAlreadyPresent(folderName)) {
                    const data = {
                        createdAt: new Date(),
                        name: folderName,
                        userId: user.uid,
                        createdBy: user.displayName,
                        path: currentFolder === "root" ? []
                        : [...currentFolderData?.data.path,currentFolder],
                        parent: currentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                    }
                    // console.log(data)
                    dispatch(createFolder(data))
            }else{
                toast.error("folder already predent")
                }
            }else {
                toast.error("Folder name must be at least 3 characters")
            }
        }else {
            toast.error("folder name cannot empty")
        }
    }

    return (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
        style={{background: "rgba(0, 0, 0, 0.4)", zIndex:9999} }
        >
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Create Folder</h4>
                        <button className="btn" 
                        onClick={()=>setIsCreateFolderModalOpen(false)}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                        <form className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                type="text"
                                className="form-control"
                                id="folderName"
                                placeholder="Folder Name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                 />
                            </div>

                            <button 
                            type="submit"
                            className="btn btn-primary mt-5 from-control">
                                Create Folder
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFolder;