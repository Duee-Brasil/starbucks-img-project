import { ICreatePiece } from "@types";
import { db } from "@utils";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "brands";

const createPiece = async (campanha: ICreatePiece) => {
  const target = doc(db, collectionName, campanha.marca);

  await updateDoc(target, {
    campaigns: arrayUnion(campanha),
  })
    .then((res) => {
      console.log("Document add", res);
      alert("Document add");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
};

const findPieceByID = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

const findPieces = async (marca: string) => {
  const docRef = doc(db, collectionName, marca);
  const querySnapshot = await getDoc(docRef);

  if (querySnapshot.exists()) {
    return querySnapshot.data()?.campaigns;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

export function useCreatePiece() {
  return useMutation(createPiece);
}

export function useGetPieceByID() {
  return useMutation(findPieceByID);
}

export function useGetPieces(marca: string) {
  return useQuery("findPieces", () => findPieces(marca));
}
