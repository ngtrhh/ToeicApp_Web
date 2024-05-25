import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
import upload from '../api/upload';
import NotificationModal from '../components/NotificationModal';

function ListenPart2({flag, index, complete, item}) {
  const [audioFile, setAudioFile] = useState(item?.Audio||null);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile1, setAudioFile1] = useState(null);
  const [question, setQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(item?.Answer?.findIndex(function(item1) {
    return item1.status === true;
  })||(item&&item.Answer)?0:null);
  const [script, setScript] = useState(item?.Explain?.script||'');
  const [tip, setTip] = useState(item?.Explain?.tip||'');
  const [translation, setTranslation] = useState(item?.Explain?.translate||'');
  const [textR1, setTextR1] = useState((item&&item.Answer)?item.Answer[0]?.script:'');
  const [textR2, setTextR2] = useState((item&&item.Answer)?item.Answer[1]?.script:'');
  const [textR3, setTextR3] = useState((item&&item.Answer)?item.Answer[2]?.script:'');
  const [errors, setErrors] = useState('');
  const [showNoti, setShowNoti] = useState(false)

  const handleAudioChange = (e) => {
    const selectedAudio = e.target.files[0];
  
    if (selectedAudio) {
      setAudioFile1(selectedAudio);
    } else {
      setAudioFile1(null);
    }
  };


  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
  };

  function isAudioUrl(url) {
    try{
      new URL(url);
      const audioUrlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|wav)$/i;
      return audioUrlRegex.test(url.toLowerCase());
    } catch(error){
      return false;
    }
  }


  const validateData = () => {
    let errorFields = [];
    let audioError = '';
    let inputError = '';
    if(audioFile==null || audioFile=="" && audioFile1==null){
      errorFields.push("Audio File");
    }
    if(selectedAnswer==null || selectedAnswer==-1 || textR1=="" || textR2=="" || textR3==""){
      errorFields.push("Answer");
    }
    const isAudioValid = audioFile1!=null || isAudioUrl(audioFile);
    if(audioFile!=null && audioFile!="" && !isAudioValid) audioError = "\nThe audio url link is not valid!"
    if(errorFields.length > 0) inputError = "Please input complete information: " + errorFields.join(", ") + ". ";
    if(errorFields.length > 0|| !isAudioValid){
      setErrors(inputError + audioError);
      return false;
    }
    else return true;
  }

  const handleSubmit = async () => {
    if(!validateData()) return;
    let answerL = [];
    let text = [textR1, textR2, textR3]
    for(let i = 0; i < 3; i++){
      if(i == selectedAnswer){
        answerL.push({
            status:true,
            script:text[i]
        });
      }
      else  answerL.push({
            status:false,
            script:text[i]
        });
    }
let audio = audioFile
    if(audioFile1!=null){
      try{
        const formData = new FormData();
        formData.append('audio', audioFile1); 
        const response = await axios.post(upload.upAudio, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        audio = response.data.audio
        console.log(audio)
      }
      catch(e)
      {
      }  
  }
    if(flag==='submit'){
      let data = {
        Audio: audio,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order:await api.countQuestion('ListenPart2')
      }
      await api.addQuestion('ListenPart2', data);
      setAudioFile('');
      setAudioFile1(null);
      setSelectedAnswer(null);
      setTextR1('');
      setTextR2('');
      setTextR3('');
      setTip('');
      setTranslation('');
      setScript('');
      setErrors('');
      setShowNoti(true);

    }
    else if(flag==='fix') {
      let data = {
        Audio: audio,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
      }
      setErrors('');
      setShowNoti(true);
      complete(data)
    }
    else if(flag==='Test'){
      let data = {
        Audio: audio,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
      }
      setErrors('');
      setShowNoti(true);
      complete(data)
    }
   

    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);
    
  
  };

  return (
    <div className='addQuestion'>
      {(flag=='submit')?<h2>Add Question Listening Part 2</h2>:<h2>Question {index+1} </h2>}
     {(flag==='see')&&
     <>
      <div className='fileContainer'>
      <label>
          Audio:
          <input className="customInput" type="file" accept="audio/*" onChange={handleAudioChange} />
          <text style={{font:12}}>or input the link:</text>
          <input className="customInput" type='url' onChange={(e) => setAudioFile(e.target.value)} value={item.Audio}/>
        </label>
      </div>


      <label>Answer:</label>
      <div style={{marginTop:10, marginBottom:10, display:'grid'}}>
        <div style={{display:'inline-flex', marginLeft:5, marginBottom: 10}}>
          <button className="btn rounded-circle" style={{backgroundColor: selectedAnswer === 0 && '#5DA110', marginRight: 10, border: '1px solid black', height: 40}} onClick={() => {handleAnswerChange(0)}}>A</button>
          <input className="customInput" type='text'  value={item.Answer[0].script} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginBottom: 10}}>
          <button className="btn rounded-circle" style={{backgroundColor: selectedAnswer === 1 && '#5DA110', marginRight: 10, border: '1px solid black', height: 40}} onClick={() => {handleAnswerChange(1)}}>B</button>
          <input className="customInput" type='text'  value={item.Answer[1].script} id='TR'></input>
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginBottom: 10}}>
          <button className="btn rounded-circle" style={{backgroundColor: selectedAnswer === 2 && '#5DA110', marginRight: 10, border: '1px solid black', height: 40}} onClick={() => {handleAnswerChange(2)}}>C</button>
          <input className="customInput" type='text' value={item.Answer[2].script} id='TR'></input> 
        </div>
      </div>

      <div className='flex-column'>
      <div>
        Script:
        <label style={{display: 'flex'}}>
          <textarea className="customInput" value={item.Explain.script} onChange={(e) => setScript(e.target.value)} rows="4" />
        </label>
      </div>
      <div>
        Tip:  
        <label style={{display: 'flex'}}>
          <textarea className="customInput" value={item.Explain.tip} onChange={(e) => setTip(e.target.value)} rows="4" />
        </label>
      </div>
      <div>
        Translation:
        <label style={{display: 'flex'}}>
          <textarea className="customInput" value={item.Explain.translate} onChange={(e) => setTranslation(e.target.value)} rows="4" />
        </label>
      </div>
     </div>
     </>
     }
      {(flag!=='see')&&
     <>
      <div className='fileContainer'>
      <label>
          Audio:
          <input className="customInput" type="file" accept="audio/*" onChange={handleAudioChange} />
          <text style={{font:12}}>or input the link:</text>
          <input className="customInput" type='url' onChange={(e) => setAudioFile(e.target.value)} value={audioFile}/>
        </label>
      </div>

      <label>Answer:</label>
      <div style={{marginTop:10, marginBottom:10, display:'grid'}}>      
        <div style={{display:'inline-flex', marginLeft:5, marginBottom: 10}}>
          <button className="btn rounded-circle" style={{backgroundColor: selectedAnswer === 0 && '#5DA110', marginRight: 10, border: '1px solid black', height: 40}} onClick={() => {handleAnswerChange(0)}}>A</button>
          <input className="customInput" type='text' onChange={(e) => setTextR1(e.target.value)} value={textR1} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginBottom: 10}}>
          <button className="btn rounded-circle" style={{backgroundColor: selectedAnswer === 1 && '#5DA110', marginRight: 10, border: '1px solid black', height: 40}} onClick={() => {handleAnswerChange(1)}}>B</button>
          <input className="customInput" type='text' onChange={(e) => setTextR2(e.target.value)} value={textR2} id='TR'></input>
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginBottom: 10}}>
          <button className="btn rounded-circle" style={{backgroundColor: selectedAnswer === 2 && '#5DA110', marginRight: 10, border: '1px solid black', height: 40}} onClick={() => {handleAnswerChange(2)}}>C</button>
          <input className="customInput" type='text' onChange={(e) => setTextR3(e.target.value)} value={textR3} id='TR'></input> 
        </div>
      </div>
      
      <div className='flex-column'>
      <div>
        Script:
        <label style={{display: 'flex'}}>
          <textarea className="customInput" value={script} onChange={(e) => setScript(e.target.value)} rows="4" />
        </label>
      </div>
      <div>
        Tip:  
        <label style={{display: 'flex'}}>
          <textarea className="customInput" value={tip} onChange={(e) => setTip(e.target.value)} rows="4" />
        </label>
      </div>
      <div>
        Translation:
        <label style={{display: 'flex'}}>
          <textarea className="customInput" value={translation} onChange={(e) => setTranslation(e.target.value)} rows="4" />
        </label>
      </div>
     </div>
     </>
     }
  
  {errors && <div className="error">{errors}</div>}

    {(flag==='Test')&&<button type="button" className="btn btn-light" style={{backgroundColor: '#F88C19', color: '#fff'}} onClick={handleSubmit}>Add</button>}
    {(flag==='submit')&&<button type="button" className="btn btn-light" style={{backgroundColor: '#F88C19', color: '#fff'}} onClick={handleSubmit}>Submit</button>}
    {(flag==='fix')&&<button type="button" className="btn btn-light" style={{backgroundColor: '#F88C19', color: '#fff'}} onClick={handleSubmit}>Update</button>}

    {(flag==='submit')&&<NotificationModal
        show={showNoti}
        onHide={() => setShowNoti(false)}
        title="Success!"
        message="Question added sucessfully!"
    />
    }
    {(flag==='fix')&&<NotificationModal
          show={showNoti}
          onHide={() => setShowNoti(false)}
          title="Success!"
          message="Question updated sucessfully!"
    />
    }
    </div>
  );
}

export default ListenPart2