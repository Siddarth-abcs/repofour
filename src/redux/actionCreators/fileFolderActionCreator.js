import * as types from '../actionsTypes/fileFolderActionTypes';
import fire from '../../config/firebase'
// actions

const addFolder = (payload)=>({
    type: types.CREATE_FOLDER,
    payload
})

const addFolders = (payload) => ({
    type: types.ADD_FOLDERS,
    payload
})

const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload,
})

// action creators

export const createFolder = (data) => (dispatch) => {
    fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async (folder)=>{
        const folderData = await (await folder.get()).data();
        const folderId = folder.id;
        dispatch(addFolder({data: folderData, docId: folderId}));
        alert("Folder created successfully")
    });
}

export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    fire
    .firestore()
    .collection("folders")
    .where("userId","==",userId)
    .get()
    .then(async (folders) => {
        const folderData = await folders.docs.map((folder) => ({
            data: folder.data(),
            docId: folder.id
        }));
        dispatch(addFolders(folderData));
        dispatch(setLoading(false));
    })
}