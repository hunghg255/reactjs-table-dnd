import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';

import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  arrayMove,
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
  SortEnd,
} from 'reactjs-table-dnd';
import GitHubCorners from '@uiw/react-github-corners';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  index: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: 'Sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));

const App = () => {
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      index: 1,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      index: 2,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      index: 3,
    },
  ]);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove(data, oldIndex, newIndex);

      setData(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass='row-dragging'
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow: React.FC<any> = ({ ...restProps }) => {
    const index = data?.findIndex((x) => `${x.index}` === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <main>
      <Table
        columns={columns}
        dataSource={data}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />

      <GitHubCorners position='right' href='https://github.com/hunghg255/reactjs-table-dnd' />
    </main>
  );
};

export default App;
