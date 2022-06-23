import './App.css';
import {useState} from 'react';
import List_Items from './components/List_Items';

function App() {

  const [inputText,setInputText] = useState("");
  const [listItems,setListItems] = useState([]);

  const InputEvent = (event)=>{

    setInputText(event.target.value);
  
  };

  const Addlist = ()=>{

    if (inputText.length > 4 ) {
      setListItems((oldItems) => {

      return [...oldItems, inputText]

      });

    setInputText("");

    }

  };

  const DeList = (ids)=>{

    setListItems((oldItems) =>{

        return oldItems.filter((arrElem,index)=>{

        return index !== ids;

        });

    });

  };

  return (
    <div >
      <div className="container">
            <div className="card">
                <div className="task_inputs">
                    <input type="text" value={inputText} placeholder="Create your task here..." onChange={InputEvent} />
                    <button onClick={Addlist} className="add_button">add</button>
                </div>

                <ul className="item_list">

                    { listItems.map((itemval,index) =>{

                      return(
                        <div key={index}><List_Items id={index} key={index} list_name={itemval} onSelect={DeList} /></div>
                      ); 

                      })
                        
                    }

                </ul>
            </div>
        </div>
    </div>
  );
}

export default App;
