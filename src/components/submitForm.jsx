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
                          quote: `${quote}`,
                          sourceName: `${sourceName}`,
                          sourceUrl: `${sourceUrl}`,
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
                    className={typeof quote === "string" ? "long-input" : "input-error"}
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