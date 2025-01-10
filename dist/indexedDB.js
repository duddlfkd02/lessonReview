const dbName = "LessonPointsDB";

// db 초기화
export const initDB = () => {
  const openDB = indexedDB.open(dbName, 1);

  openDB.onupgradeneeded = (event) => {
    const db = event.target.result;

    // 프로 스토어 생성
    if (!db.objectStoreNames.contains("instructors")) {
      db.createObjectStore("instructors", {
        keyPath: "id",
        autoIncrement: true,
      });
    }

    // 템플릿 스토어 생성
    if (!db.objectStoreNames.contains("templates")) {
      db.createObjectStore("templates", { keyPath: "id", autoIncrement: true });
    }

    openDB.onerror = (event) => {
      console.error("데이터베이스 초기화 실패", event.target.error);
    };
  };
};

// 데이터 추가하기
export const addData = (storeName, data) => {
  const dbRequest = indexedDB.open(dbName);

  dbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.add(data);

    transaction.oncomplete = () => {
      /*
        로그 삭제
        console.log("데이터 추가 성공:", data);
      */
    };

    transaction.onerror = (event) => {
      console.error("데이터 추가 시 오류 발생", event.target.error);
    };
  };
};

// 모든 데이터 조회하기
export const getAllData = (storeName, callback) => {
  const dbRequest = indexedDB.open(dbName);

  dbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.getAll();
    request.onsuccess = () => {
      callback(request.result);
    };

    request.onerror = (event) => {
      console.error("데이터 조회 실패:", event.target.error);
    };
  };
};

// 데이터 삭제하기
export const deleteData = (storeName, id) => {
  const dbRequest = indexedDB.open(dbName);

  dbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.delete(id);

    transaction.oncomplete = () => {
      /*
        로그 삭제
        console.log("데이터 추가 성공:", data);
      */
    };

    transaction.onerror = (event) => {
      console.log("데이터 삭제 실패", event.target.error);
    };
  };
};
