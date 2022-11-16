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

function getData(){
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("names","readwrite");
    const objectStore = IDBtransaction.objectStore("names");
    return[objectStore,IDBtransaction];
}

function addObjet(entry){
    const IDBData = getData();
    IDBData[0].add(entry);
    IDBData[1].addEventListener("complete",()=>{
        console.log("Entry added correctly.")
    })
}

function modifyObject(key,entry){
    const IDBData = getData();
    IDBData[0].put(entry,key);
    IDBData[1].addEventListener("complete",()=>{
        console.log("Entry modified correctly.")
    })
}

function deleteObject(key){
    const IDBData = getData();
    IDBData[0].delete(key);
    IDBData[1].addEventListener("complete",()=>{
        console.log("Entry deleted correctly.")
    })
}

function readObject(entry){
    const IDBData = getData();
    const cursor = IDBData[0].openCursor();
    cursor.addEventListener("success",()=>{
        if (cursor.result){
            console.log(cursor.result.value);
            cursor.result.continue();
        } else console.log("Every entre has been readed")
    });
}
