import { Button, Col, Row, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { StyledTitle } from './styled_title'

type CardHeaderProps = {
  title: string | JSX.Element
  editPath?: string
  onDeleteClick?: () => void
}
export const CardHeader = ({
  title,
  editPath,
  onDeleteClick,
}: CardHeaderProps) => {
  return (
    <>
      <Row justify="space-around" align="middle">
        <Col flex="1 1 auto">
          <StyledTitle title={title} />
        </Col>
        <Col flex="0 1 auto">
          <Space size="middle">
            {editPath && (
              <Button type="primary" size="large">
                <Link
                  to={{
                    pathname: editPath,
                  }}
                >
                  Изменить
                </Link>
              </Button>
            )}
            {onDeleteClick && (
              <Button
                type="primary"
                size="large"
                danger
                onClick={onDeleteClick}
              >
                Удалить
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </>
  )
}
