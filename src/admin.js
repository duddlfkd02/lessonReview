import { initDB, addData, getAllData, deleteData } from "./indexedDB.js";

initDB();

// 프로 관리
const instructorList = document.getElementById("instructorList");
const addInstructorBtn = document.getElementById("addInstructorBtn");

addInstructorBtn.addEventListener("click", () => {
  const name = prompt("추가할 이름을 입력하세요");
  if (name) {
    addData("instructors", { name });
    alert("추가 완료되었습니다.");
    refreshInstructorList();
  }
});

const refreshInstructorList = () => {
  getAllData("instructors", (data) => {
    instructorList.innerHTML = "";
    data.forEach((instructor) => {
      const li = document.createElement("li");
      li.textContent = instructor.name;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.addEventListener("click", () => {
        deleteData("instructors", instructor.id);
        refreshInstructorList();
      });

      li.appendChild(deleteBtn);
      instructorList.appendChild(li);
    });
  });
};

// 템플릿 관리
const templateList = document.getElementById("templateList");
const addTemplateBtn = document.getElementById("addTemplateBtn");

addTemplateBtn.addEventListener("click", () => {
  const templateName = prompt("추가할 템플릿 이름을 입력하세요");
  const content = prompt("템플릿 내용을 입력하세요");
  if ((templateName, content)) {
    addData("templates", { templateName, content });
    alert("템플릿이 추가되었습니다.");
    refreshTemplateList();
  }
});

const refreshTemplateList = () => {
  getAllData("templates", (data) => {
    templateList.innerHTML = "";
    data.forEach((template) => {
      const li = document.createElement("li");
      li.textContent = `${template.templateName}: ${template.content}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.addEventListener("click", () => {
        deleteData("templates", template.id);
        refreshTemplateList();
      });

      li.appendChild(deleteBtn);
      templateList.appendChild(li);
    });
  });
};

// 초기 목록 로드
refreshInstructorList();
refreshTemplateList();
