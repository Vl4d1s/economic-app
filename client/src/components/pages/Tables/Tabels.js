import React from "react";
import TableExampleColumnCount from "./TableExampleColumnCount/TableExampleColumnCount";
import TableExampleStructured from "./TableExampleStructured/TableExampleStructured";
import TableExamplePositiveNegative from "./TableExamplePositiveNegative/TableExamplePositiveNegative";

const Page2 = () => {
  return (
    <div>
      <TableExampleColumnCount color="red" />
      <TableExampleColumnCount color="green" />
      <TableExampleStructured />
      <TableExamplePositiveNegative />
    </div>
  );
};

export default Page2;
