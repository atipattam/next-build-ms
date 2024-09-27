'use client'

import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import {
  Combobox, ComboboxSearch, ComboboxDropdown, ComboboxOptions, ComboboxTarget, useCombobox, Button,
} from '@mantine/core'
// import '@mantine/core/styles/Combobox.css'
// import '@mantine/core/styles/Input.css'
import { JOB_DESC_URL } from '@/constants/career/constant'
import '@mantine/core/styles/Input.css'
import style from '../../styles/components/search.module.css'

export function SelectDropdownSearch(props) {
  const {
    dataList,
    isOnSelectJob = false,
    onSelectJob = () => {},
    ...other
  } = props
  const [search, setSearch] = useState('')
  const combobox = useCombobox({
    // onDropdownClose: () => {
    //   combobox.resetSelectedOption();
    //   combobox.focusTarget();
    //   // setSearch('');
    // },

    // onDropdownOpen: () => {
    //   combobox.focusSearchInput();
    // },
  })

  const [value, setValue] = useState(null)

  const options = search.length > 0 ? dataList
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option value={item} key={item} p="10px 20px" fz="md">
        {item}
      </Combobox.Option>
    )) : []

  useEffect(() => {
    if (search.length > 0) {
      combobox.openDropdown()
    } else {
      combobox.closeDropdown()
    }
  }, [search, combobox])

  return (
    <Combobox
      zIndex={999}
      floatingStrategy="fixed"
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val)
        setSearch('')
        if (isOnSelectJob) {
          onSelectJob(JOB_DESC_URL[val])
        }
        combobox.closeDropdown()
      }}
      {...other}
    >
      <ComboboxTarget h="45px">
        <ComboboxSearch
          value={value || search}
          onChange={(event) => {
            setSearch(event.currentTarget.value)
            setValue(null)
            // combobox.toggleDropdown()
          }}
          placeholder="Find your job"
          className={style['search-job']}
          styles={{
            input: {
              borderBottomLeftRadius: search ? 0 : '4px',
              borderBottomRightRadius: search ? 0 : '4px',
              fontSize: '1rem',
            },
          }}
        />
      </ComboboxTarget>
      { search ? (
        <Button
          aria-label="Close"
          pos="absolute"
          h="100%"
          right={0}
          bg="url('/assets/img/icon/close.png') no-repeat left center / 50%"
          onClick={() => setSearch('')}
        />
      ) : (
        <Button
          aria-label="Search"
          pos="absolute"
          h="100%"
          right={0}
          bg="url('/assets/img/icon/search-icon.png') no-repeat left center / 50%"
        />
      )}

      <ComboboxDropdown pos="absolute" bg="white" top={45} p={0}>
        <ComboboxOptions>
          {options.length > 0 ? options : <Combobox.Empty fz="md" p="10px 20px">No results found</Combobox.Empty>}
        </ComboboxOptions>
      </ComboboxDropdown>
    </Combobox>
  )
}

SelectDropdownSearch.propTypes = {
  dataList: propTypes.arrayOf(propTypes.string).isRequired,
  isOnSelectJob: propTypes.bool,
  onSelectJob: propTypes.func,
}

export default SelectDropdownSearch
