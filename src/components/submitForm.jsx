import React, {useState} from "react";
import Modal from 'react-modal';
import "./submit.css"

function SubmitForm(props) {
    const [quote, setQuote] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceUrl, setSourceUrl] = useState("");

    return(
        <div>
            <Modal
                isOpen={props.show}
                onRequestClose={props.onClose}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="form-container">
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

                <button
                    className="close-button"
                    onClick={props.onClose}
                >
                    x
                </button>

                <label className="label">
                    Help other people unmotivate with your quote!
                </label>
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