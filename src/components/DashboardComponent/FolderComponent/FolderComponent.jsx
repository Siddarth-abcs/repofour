import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux"
import ShowItems from "../ShowItems/ShowItems";

const FolderComponent = () => {
    const { folderId } = useParams();

    const { currentFolderData, childFolders, childFiles } = useSelector(
        (state) => ({
            currentFolderData: state.filefolders.userFolders.find(
                (folder) => folder.docId === folderId
            )?.data,
            childFolders: state.filefolders.userFolders.filter(
                (folder) => folder.data.parent === folderId
            ),
            childFiles: state.filefolders.userFiles.filter(
                (file) => file.data.parent === folderId
            ),
        }),
        shallowEqual
    )



        const createFiles = childFiles && childFiles.filter((file) => file.data.url == null)
        const uploadedFiles = childFiles && childFiles.filter((file) => file.data.data == null)

    return (
        <div>
                    {
            childFolders.length > 0 ? (
                <>
                {childFolders.length > 0 && (
                <ShowItems 
                title={"Created Folders"} 
                type={"folder"} 
                items={childFolders}
                />
                )}
                {createFiles && createFiles.length > 0 && (
                <ShowItems 
                title={"Created File"} 
                type={"file"} 
                items={createFiles} 
                />
                )}
                {uploadedFiles && (
                <ShowItems 
                title={"Uploaded file"} 
                type={"file"} 
                items={uploadedFiles} 
                />
                    
                )}

                </>
            ) : (
                
                <>
               
                <ShowItems 
                title={"Uploaded file"} 
                type={"file"} 
                items={uploadedFiles} 
                />
                  {uploadedFiles.length == 0 && (
  <p className="text-center my-5">Empty Folder</p>
)}
                </>
            )
        }
        </div>

    )
}

export default FolderComponent;