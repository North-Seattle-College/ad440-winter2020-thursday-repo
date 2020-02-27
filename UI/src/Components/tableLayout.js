import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";
import "./tableLayout.css";

const Genres = ({ values }) => {
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

function Tables() {
  const columns = useMemo(
    () => [
      {
        Header: "Key Information",
        columns: [
          {
            Header: "Key Id",
            accessor: "show.name"
          },
          {
            Header: "Key Type",
            accessor: "show.type"
          },
          {
            Header: "Checkout Date",
            accessor: "show.date",
            Cell: ({ cell: { value } }) => <Genres values={value} />
          },
          {
            Header: "Due Date",
            accessor: "show.dueDate",
            Cell: ({ cell: { value } }) => <Genres values={value} />
          }
        ]
      },
      {
        Header: "Property Details",
        columns: [
          {
            Header: "Property Address",
            accessor: "show.address"
          },

          {
            Header: "Runtime",
            accessor: "show.runtime",
            Cell: ({ cell: { value } }) => {
              const hour = Math.floor(value / 60);
              const min = Math.floor(value % 60);
              return (
                <>
                  {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
                  {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
                </>
              );
            }
          },
          {
            Header: "Key Holder",
            accessor: "show.holder"
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("https://api.2edusite.com/feature-sprint2/property");
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
