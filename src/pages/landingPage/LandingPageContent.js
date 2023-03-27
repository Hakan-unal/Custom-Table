import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setInlineRedux } from "../../redux/promodex/actions";
import { Card, Row, Col, Button, Space, Image, Input, Table } from "antd"
import { useLocalStorage } from "./useLocalStorage"
import { AiFillGithub } from "react-icons/ai";
import { SearchOutlined } from '@ant-design/icons';



const LandingPageContent = (props) => {
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState([])
  const [searchValue, setSearchValue] = useState("pokemon")
  const [hookTestData, setHookTestData] = useLocalStorage("movies", [])


  const apikey = "3c67b397"



  const handleGetData = () => {
    fetch(" http://www.omdbapi.com/?s=pokemon&apikey=" + apikey)
      .then(response => response.json())
      .then(data => {
        const tempArr = data.Search.map((movie, index) => {
          return {
            name: movie.Title,
            year: movie.Year,
            key: movie.imdbID,
            image: movie.Poster
          }
        })
        props.setInlineRedux({ data: tempArr })
        setHookTestData(tempArr)
        setTableData(tempArr)
        setLoading(false)
      });
  }

  const handleUniqueSearch = () => {
    setLoading(true)

    fetch(" http://www.omdbapi.com/?s=" + searchValue + "&apikey=" + apikey)
      .then(response => response.json())
      .then(data => {
        const tempArr = data.Search.map((movie, index) => {
          return {
            name: movie.Title,
            year: movie.Year,
            key: movie.imdbID,
            image: movie.Poster
          }
        })
        props.setInlineRedux({ data: tempArr })
        setHookTestData(tempArr)
        setTableData(tempArr)
        setSearchValue("")
        setLoading(false)

      });
  }

  useEffect(() => {

    handleGetData()
  }, [])




  const columns = [
    {
      title: 'Poster',
      dataIndex: 'image',
      key: 'image',
      render: image => <Image width={100} src={image} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },

  ];


  return (
    <>
      <Row style={{ marginBottom: 50, marginTop: 50 }}>
        <Col sm={8}>
          <Input onChange={(event) => setSearchValue(event.target.value)} value={searchValue} size='large'></Input>
        </Col>
        <Col sm={{ span: 4, offset: 4 }}>
          <Button onClick={() => handleUniqueSearch()} block size='large' icon={<SearchOutlined />} shape="round">Search</Button>
        </Col>
        <Col sm={{ span: 4, offset: 4 }}>
          <Button onClick={() => window.open("https://github.com/Hakan-unal/invent-demo")} icon={<AiFillGithub size={20} />} shape="round" block size='large' >Source Code</Button>
        </Col>
      </Row>
      <Table loading={loading} dataSource={tableData} columns={columns} />;

    </>
  );
}

const mapState = (globalState) => {
  return { inlineInformation: globalState.inlineInformation };
};
export default connect(mapState, { setInlineRedux })(withRouter(LandingPageContent));
