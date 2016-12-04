import React from 'react';
import './Stats.css';

class Stats extends React.Component {
    render() {
            return (
                <div> 
                    <h2>Stats</h2>
                    <table>
                        <tbody>
                            {
                            this.props.stats.reverse().map((stats) => (
                                <tr key={stats.stat.name}>
                                    <td>{stats.stat.name}</td>
                                    <td className="right">{stats.base_stat}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            );
    }
}

export default Stats;
