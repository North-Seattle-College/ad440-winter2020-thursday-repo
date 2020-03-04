import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {default as apiurlbase} from '../apiurlbase'
//		"https://api.2edusite.com/dev/";


import Table from "./Table";
import "./tableLayout.css";

const Keys = ({ values }) => {
  return (
    <>
      {values.map((key, idx) => {
        return (
          <span key={idx} className="badge">
            {key}
          </span>
        );
      })}
    </>
  );
};


var strURLkey = apiurlbase + 'keybundle/';
var strURLproperty = apiurlbase + 'property/';

function Tables() {
  const columns = useMemo(
    () => [
      {
        Header: "Key Information",
        columns: [
          {
            Header: "Key Id",
            accessor: "show.keybundle_id"
          },
          {
            Header: "Key Type",
            accessor: "show.type"
          },
          {
            Header: "Checkout Date",
            accessor: "show.checkoutDta"
          },
          {
            Header: "Due Date",
            accessor: "show.dueBackDate"
          }
        ]
      },
      {
        Header: "Property Details",
        columns: [
          {
            Header: "Property Address",
            accessor: "show.property_address"
          },
          {
            Header: "Key Holder",
            accessor: "show.keyholder_id"
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios(strURLkey + strURLproperty);
      setData(result.data);
    })();
  }, []);

  return (
    <div className="Tables">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Tables;
