import { useState } from "react";
import Tick from "../assets/check.png";
import Circle from "../assets/circle.png";
import Delete from "../assets/delete.png";
import Pen from "../assets/pen.png";
import PropTypes from 'prop-types';

function TodoItems({ text, itemId, seter, Togle, isComplete, Edit, isEditing, togleEditMode }) {
    const [editText, setEditText] = useState(text);

    const handleEditChange = (e) => {
        setEditText(e.target.value);
    };

    const handleEditSubmit = () => {
        if (editText.trim() !== "") {
            Edit(itemId, editText);
        }
    };

    return (
        <div className="flex items-center my-3 gap-2">
            {/* Checkbox & Text */}
            <div onClick={() => Togle(itemId)} className="flex flex-1 items-center cursor-pointer">
                <img className="w-7" src={isComplete ? Tick : Circle} alt="" />

                {isEditing ? (
                    <input
                        className="ml-3 p-1 rounded bg-gray-700 text-white border border-gray-500"
                        value={editText}
                        onChange={handleEditChange}
                        onBlur={handleEditSubmit} // ✅ Save on blur
                        onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()} // ✅ Save on Enter
                        autoFocus
                    />
                ) : (
                    <p className={`ml-3 text-white decoration-slate-900 ${isComplete ? "line-through  text-gray-500 text-gray-400" : ""}`}>
                        {text}
                    </p>
                )}
            </div>

            {/* Delete Button */}
            <img onClick={() => seter(itemId)} src={Delete} alt="Delete" className="w-5 cursor-pointer" />

            {/* Edit Button */}
            <img onClick={() => togleEditMode(itemId)} src={Pen} alt="Edit" className="w-5 cursor-pointer" />
        </div>
    );
}

TodoItems.propTypes = {
    itemId: PropTypes.number,
    text:PropTypes.string,
    seter:PropTypes.func,
    Togle:PropTypes.string,
    isComplete:PropTypes.string,
    Edit:PropTypes.string,
    isEditing:PropTypes.string,
    togleEditMode:PropTypes.string
    

  };

export default TodoItems;