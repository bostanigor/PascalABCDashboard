import React from 'react'
import { Card } from 'antd'
import { CardEntry, CardHeader } from 'components/cards'
import { useFetch, getGroup, deleteGroup, getStudents } from 'api'
import { Redirect, useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { DataTable } from 'components/tables'
import { columns as student_columns } from 'pages/students/students_page'
import { useStore } from 'store'

export const GroupPage = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getGroup, [id])
  const { userData } = useStore('userData')
  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  const onDeleteClick = () => {
    deleteGroup(id)
      .then(() => history.push(paths.groupsPath))
      .catch(() => {})
  }
  return (
    <div className="site-card-border-less-wrapper">
      {data?.data && (
        <Card
          title={
            <CardHeader
              title={`Группа ${data.data.name}`}
              editPath={paths.groupEditPath(id.toString())}
              onDeleteClick={onDeleteClick}
            />
          }
          style={{ height: '100vt', marginLeft: '10' }}
          headStyle={{ fontWeight: 'bold' }}
        >
          <CardEntry title="Название" key={1}>
            {data.data.name}
          </CardEntry>
          <DataTable
            columns={student_columns}
            getMethod={getStudents}
            getParams={{ group_id: data.data.id }}
          />
        </Card>
      )}
    </div>
  )
}
