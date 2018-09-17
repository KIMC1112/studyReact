import React, { Component } from 'react';
import { Checkbox, Radio, Avatar, Table } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reqwest from 'reqwest';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class App extends Component {
    state = {
        data: [],
        loading: false,
        lang: 0
    };
    fetch = () => {
        this.setState({loading:true});
        reqwest({
            url: '/worldcup_2018.json',
            method: 'get',
            type: 'json',
        }).then((data) => {
            this.setState({
                loading: false,
                data: data.results,
            });
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        const columns = [{
            title: '赛事',
            dataIndex: 'league',
            render: league => <span>{league[this.state.lang]}</span>,
        }, {
            title: '时间',
            dataIndex: 'matchDate',
        }, {
            title: '主队',
            dataIndex: 'home[0]',
            key: 'home',
        }, {
            title: '全场比分',
            dataIndex: 'score',
            render: (value, record) => <span>{record.homeScore} - {record.guestScore}</span>,
        }, {
            title: '客队',
            dataIndex: 'guest[0]',
        }, {
            title: '半场比分',
            dataIndex: 'halfScore',
            render: (value, record) => <span>{record.homeHalfScore} - {record.guestHalfScore}</span>,
        }];
        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="/">Navbar</a>
                        <span>
                            <div>
                              <Avatar icon="user" />
                            </div>
                        </span>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Checkbox >显示黄牌</Checkbox>
                    <Checkbox >显示红牌</Checkbox>

                    <RadioGroup defaultValue={0}>
                        <RadioButton value={0}>简体中文</RadioButton>
                        <RadioButton value={1}>繁体中文</RadioButton>
                        <RadioButton value={2}>English</RadioButton>
                    </RadioGroup>



                    <Table
                        className="mt-3"
                        dataSource={this.state.data}
                        columns={columns}
                        pagination={false}
                        loading={this.state.loading}
                        rowKey={record => record.matchId}
                    />
                </div>
            </div>
        );
    }
}

export default App;