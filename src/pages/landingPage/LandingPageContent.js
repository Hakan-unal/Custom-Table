import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setInlineRedux } from "../../redux/promodex/actions";
import { Select, Table, Row, Col, Button } from "antd"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

//  coming soon...

//  localstorage 
//  sorting
//  search
//  filter
//  dynamic content
//  dynamic columns

//  only god knows.....

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];



const LandingPageContent = (props) => {
  const [loading, setLoading] = useState(true)
  const [staticTableColumns, setStaticTableColumns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      label: 'name',
      key: 'name',
      value: 0,
      width: '30%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      value: 1,
      label: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      value: 2,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
      label: 'address',
    },
  ])
  const [tableColumns, setTableColumns] = useState([])
  const [isShowTableSorter, setIsShowTableSorter] = useState(true)




  const handleChange = (value) => {
    const tempArr = []
    console.log(value)
    value.map((index) => tempArr.push(staticTableColumns[index]))

    console.log(tempArr)
    setTableColumns(tempArr)
  };





  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading)
    }, 50)
  }, [])


  return (<Row style={{ marginTop: 100 }}>
    <Col sm={{ span: 14, offset: 4 }}>
      {isShowTableSorter &&
        <Select
          placeholder="select table columns"
          mode="tags"
          style={{
            width: '100%',
          }}
          onChange={handleChange}
          tokenSeparators={[',']}
          options={staticTableColumns}
        />
      }
    </Col>
    <Col sm={{ span: 2, offset: 0 }}>
      <Button onClick={() => setIsShowTableSorter(!isShowTableSorter)} block type="dashed" shape="round" icon={isShowTableSorter ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />} size={"large"} />
    </Col>
    <Col sm={{ span: 16, offset: 4 }}>
      <Table loading={loading} columns={tableColumns} dataSource={data} />
    </Col>
  </Row>)
}

const mapState = (globalState) => {
  return { inlineInformation: globalState.inlineInformation };
};
export default connect(mapState, { setInlineRedux })(withRouter(LandingPageContent));
