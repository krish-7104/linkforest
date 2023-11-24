import { userContext } from "../../Contexts/userContext";
import { db } from "../../backend/firebaseConfig";
import React, { useContext, useState } from "react";
import { BsCaretUp, BsCaretDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Other = () => {
  const contextData = useContext(userContext);
  const [popup, setPopup] = useState({
    state: false,
    type: "",
  });
  const [website, setWebsite] = useState({ link: "", title: "", index: "" });
  const updateValueHandler = async (
    newObject,
    message = "Website Updated!"
  ) => {
    toast.loading("Updating Data!");
    contextData.setData({
      ...contextData.data,
      websites: {
        ...newObject,
      },
    });
    const updateRef = doc(db, "Link Forests", contextData.data.userInfo.id);
    await updateDoc(updateRef, {
      websites: newObject,
      updatedTime: serverTimestamp(),
    });
    toast.dismiss();
    toast.success(message);
  };
  const linkUpHandler = (id) => {
    if (id !== 0) {
      let currentData = contextData.data.websites[id];
      let previousData = contextData.data.websites[id - 1];
      let newObject = contextData.data.websites;
      newObject = {
        ...newObject,
        [id - 1]: currentData,
        [id]: previousData,
      };
      updateValueHandler(newObject);
    }
  };
  const linkDownHandler = (id) => {
    if (id !== Object.keys(contextData.data.websites).length - 1) {
      let currentData = contextData.data.websites[id];
      let nextData = contextData.data.websites[id + 1];
      let newObject = contextData.data.websites;
      newObject = {
        ...newObject,
        [id + 1]: currentData,
        [id]: nextData,
      };
      updateValueHandler(newObject);
    }
  };
  const setPopupHandler = (type, index) => {
    setPopup({ type, state: !popup.state });
    if (type === "Edit") {
      setWebsite({
        link: contextData.data.websites[index].link,
        title: contextData.data.websites[index].title,
        index,
      });
    } else if (type === "Add") {
      setWebsite({
        link: "",
        title: "",
      });
    }
  };
  const resetPopupHandler = () => {
    setPopup({ ...popup, state: !popup.state });
    setWebsite({
      link: "",
      title: "",
      index: "",
    });
  };
  const addEditWebsiteHandler = () => {
    if (popup.type === "Edit") {
      let newObject = contextData.data.websites;
      newObject = {
        ...newObject,
        [website.index]: {
          title: website.title,
          link: website.link,
        },
      };
      updateValueHandler(newObject, "Website Edited!");
    } else if (popup.type === "Add") {
      let newObject = contextData.data.websites;
      newObject = {
        ...newObject,
        [newObject ? Object.keys(newObject).length : 0]: {
          title: website.title,
          link: website.link,
        },
      };
      updateValueHandler(newObject, "Website Added!");
    }
    resetPopupHandler();
  };

  const deleteWebsiteHandler = () => {
    let newObject = { ...contextData.data.websites };
    for (let i = website.index; i < Object.keys(newObject).length; i++) {
      if (i + 1 < Object.keys(newObject).length) {
        const element = Object.keys(newObject)[i + 1];
        newObject[i] = newObject[element];
      }
    }
    delete newObject[Object.keys(newObject).length - 1];
    updateValueHandler(newObject, "Website Deleted!");
    resetPopupHandler();
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      Object.values(contextData.data.websites),
      result.source.index,
      result.destination.index
    );

    let newObject = {};
    items.forEach((item, index) => {
      newObject[index] = item;
    });

    updateValueHandler(newObject, "List Rearranged!");
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  return (
    <div className="flex justify-center items-end flex-col relative">
      {!popup.state && (
        <>
          <div className="w-full flex justify-end md:justify-between">
            <p className="font-Montserrat hidden md:block font-medium text-sm">
              You can drag and rearrange the websites!
            </p>
            <button
              onClick={() => setPopupHandler("Add")}
              className="bg-emerald-400 px-2 py-2 rounded font-Montserrat font-semibold text-sm mb-5"
            >
              Add Link
            </button>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-[95%] md:w-[90%] mx-auto"
                >
                  {contextData.data.websites &&
                    Object.keys(contextData.data.websites).map(
                      (link, index) => (
                        <Draggable
                          key={index}
                          draggableId={`item-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                key={index}
                                className="w-full border-slate-400 border-[1.4px] rounded-lg px-4 py-3 flex justify-between items-center mb-4"
                              >
                                <div
                                  className="cursor-pointer w-[80%]"
                                  onClick={() => setPopupHandler("Edit", index)}
                                >
                                  <p className="font-Montserrat text-sm md:text-base font-medium">
                                    {contextData.data.websites[link].title}
                                  </p>
                                  <p className="font-Montserrat text-xs md:text-sm font-normal mt-[2px]">
                                    {contextData.data.websites[link].link}
                                  </p>
                                </div>
                                <div className="flex justify-center items-center">
                                  <span
                                    className={
                                      index === 0
                                        ? "disableUpDownBtn upDownBtn text-xl cursor-pointer mr-3"
                                        : "upDownBtn text-xl cursor-pointer mr-3"
                                    }
                                    onClick={() => linkUpHandler(index)}
                                  >
                                    <BsCaretUp />
                                  </span>
                                  <span
                                    className={
                                      index ===
                                      Object.keys(contextData.data.websites)
                                        .length -
                                        1
                                        ? "disableUpDownBtn upDownBtn text-xl cursor-pointer"
                                        : "upDownBtn text-xl cursor-pointer"
                                    }
                                    onClick={() => linkDownHandler(index)}
                                  >
                                    <BsCaretDown />
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
      {popup.state && (
        <>
          <div className="flex justify-center items-center flex-col w-full">
            <div className="flex justify-end items-center w-full">
              {popup.type === "Edit" && (
                <button onClick={deleteWebsiteHandler} variant={"unstyled"}>
                  <MdOutlineDelete color="red" fontSize={24} className="mr-2" />
                </button>
              )}
              <button onClick={resetPopupHandler}>
                <IoClose color="black" fontSize={26} />
              </button>
            </div>
            <div className="w-[90%] md:w-[80%] mx-auto my-6">
              <label className="font-Montserrat font-medium text-[12px] md:text-sm leading-8">
                Website Title:
              </label>
              <input
                className="w-full border-slate-400 font-Montserrat font-medium text-[14px] md:text-sm border-[1.4px] rounded p-2 px-2 mb-3"
                value={website.title}
                onChange={(e) =>
                  setWebsite({ ...website, title: e.target.value })
                }
              />
              <label className="font-Montserrat font-medium text-[12px] md:text-sm leading-8">
                Website Link:
              </label>
              <input
                className="w-full border-slate-400 font-Montserrat font-medium text-[14px] md:text-sm border-[1.4px] rounded p-2 px-2"
                value={website.link}
                onChange={(e) =>
                  setWebsite({ ...website, link: e.target.value })
                }
              />
              <button
                className="bg-emerald-400 text-slate-950 font-Montserrat px-2 md:px-3 py-2 text-sm md:text-base font-semibold rounded mt-4"
                onClick={addEditWebsiteHandler}
              >
                {popup.type} Website
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Other;
