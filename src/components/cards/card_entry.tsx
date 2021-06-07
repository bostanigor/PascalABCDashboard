import React, { FC } from 'react'
import { Card, Col, Row, Typography } from 'antd'

type CardEntryProps = {
  title: string
}

export const CardEntry: FC<CardEntryProps> = ({ title, children }) => {
  return (
    <Row style={{ marginBottom: '5px' }}>
      <Col flex="1">
        <div style={{ fontSize: 'large', color: '#757575' }}>{title}</div>
      </Col>
      <Col flex="0.1" />
      <Col flex="4">
        <div style={{ fontSize: 'large' }}>{children}</div>
      </Col>
    </Row>
  )
}
