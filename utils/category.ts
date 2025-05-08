import { firestore } from "@/constants/firebaseConfig";
import { arrayRemove, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";


export class Categories {

  categories: Category[] = [];

  constructor(categories: Category[]) {
    this.categories = categories;
  }

  push(category: Category) {
    this.categories.push(category)
  }

}

export class Category {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static async create(category: Category) {

    const db = firestore;
    const docRef = doc(db, "categories", "meals");

    return await updateDoc(docRef, {
      fields: arrayUnion(category.name)
    })

  }

  static async delete(category: Category) {
    const db = firestore;
    const docRef = doc(db, 'categories', 'meals')

    return await updateDoc(docRef, {
      fields: arrayRemove(category.name)
    })
  }

}
