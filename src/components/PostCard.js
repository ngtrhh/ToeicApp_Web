import React from "react";
import ReactPlayer from "react-player";

const PostCard = ({ item, Allow, Delete }) => {
  return (
    <div
      className="question-item"
      style={{
        width: 600,
        flexDirection: "column",
        margin: "auto",
        boxShadow: " 0 0 10px rgba(0, 0, 0, 0.3)",
        marginTop: 20,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          height: 60,
          alignItems: "center",
          borderColor: "gray",
          borderBottomWidth: 1,
          marginLeft: 20,
          marginTop: 10,
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            width: 50,
            height: 50,
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          {item?.userImg && item?.userImg != null && (
            <img
              src={item.userImg}
              alt="User's Image"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          )}
        </div>
        <div style={{ marginLeft: 20, marginTop: 5 }}>
          <span style={{ fontSize: "14", fontWeight: "bold" }}>
            {item?.userName}
          </span>
          <br />
          <span>{item?.postTime}</span>
        </div>
        <div style={{ flex: 1 }} />
        {item?.Allow == false && (
          <button
            style={{ marginRight: 5, borderRadius: 5 }}
            onClick={() => {
              Allow();
            }}
          >
            Allow
          </button>
        )}
        <button
          style={{
            marginRight: 5,
            borderRadius: 5,
            backgroundColor: "#F88C19",
          }}
          onClick={() => {
            Delete();
          }}
        >
          Delete
        </button>
      </div>
      <div style={{ marginLeft: 20, marginTop: 15 }}>
        <h3>{item?.topic}</h3>
        <p>{item?.text}</p>
      </div>
      {item?.postImg !== null && (
        <div
          style={{ height: 300, width: 400, margin: "auto", overflow: "auto" }}
        >
          {item?.postImg?.map((each, key) => {
            if (each.type === "img") {
              return (
                <img
                  src={each.uri}
                  alt="Topic'sImg"
                  style={{ width: 380, height: 295, marginBottom: 10 }}
                />
              );
            } else if (each.type === "video") {
              return (
                <ReactPlayer
                  url={each.uri}
                  controls={true}
                  width="390"
                  height="295"
                />
              );
            } else if (each.type === "pdf") {
              return (
                <div style={{ width: 390, height: 295 }}>
                  <img
                    src={"https://fullforms.com/images/image/PDF_227.png"}
                    alt="Topic'sImg"
                    style={{ width: 390, height: 225 }}
                  />
                  <a
                    href={each.uri}
                    target="_blank"
                    style={{ textAlign: "center" }}
                  >
                    <h4>{each.name}</h4>
                  </a>
                </div>
              );
            } else if (each.type === "question") {
              return (
                <div
                  style={{ width: 350, height: 255, backgroundColor: "white" }}
                >
                  {each.part === "S4" && (
                    <div
                      style={{
                        width: 300,
                        height: 100,
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <h4>__Speaking skill__</h4>
                      <h4>
                        Part 4:Respond to questions using information provided
                      </h4>
                      <h4>Question: {each.item.Order}</h4>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
export default PostCard;
