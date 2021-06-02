import { Button, Form, Input, Space } from 'antd'
import React, { useState } from 'react'

export type FilterType = {
  label: string
  key: string
}

type TableFiltersProps = {
  filters: FilterType[]
  setFilterData: React.Dispatch<React.SetStateAction<{} | undefined>>
}

export const TableFilters = ({ filters, setFilterData }: TableFiltersProps) => {
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
    setFilterData({})
  }

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={(values: any) => {
        setFilterData(values)
      }}
    >
      {filters.map((filter) => {
        return (
          <Form.Item label={filter.label} name={filter.key} key={filter.key}>
            <Input />
          </Form.Item>
        )
      })}
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" size="middle">
            Применить фильтры
          </Button>
          <Button
            htmlType="button"
            type="primary"
            onClick={onReset}
            size="middle"
            danger
          >
            Сбросить фильтры
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
