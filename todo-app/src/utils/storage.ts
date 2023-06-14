// set up a persistence layer that uses local storage

function saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key: string) {
    const data = localStorage.getItem(key);
    
    return data ? JSON.parse(data) : null;
}

export default {
    loadData,
    saveData
}