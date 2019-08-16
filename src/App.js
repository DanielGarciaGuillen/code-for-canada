import React, { Component} from 'react';
import papa from 'papaparse'
import MUIDataTable from 'mui-datatables';
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    data: null,
    loading: true,
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const dataFilePath = require("./codeForCanada.csv");
   papa.parse(dataFilePath, {
    download: true,
    header: true,
    delimiter: ",",
    complete: this.updateData
    })
  }
   
     updateData(result) {
    const data = result.data;
    this.setState({loading: false, data })
   }

   getColumns = () => ([
    {
      name: 'Violation Id',
      options: {
        filter: false,
      },
    },
    {
      name: 'Inspection Id',
      options: {
        filter: false,
      },
    },
    {
      name: 'Violation Category',
      options: {
      },
    },
    {
      name: 'Violation Date',
      options: {
      },
    },
    {
      name: 'Violation Date Closed',
      options: {
      },
    },
    {
      name: 'Violation Type',
      options: {
      },
    },
  ]);

  getTableData = () => this.state.data.map(element => ([
    element.violation_id,
    element.inspection_id,
    element.violation_category,
    element.violation_date,
    element.violation_date_closed,
    element.violation_type   
  ]));



  render(){ 
    const { data, loading } = this.state;
    console.log(data, loading)


  
    return (
      <div class="App">
        {loading && null}
        {!loading && (<MUIDataTable
        title="Code For Canada (Use filters and sorting to get any info you need!)"
        data={this.getTableData()}
        columns={this.getColumns()}
      /> )}
      </div>

    
    
    );
  }
}

export default App;
