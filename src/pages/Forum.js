import React, { useState,useEffect  } from 'react';
import PostCard from '../components/PostCard';
import api from '../api/Api';
import { useNavigate } from "react-router-dom";
function Forum() {
  const navigate = useNavigate();
  const [sign, SetSign] = useState('1')
  const [todayposts, SetTodayPosts] = useState([]);
  const [allposts, SetAllPosts] = useState([]);
  const getPost= async()=>{
    const list = await api.getPost()
    SetTodayPosts(list.Today)
    SetAllPosts(list.All)
  }
  useEffect(() => {
getPost()
  }, []);
  return (
    <div style={{ display: "flex", height:550}}>
    <div style={{width:150,}}>
      <ul style={{ paddingLeft: 0, marginLeft: 5 }} className="leftbar">
        <li>
          <button
            onClick={() => SetSign("1")}
            className={sign == "1" ? "BtnClick" : "BtnNormal"}
          >
            Today
          </button>
        </li>
        <li>
          <button
            onClick={() => SetSign("2")}
            className={sign == "2" ? "BtnClick" : "BtnNormal"}
          >
            All Posts
          </button>
        </li>
        <li>
        </li>
      </ul>
    </div>
    <div style={{ margin:'auto', flex:1, height:590, overflow:'auto',}}>
    <div style={{ margin:'auto', width:600,}}>
    {(sign=='1'&&todayposts.length!=0)&&
    todayposts.map((each,key)=>{
        return(
            <PostCard
            item={each}
            Allow={async ()=>{
              const list = todayposts.slice()
              list[key].Allow = true;
              SetTodayPosts(list)
              const list1 = allposts.slice()
              const index = list1.findIndex(value => value.postId === each.postId)
              list1[index].Allow = true;
              SetAllPosts(list1)
              await api.updatePost(each.postId,{Allow:true})
            }}
            Delete={async()=>{
              const shouldDelete = window.confirm('Are you sure you want to delete this post?');
              if (shouldDelete) {               
                let list = todayposts.slice()
                list.splice(key, 1);
                SetTodayPosts(list)
                const list1 = allposts.slice()
                const index = list1.findIndex(value => value.postId === each.postId)
                list1.splice(index,1)
                SetAllPosts(list1)
              await api.deletePost(each.postId)
             }
            }}
            />
        )
    })
    }
      {(sign=='1'&&todayposts.length===0)&&
        <h3 style={{textAlign:'center', margin:'auto'}}>(There are no articles posted today)</h3>
    }
    {(sign=='2'&&allposts.length!=0)&&
    allposts.map((each,key)=>{
        return(
            <PostCard
            item={each}
            Allow={async ()=>{
              const list = allposts.slice()
              list[key].Allow = true;
              SetAllPosts(list)
              const list1 = todayposts.slice()
              const index = list1.findIndex(value => value.postId === each.postId)
              list1[index].Allow = true;
              SetTodayPosts(list1)
              await api.updatePost(each.postId,{Allow:true})
            }}
            Delete={async()=>{
              const shouldDelete = window.confirm('Are you sure you want to delete this question?');
              if (shouldDelete) {               
                let list = allposts.slice()
                list.splice(key, 1);
                SetAllPosts(list)
                const list1 = todayposts.slice()
                const index = list1.findIndex(value => value.postId === each.postId)
                list1.splice(index,1)
                SetTodayPosts(list1)
                await api.deletePost(each.postId)
             }
            }}
            />
        )
    })
    }
    </div>
    </div>
   
  </div>
  )
}

export default Forum