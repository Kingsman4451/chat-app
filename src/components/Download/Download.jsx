import React, { useContext } from "react";
import context from "../../context";
import filePng from '../../assets/images/file.png'

const Download = () => {
  const { values } = useContext(context.context);
  const { data, setFileName, setClick, click } = values;
  return (
    <div>
      <h2 className="title ps-3 mb-2">Downloads</h2>
      <ul className="download-list p-0 ps-3">
        {data.map((item) => {
          return (
            <li className="download-list-item" key={item.dataId}>
              <a
                href={`https://chat-a--app.herokuapp.com/download/${item.downloadLink}`}
                onClick={() => {
                  setClick(click + 1), setFileName(item.downloadLink);
                }}
              >
                <img src={filePng} width="20"/> {item.downloadLink}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Download;
