import React from 'react';
const { useState, useEffect, useRef } = React
import EmojiPicker from 'emoji-picker-react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

export function EmojiContainer({onEmojiSelect}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function openMenuEmoji() {
        setShowEmojiPicker(!showEmojiPicker);
    }

    function onClick(emojiData, event) {
        const emoji = emojiData.isCustom ? emojiData.unified : emojiData.emoji
        onEmojiSelect(emoji)
      
    }


    return (
        // <div className="empji-container-add-text" {styyle :margin-left:'755px',margin-top:'-527px'}>
        <div className="emoji-container-add-text" style={{ marginLeft: '758px', marginTop: '-523px' }}>

            {<Emoji unified={selectedEmoji} size={28} />}
       

            <button onClick={openMenuEmoji} className="emoji-add-text"><img className="emjoi-btn-add-text" style={{marginTop:'-5px'}}src="emjoi-btn.svg"></img></button>

            <div className="emoji-picker-container">
                {showEmojiPicker && <EmojiPicker onEmojiClick={onClick} />}
            </div>

        </div>
    )
}