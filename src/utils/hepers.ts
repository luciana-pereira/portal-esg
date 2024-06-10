import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

// Fun��o para recuperar os dados do usu�rio logado
export const getUserData = async (uid: string) => {
    const docRef = doc(db, 'user', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};