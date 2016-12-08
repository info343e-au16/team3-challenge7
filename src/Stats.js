import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Stats extends React.Component {
    render() {
            return (
                <div className="container"> 
                    <h2>Base Stats</h2>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Type</TableHeaderColumn>
                                <TableHeaderColumn>Value</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                            this.props.stats.map((stats) => (
                                <TableRow key={stats.stat.name}>
                                    <TableRowColumn>{stats.stat.name}</TableRowColumn>
                                    <TableRowColumn>{stats.base_stat}</TableRowColumn>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </div>
            );
    }
}

export default Stats;
