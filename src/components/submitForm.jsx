import React, {useState} from "react";
import Modal from 'react-modal';
import "./submit.css"

function SubmitForm(props) {
    const [quote, setQuote] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceUrl, setSourceUrl] = useState("");

    return(
        <div >
            <Modal
                isOpen={props.show}
                onRequestClose={props.onClose}
                className="modal animate-bottom"
                //overlayClassName="overlay"
            >
                <div className="form-container ">
                <form className="form" onSubmit={e =>
                 {
                    e.preventDefault();
                    props.submitData( 
                        {
                          text: `${quote}`,
                          source: {
                            displayName: `${sourceName}`,
                            url: `${sourceUrl}`
                          },
                          backgroundImage: 'https://images.unsplash.com/photo-1488426314888-94c9164df81d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
                          backgroundGradient: ['#8a7967', '#caccd1']
                        }
                    );
                }}>

                
                <div class="close-container" onClick={props.onClose}>
                    <div class="leftright"></div>
                    <div class="rightleft"></div>
                    <label class="close">close</label>
                </div>
                
                <div className="intro-container">
                    <p className="title">Got a Quote?</p>
                    <p className="description">Unmotivate us with your creativity.</p>
                </div>
                
                
                <input
                    className={typeof quote === "string" ? "input" : "input-error"}
                    type="text"
                    required
                    name="quote"
                    placeholder="Quote"
                    onChange={e => setQuote(e.target.value)}
                    value={quote}
                />
                
                <input
                    className="input"
                    type="text"
                    required
                    name="sourceName"
                    placeholder="Source Name"
                    onChange={e => setSourceName(e.target.value)}
                    value={sourceName}
                />
                
                <input
                    className="input"
                    type="text"
                    required
                    name="sourceUrl"
                    placeholder="Source URL"
                    onChange={e => setSourceUrl(e.target.value)}
                    value={sourceUrl}
                />

                <button 
                    className="submit-button"
                    type="submit"
                    >
                        Done!
                </button>
            </form>
                </div>
               
        </Modal>
    </div>
    )
}

export default SubmitForm;