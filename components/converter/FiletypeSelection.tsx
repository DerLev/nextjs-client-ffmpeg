import { Select, SelectItem } from '@mantine/core'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HiOutlineChevronDoubleRight } from 'react-icons/hi2'

interface FiletypeSeelctionProps {
  select: {
    value: string | null
    setValue: Dispatch<SetStateAction<string | null>>
    typeSelected: "video" | "audio"
    disabled: boolean
  }
}

const audioFiles: SelectItem[] = [
  { value: 'mp3', label: 'MP3', group: 'Audio files' },
  { value: 'wav', label: 'WAV', group: 'Audio files' },
  { value: 'ogg', label: 'OGG', group: 'Audio files' },
  { value: 'm4a', label: 'M4A', group: 'Audio files' },
  { value: 'flac', label: 'FLAC', group: 'Audio files' },
  { value: 'aac', label: 'AAC', group: 'Audio files' },
  { value: 'opus', label: 'OPUS', group: 'Audio files' }
]

const videoFiles: SelectItem[] = [
  { value: 'avi', label: 'AVI', group: 'Video files' },
  { value: 'mov', label: 'MOV', group: 'Video files' },
  { value: 'webm', label: 'WEBM', group: 'Video files' },
  { value: 'flv', label: 'FLV', group: 'Video files' },
  { value: 'm4v', label: 'M4V', group: 'Video files' },
  { value: 'mkv', label: 'MKV', group: 'Video files' },
  { value: 'mp4', label: 'MP4', group: 'Video files' },
]

const FiletypeSelection = ({ select }: FiletypeSeelctionProps) => {
  const [items, setItems] = useState<SelectItem[]>([])

  useEffect(() => {
    let newArr: SelectItem[] = []
    newArr = [ ...newArr, ...audioFiles ]
    if(select.typeSelected === 'video') newArr = [ ...newArr, ...videoFiles ]
    setItems(newArr)
  }, [select.typeSelected])
  

  return (
    <Select
      value={select.value}
      onChange={select.setValue}
      label={'Convert to filetype'}
      placeholder={'Pick one'}
      data={items}
      searchable
      nothingFound='Filetype not in list'
      icon={<HiOutlineChevronDoubleRight />}
      disabled={select.disabled}
    />
  )
}

export default FiletypeSelection
