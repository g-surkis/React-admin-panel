import React, {Component} from 'react';


 class RowTable extends Component {
    constructor(props){
        super(props)
    }
    render(){
         console.log(this.props);
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>                
            </tr>
        )
    }
}

export default RowTable;