import React, {Component} from 'react';


 class RowT extends Component {
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

export default RowT;