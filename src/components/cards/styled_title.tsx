import React, { ReactNode } from 'react'
import { Button, Col, Row } from 'antd'

type StyledTitleProps = {
  title: string | any
  createButtonContent?: ReactNode | any
}

export const StyledTitle = ({
  title,
  createButtonContent,
}: StyledTitleProps) => {
  return (
    <Row style={{ width: '100%' }}>
      <Col
        flex="1"
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 15,
        }}
      >
        <div style={{ fontSize: 'xx-large', color: '#757575' }}>{title}</div>{' '}
      </Col>
      <Col flex="0.08">
        <Button type="primary" size="large">
          {createButtonContent}
        </Button>
      </Col>
    </Row>
  )
}
