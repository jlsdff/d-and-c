import React, { createContext, PropsWithChildren, useContext, useState } from "react"
import { firestore } from "@/constants/firebaseConfig";
import { getDoc, doc, collection } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/utils/category";
import { toast } from "sonner-native"

export interface CategoriesType {
  categories: string[] | undefined;
  current: string | null;
  setCurrent: (current: string) => void;
  isPending: boolean;
  isError: boolean;
  create: (name: string) => void;
}

export const CategoriesContext = createContext<CategoriesType>({
  categories: [],
  current: null,
  setCurrent: (current: string) => { },
  isPending: true,
  isError: false,
  create: (name: string) => { }
})

const fetchCategories = async () => {
  return await getDoc(doc(collection(firestore, "categories"), "meals"))
}

export default function CategoriesProvider({ children }: PropsWithChildren) {

  const [current, setCurrent] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {

      const data = await fetchCategories()
        .then(res => {
          const fields: string[] = res.data()?.fields
          if (fields.length > 0) {
            setCurrent(fields[0])
          }
          return fields;
        })
      return data

    }
  })

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      return await Category.create(new Category(name))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast("Category Created")
    }
  })

  const selectCurrent = (value: string) => {
    if (isPending) {
      return
    }
    if (data?.includes(value)) {
      setCurrent(value)
    }
  }

  console.log("DATA: ", data)

  const values: CategoriesType = {
    categories: data,
    current,
    setCurrent: selectCurrent,
    isPending,
    isError,
    create: (name) => {
      return mutation.mutate(name)
    }
  }

  return (
    <CategoriesContext.Provider value={values}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const ctx = useContext(CategoriesContext)
  return ctx;
}
