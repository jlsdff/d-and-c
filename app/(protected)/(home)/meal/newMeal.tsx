import { useMemo, useState } from "react"
import { useCategories } from '@/components/categories'
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { Dropdown } from "react-native-element-dropdown"
import colors from "@/constants/colors";
import { Link } from "expo-router"
import Modal from "react-native-modal"
import { useDisclosure, UseDisclosureReturn } from "@/hooks/useDisclosure";
import AntDesign from '@expo/vector-icons/AntDesign';
import { firestore } from "@/constants/firebaseConfig";
import { Category } from "@/utils/category";
import LoadingButton from "@/components/ui/loadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NewMealView() {

  const { categories: rawCategories, isPending } = useCategories()
  const { onToggle, isOpen, onOpen, onClose } = useDisclosure()

  const categories = useMemo(() => rawCategories?.map((category, i) => ({ id: i, label: category })), [rawCategories])
  console.log("categories: ", categories)

  return (
    <ScrollView className='py-12 bg-neutral-900 px-4'>
      <NewCategoryModal isOpen={isOpen} onToggle={onToggle} onOpen={onOpen} onClose={onClose} />
      <View>
        <Text className='text-2xl font-bold text-neutral-100'>New Meal</Text>
      </View>
      <View className="mt-8">
        <View className="w-full justify-between items-center flex-row">
          <Text className="text-xl font-bold text-neutral-100">Categories</Text>
          <Pressable onPress={() => onToggle()}>
            <View>
              <AntDesign name="plus" size={24} color={colors.neutral[100]} />
            </View>
          </Pressable>
        </View>

        <CategoriesDropdown data={categories ?? []} />
      </View>
    </ScrollView>
  )
}

interface dataCategory {
  id: number,
  label: string
}

interface CategoriesDropdownProps {
  data: dataCategory[]
}

function CategoriesDropdown({ data }: CategoriesDropdownProps) {

  const [value, setValue] = useState(null)
  const [isFocus, setFocus] = useState(false)

  return (

    <Dropdown
      data={data}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      valueField="label"
      labelField="label"
      onChange={item => {
        setValue(item)
        setFocus(false)
      }}
    />

  )
}

function NewCategoryModal({ isOpen, onToggle }: UseDisclosureReturn) {

  const [text, setText] = useState("")
  const { create } = useCategories()

  const onSubmit = () => {

    if (!text) {
      return
    }

    create(text);
    setText("")
    onToggle()

  }

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => onToggle()}
      onBackButtonPress={() => onToggle()}
      hideModalContentWhileAnimating={true}
    >
      <View className="relative bg-neutral-800 p-4 rounded-lg">

        <Text className="text-xl font-bold text-neutral-100">New Category</Text>

        <View className="mt-4">
          <TextInput
            className="border border-1 border-neutral-900 px-5 py-2.5 rounded-lg text-primary-50 placeholder:text-slate-50/50"
            onChangeText={text => setText(text)}
            value={text}
            placeholder="Enter Category Name"
          />
          <LoadingButton
            onPress={async () => {
              await onSubmit()
            }}
            content="Submit"
            className="mt-2 bg-primary-500 px-5 py-2.5 rounded-lg"
            textClassName="text-primary-900"
          />
        </View>

      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  dropdownContainer: {
  },
  modalContainer: {
    backgroundColor: colors.neutral[800],
    paddingStart: 24
  }
})

