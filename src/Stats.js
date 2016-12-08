import React from 'react';
import { Table, Row, Col } from 'react-materialize';

class Stats extends React.Component {
    render() {
            return (
                <div className="container"> 
                    <h2>Base Stats</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Stat</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.props.stats.map((stats) => (
                                <tr key={stats.stat.name}>
                                    <td>{stats.stat.name}</td>
                                    <td>{stats.base_stat}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
            );
    }
}

export default Stats;
