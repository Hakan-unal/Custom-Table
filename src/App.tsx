
import { useEffect, useState } from 'react';
import { Select, Table, Row, Col, Button } from "antd"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLocalStorage } from './hooks/useLocalStorage';
import tableColumsFile from "./staticData/tableColumsFile.json"
import tableColumsData from "./staticData/tableColumnsData.json"
//  coming soon...

//  sorting
//  search
//  filter
//  dynamic content

//  only god knows.....





const App = () => {
  const [loading, setLoading] = useState(true)
  const [localStorageTableColumns, setLocalStorageTableColumns] = useLocalStorage("table", []);
  const [tableColumns, setTableColumns] = useState([])
  const [data, setData] = useState([])

  const [isShowTableSorter, setIsShowTableSorter] = useState(true)





  const handleChange = (value: any) => {
    const tempArr: any = []
    value.map((index: any) => tempArr.push(tableColumsFile[index]))

    setTableColumns(tempArr)
    setLocalStorageTableColumns(tempArr)
  };

  const handleGetData = () => {

    setData(tableColumsData)
  }



  useEffect(() => {
    setTableColumns(localStorageTableColumns)

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading)
      handleGetData()
    }, 5000)
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
          options={tableColumsFile}
          value={tableColumns}
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


export default App;
