import React, { ReactNode } from 'react'
import { Button, Col, Row, Space } from 'antd'

type StyledTitleProps = {
  title: string | any
  buttonsContents?: ReactNode[] | ReactNode | any
}

export const StyledTitle = ({ title, buttonsContents }: StyledTitleProps) => {
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
      {Array.isArray(buttonsContents) ? (
        <Space>
          {buttonsContents?.map((content: any) => {
            return (
              <Col flex="0.08" key={content.index}>
                <Button type="primary" size="large">
                  {content}
                </Button>
              </Col>
            )
          })}
        </Space>
      ) : (
        <Col flex="0.08">
          <Button type="primary" size="large">
            {buttonsContents}
          </Button>
        </Col>
      )}
    </Row>
  )
}
