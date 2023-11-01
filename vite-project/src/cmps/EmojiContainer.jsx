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
        <div className="empji-container">
            {<Emoji unified={selectedEmoji} size={28} />}
       

            <button onClick={openMenuEmoji} className="emoji1"><img className="emjoi-btn1" src="emjoi-btn.svg"></img></button>

            <div className="emoji-picker-container">
                {showEmojiPicker && <EmojiPicker onEmojiClick={onClick} />}
            </div>

        </div>
    )
}