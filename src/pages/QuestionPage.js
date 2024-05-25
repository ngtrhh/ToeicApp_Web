import React, { useState } from 'react';
import "../styles/Questions.css";
import { useNavigate, useLocation} from "react-router-dom";
import User from './User'
import ListenPart1 from './ListenPart1';
import ListenPart2 from './ListenPart2';
import ListenPart3 from './ListenPart3';
import ListenPart4 from './ListenPart4';
import ReadPart1 from './ReadPart1';
import ReadPart2 from './ReadPart2';
import ReadPart3 from './ReadPart3';
import WritePart1 from './WritePart1';
import WritePart2 from './WritePart2';
import WritePart3 from './WritePart3';
import SpeakPart1 from './SpeakPart1';
import SpeakPart2 from './SpeakPart2';
import SpeakPart3 from './SpeakPart3';
import SpeakPart4 from './SpeakPart4';
import SpeakPart5 from './SpeakPart5';
import api from '../api/Api'
import "../styles/Questions.css";
import NoteCard from '../components/NoteCard';


const  QuestionPage = () => {
    const location = useLocation();
    const data = location.state;
    return(
       <div style={{display: 'flex'}}>
        <div style={{width: '70%'}}>
        {(data.flag==='submit')&&<>
        <div>
        {data.sign==='ListenPart1'&&<ListenPart1 flag={'submit'} />}
            {data.sign==='ListenPart2'&&<ListenPart2 flag={'submit'}/>}
            {data.sign==='ListenPart3'&&<ListenPart3  flag={'submit'}/>}
            {data.sign==='ListenPart4'&&<ListenPart4  flag={'submit'}/>}
            {data.sign==='ReadPart1'&&<ReadPart1 flag={'submit'}/>}
            {data.sign==='ReadPart2'&&<ReadPart2 flag={'submit'}/>}
            {data.sign==='ReadPart3'&&<ReadPart3 flag={'submit'}/>}
            {data.sign==='SpeakPart1'&&<SpeakPart1 flag={'submit'}/>}
            {data.sign==='SpeakPart2'&&<SpeakPart2 flag={'submit'}/>}
            {data.sign==='SpeakPart3'&&<SpeakPart3 flag={'submit'}/>}
            {data.sign==='SpeakPart4'&&<SpeakPart4 flag={'submit'}/>}
            {data.sign==='SpeakPart5'&&<SpeakPart5 flag={'submit'}/>}
            {data.sign==='WritePart1'&&<WritePart1 flag={'submit'}/>}
            {data.sign==='WritePart2'&&<WritePart2 flag={'submit'}/>}
            {data.sign==='WritePart3'&&<WritePart3 flag={'submit'}/>}
        </div>
        </>}
        {(data.flag==='fix')&&<>
        <div>
            {data.sign==='ListenPart1'&&<ListenPart1 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('ListenPart1',data.item.Id,each)}}/>}
            {data.sign==='ListenPart2'&&<ListenPart2 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('ListenPart2',data.item.Id,each)}}/>}
            {data.sign==='ListenPart3'&&<ListenPart3 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('ListenPart3',data.item.Id,each)}}/>}
            {data.sign==='ListenPart4'&&<ListenPart4 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('ListenPart4',data.item.Id,each)}}/>}
            {data.sign==='ReadPart1'&&<ReadPart1 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('ReadPart1',data.item.Id,each)}}/>}
            {data.sign==='ReadPart2'&&<ReadPart2 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('ReadPart2',data.item.Id,each)}}/>}
            {data.sign==='ReadPart3'&&<ReadPart3 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('ReadPart3',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart1'&&<SpeakPart1 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('SpeakPart1',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart2'&&<SpeakPart2 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('SpeakPart2',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart3'&&<SpeakPart3 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('SpeakPart3',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart4'&&<SpeakPart4 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('SpeakPart4',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart5'&&<SpeakPart5 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('SpeakPart5',data.item.Id,each)}}/>}
            {data.sign==='WritePart1'&&<WritePart1 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('WritePart1',data.item.Id,each)}}/>}
            {data.sign==='WritePart2'&&<WritePart2 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('WritePart2',data.item.Id,each)}}/>}
            {data.sign==='WritePart3'&&<WritePart3 item={data.item} flag={'fix'} index={data.index} complete={async (each)=>{await api.updateQuestion('WritePart3',data.item.Id,each)}}/>}
        </div>
        </>}
        {(data.flag==='see')&&<>
        <div>
        {data.sign==='ListenPart1'&&<ListenPart1 item={data.item} index={data.index} flag={'see'} />}
            {data.sign==='ListenPart2'&&<ListenPart2 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='ListenPart3'&&<ListenPart3 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='ListenPart4'&&<ListenPart4 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='ReadPart1'&&<ReadPart1 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='ReadPart2'&&<ReadPart2 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='ReadPart3'&&<ReadPart3 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='SpeakPart1'&&<SpeakPart1 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='SpeakPart2'&&<SpeakPart2 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='SpeakPart3'&&<SpeakPart3 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='SpeakPart4'&&<SpeakPart4 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='SpeakPart5'&&<SpeakPart5 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='WritePart1'&&<WritePart1 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='WritePart2'&&<WritePart2 item={data.item} index={data.index} flag={'see'}/>}
            {data.sign==='WritePart3'&&<WritePart3 item={data.item} index={data.index} flag={'see'}/>}
        </div>
        </>}
        </div>
        <div>
        {data.sign==='ListenPart1'&&
        <NoteCard title={`${data.sign}: Photographs`} 
        content={'In this part, you will look at photographs. For each photograph you will hear four statements. You will have to choose which statement has the best description of the picture.'} 
        note={'Input must have Audio, Image and Answer. Others could be blank.'}/>
        }
        {data.sign==='ListenPart2'&&
        <NoteCard title={`${data.sign}: Question & Response`} 
        content={'In this part, you will be tested on your ability to respond to a question. It is very important that you can understand and identify wh-questions. You will listen to three possible responses. Only one of the responses is correct.'} 
        note={'Input must have Audio and Answer. Others could be blank.'}/>
        }
                {data.sign==='ListenPart3'&&
        <NoteCard title={`${data.sign}: Short Conversations`} 
        content={'In this part, you will listen to a short conversation. After the conversation, you will answer three questions about the dialogue. There will be four possible answers for each question. Typical questions include, who, what, where, when, why, and how. You may also be asked to make an inference.'} 
        note={'Input must have Audio, Questions and Answers for each. Others could be blank.'}/>
        }
        {data.sign==='ListenPart4'&&
        <NoteCard title={`${data.sign}: Short Talks`} 
        content={'In this part, you will listen to a short talk. It might be an announcement, a radio advertisement, or a telephone recording. You will listen to the talk and read a few questions about it.'} 
        note={'Input must have Audio, Questions and Answers for each. Others could be blank.'}/>
        }
        {data.sign==='ReadPart1'&&
        <NoteCard title={`${data.sign}: Incomplete Sentences`} 
        content={'In this part, you will read a sentence that has one blank spot. There will be four choices of words or phrases to choose from. You will have to choose the one that you think completes the sentence.'} 
        note={'Input must have Question and Answer. Others could be blank.'}/>
        }
        {data.sign==='ReadPart2'&&
        <NoteCard title={`${data.sign}: Text Completion`} 
        content={'In this part, you will read four passages of text, such as an article, a letter, a form and an e-mail. In each reading passage there will be three blanks to fill in. You will read four possible choices for each blank. You should read the entire passage to make sure you choose the correct choice in context.'} 
        note={'Input must have Questions and Answers for each. Others could be blank.'}/>
        }
        {data.sign==='ReadPart3'&&
        <NoteCard title={`${data.sign}: Reading Comprehension`} 
        content={'In this part, you will read passages in the form of letters, ads, memos, faxes, schedules, etc. The reading section has a number of single passages and 4 double passages. You will be asked 2-4 questions about each single passage, and 5 questions for each double passage. Sometimes you will be asked for specific details. Other times you will be asked about what the passage implies. In the paired passages you will also be asked to make connections between the two related texts. On the real test you will not have time to read every word. You need to practice scanning and reading quickly for details.'} 
        note={'Input must have Paragragh, Questions and Answers for each. Others could be blank.'}/>
        }
        {data.sign==='SpeakPart1'&&
        <NoteCard title={`${data.sign}: Read a text aloud`} 
        content={'In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud.'} 
        note={'Input must have Question. Others could be blank.'}/>
        }
        {data.sign==='SpeakPart2'&&
        <NoteCard title={`${data.sign}: Describe a picture`} 
        content={'In this part of the test, you will describe the picture on your screen in as much detail as you can. You will have 45 seconds to prepare your response. Then you will have 30 seconds to speak about the picture.'} 
        note={'Input must have Image. Others could be blank.'}/>
        }
        {data.sign==='SpeakPart3'&&
        <NoteCard title={`${data.sign}: Respond to questions`} 
        content={'In this part of the test, you will answer three questions. You will have three seconds to prepare after you hear each question. You will have 15 seconds to respond to Questions 1 and 2, and 30 seconds to respond to Question 3.'} 
        note={'Input must have Context and Questions. Others could be blank.'}/>
        }
        {data.sign==='SpeakPart4'&&
        <NoteCard title={`${data.sign}: Respond to questions using information provided`} 
        content={'In this part of the test, you will answer three questions based on the information provided. You will have 45 seconds to read the information before the questions begin. You will have three seconds to prepare and 15 seconds to respond to Questions 1 and 2. You will have three seconds to prepare and 30 seconds to respond to Question 3.'} 
        note={'Input must have Available Information and Questions. Others could be blank.'}/>
        }
        {data.sign==='SpeakPart5'&&
        <NoteCard title={`${data.sign}: Express an opinion`} 
        content={'In this part of the test, you will give your opinion about a specific topic. Be sure to say as much as you can in the time allowed. You will have 45 seconds to prepare. Then you will have 60 seconds to speak.'} 
        note={'Input must have Questions. Others could be blank.'}/>
        }
        {data.sign==='WritePart1'&&
        <NoteCard title={`${data.sign}: Write a sentence based on a picture`} 
        content={'In this part of the test, you will write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence.\n\nYou can change the forms of the words and you can use the words in any order.\n\nYour sentence will be scored on the appropriate use of grammar, and the relevance of the sentence to the picture.\n\nYou will have eight minutes to complete this part of the test.'} 
        note={'Input must have Image and Suggested Word. Others could be blank.'}/>
        }
        {data.sign==='WritePart2'&&
        <NoteCard title={`${data.sign}: Respond to a written request`} 
        content={'In this part of the test, you will show how well you can write a response to an e-mail. \n\n Your response will be scored on the quality and variety of your sentences, vocabulary, and organization. \n\n You will have 10 minutes to read and answer each e-mail.'} 
        note={'Input must have Direction and Question (Email). Others could be blank.'}/>
        }
        {data.sign==='WritePart3'&&
        <NoteCard title={`${data.sign}: Write an opinion essay`} 
        content={'In this part of the test, you will write an essay in response to a question that asks you to state, explain, and support your opinion on an issue. Typically, an effective essay will contain a minimum of 300 words. Your response will be scored on whether your opinion is supported with reasons and/or examples, grammar, vocabulary, and organization. \n\nYou will have 30 minutes to plan, write, and revise your essay.'} 
        note={'Input must have Question. Others could be blank.'}/>
        }
        </div>
       </div>
    )
}
export default QuestionPage
