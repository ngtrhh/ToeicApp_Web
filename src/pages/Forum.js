import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PostCard from "../components/PostCard";
import api from "../api/Api";
import { Button } from "@mui/material";

function Forum() {
  const [sign, setSign] = useState("1");
  const [todayposts, setTodayPost] = useState([]);
  const [allposts, setAllPost] = useState([]);
  const getPost = async () => {
    const list = await api.getPost();
    setTodayPost(list.Today);
    setAllPost(list.All);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">Forum</div>

      <div className="d-flex flex-row justify-content-center">
        <Button
          onClick={() => setSign("1")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "1" ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          Today
        </Button>
        <Button
          onClick={() => setSign("2")}
          className={clsx(
            "shadow-none rounded-0",
            sign === "2" ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          all posts
        </Button>
      </div>

      <div>
        {sign === "1" &&
          todayposts.length !== 0 &&
          todayposts.map((item, key) => (
            <PostCard
              item={item}
              Allow={async () => {
                const list = todayposts.slice();
                list[key].Allow = true;
                setTodayPost(list);
                const list1 = allposts.slice();
                const index = list1.findIndex(
                  (value) => value.postId === item.postId
                );
                list1[index].Allow = true;
                setAllPost(list1);
                await api.updatePost(item.postId, { Allow: true });
              }}
              Delete={async () => {
                const shouldDelete = window.confirm(
                  "Are you sure you want to delete this post?"
                );
                if (shouldDelete) {
                  let list = todayposts.slice();
                  list.splice(key, 1);
                  setTodayPost(list);
                  const list1 = allposts.slice();
                  const index = list1.findIndex(
                    (value) => value.postId === item.postId
                  );
                  list1.splice(index, 1);
                  setAllPost(list1);
                  await api.deletePost(item.postId);
                }
              }}
            />
          ))}
        {sign === "1" && todayposts.length === 0 && (
          <h3 className="text-center">
            {"(There are no articles posted today)"}
          </h3>
        )}
        {sign === "2" &&
          allposts.length !== 0 &&
          allposts.map((item, key) => {
            return (
              <PostCard
                item={item}
                Allow={async () => {
                  const list = allposts.slice();
                  list[key].Allow = true;
                  setAllPost(list);
                  const list1 = todayposts.slice();
                  const index = list1.findIndex(
                    (value) => value.postId === item.postId
                  );
                  list1[index].Allow = true;
                  setTodayPost(list1);
                  await api.updatePost(item.postId, { Allow: true });
                }}
                Delete={async () => {
                  const shouldDelete = window.confirm(
                    "Are you sure you want to delete this question?"
                  );
                  if (shouldDelete) {
                    let list = allposts.slice();
                    list.splice(key, 1);
                    setAllPost(list);
                    const list1 = todayposts.slice();
                    const index = list1.findIndex(
                      (value) => value.postId === item.postId
                    );
                    list1.splice(index, 1);
                    setTodayPost(list1);
                    await api.deletePost(item.postId);
                  }
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Forum;
