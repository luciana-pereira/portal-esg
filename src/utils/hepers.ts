import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

// Função para recuperar os dados do usuário logado
export const getUserData = async (uid: string) => {
    const docRef = doc(db, 'user', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};