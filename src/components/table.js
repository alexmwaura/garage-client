import React, { Component } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


class editable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          keys(id) {
            this.props.customers.map((customer) => {
              id = customer.customerId;
            });
          },
        },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        {
          title: "vehicles",
          field: "vehicleCount",
          type: "numeric",
          editable: "never",
        },
      ],
      data: this.props.customers,
    };
  }
  newData;

  render() {
    console.log(this.state.columns.keys);
    const options = {
      showTitle: false,
      actionsColumnIndex: -1,
      // searchFieldStyle: {
      //     color: "#fff"
      // }
    };
    console.log(this.props.customer);
    return (
      // <table class="table">
      //   <thead class=" text-primary">
      //     <th>Name</th>
      //     <th class="text-right">Email</th>
      //     <th class="text-right">Phone</th>
      //   </thead>
      //   <tbody></tbody>
      // </table>
      <Paper className="container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Phone</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Vehicles </TableCell>
            <TableCell >Attendant</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.data.map(({ customerId, name, phone, email, vehicleCount, attendant }) => (
            <TableRow key={customerId}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              {/* <TableCell numeric>{name}</TableCell> */}
              <TableCell >{phone}</TableCell>
              <TableCell >{email}</TableCell>
              <TableCell >{vehicleCount}</TableCell>
              <TableCell >{attendant}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
      // <MaterialTable
      //   title="test me"
      //   columns={this.state.columns}
      //   data={this.state.data}
      //   options={options}
      //   components={{
      //     Toolbar: props => (
      //         <div style={{ backgroundColor: 'transparent' }}>
      //             <MTableToolbar {...props} />
      //         </div>
      //     )
      // }}
      //   editable={{

      //     onRowAdd: newData =>
      //       new Promise((resolve, reject) => {
      //         setTimeout(() => {
      //           {
      //             const data = this.state.data;
      //             data.push(newData);
      //             this.setState({ data }, () => resolve());

      //           }
      //           resolve()
      //         }, 1000)
      //       }),
      //   //   onRowUpdate: (newData, oldData) =>
      //   //     new Promise((resolve, reject) => {
      //   //       setTimeout(() => {
      //   //         {
      //   //           const data = this.state.data;
      //   //           const index = data.indexOf(oldData);
      //   //           data[index] = newData;
      //   //           this.setState({ data }, () => resolve());
      //   //         }
      //   //         resolve()
      //   //       }, 1000)
      //   //     }),
      //   //   onRowDelete: oldData =>
      //   //     new Promise((resolve, reject) => {
      //   //       setTimeout(() => {
      //   //         {
      //   //           let data = this.state.data;
      //   //           const index = data.indexOf(oldData);
      //   //           data.splice(index, 1);
      //   //           this.setState({ data }, () => resolve());
      //   //         }
      //   //         resolve()
      //   //       }, 1000)
      //   //     }),
      //   }}
      // />
    );
  }
}

export default editable;


