"use strict";

const IDBRequest = indexedDB.open("database",1);

IDBRequest.addEventListener("upgradeneeded",()=>{
    const db = IDBRequest.result;
    db.createObjectStore("names",{
        autoIncrement: true
    })
});

IDBRequest.addEventListener("success",()=>{
    console.log("Success on IDBRequest.")
});

IDBRequest.addEventListener("error",()=>{
    console.log("Error on IDBRequest.")
});

function getData(mode,msg){
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("names",mode);
    const objectStore = IDBtransaction.objectStore("names");
    IDBtransaction.addEventListener("complete",()=>{
        console.log(msg)
    });
    return IDBtransaction;
}

function addObjet(entry){
    const IDBData = getData("readwrite","Entry added correctly");
    IDBData[0].add(entry);
}

function modifyObject(key,entry){
    const IDBData = getData("readwrite","Entry modified correctly");
    IDBData.put(key,entry);
}

function deleteObject(key){
    const IDBData = getData("readwrite","Entry deleted correctly");
    IDBData.delete(key);
}

function readObject(entry){
    const IDBData = getData("readonly");
    const cursor = IDBData.openCursor();
    cursor.addEventListener("success",()=>{
        if (cursor.result){
            console.log(cursor.result.value);
            cursor.result.continue();
        } else console.log("Every entry has been readed")
    });
}
