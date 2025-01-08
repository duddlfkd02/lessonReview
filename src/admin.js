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
      li.className = "flex items-center p-2 ";
      li.innerHTML = `
        <span class="flex items-center ml-[-20px]">
          <span class="mr-2 text-green-500">⛳️</span>
          ${instructor.name}
        </span>
      `;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className =
        "ml-1 px-3 py-1 hover:text-red-500 focus:outline-none";
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

const modal = document.getElementById("templateModal");
const templateNameInput = document.getElementById("templateName");
const templateContentInput = document.getElementById("templateContent");
const saveTemplateBtn = document.getElementById("saveTemplateBtn");
const cancelTemplateBtn = document.getElementById("cancelTemplateBtn");

const openModal = () => {
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  templateNameInput.value = "";
  templateContentInput.value = "";
};

document.getElementById("addTemplateBtn").addEventListener("click", openModal);

cancelTemplateBtn.addEventListener("click", closeModal);

saveTemplateBtn.addEventListener("click", () => {
  const templateName = templateNameInput.value.trim();
  const content = templateContentInput.value.trim();

  if (!templateName || !content) {
    alert("모든 내용이 입력되었는지 확인해주세요!");
    return;
  }

  addData("templates", { templateName, content });
  alert("템플릿이 추가되었습니다.");
  closeModal();
  refreshTemplateList();
});

const refreshTemplateList = () => {
  getAllData("templates", (data) => {
    templateList.innerHTML = "";
    data.forEach((template) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center justify-between p-6 shadow ml-[-20px] mb-6";

      // 템플릿 제목과 내용
      const contentDiv = document.createElement("div");
      contentDiv.className = "text-left";
      contentDiv.innerHTML = `
        <div class="text-sm font-bold text-gray-700">${template.templateName}</div>
        <div class="text-sm text-gray-600 mt-1">${template.content}</div>
      `;

      // 삭제 버튼
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.className =
        "px-4 py-1 text-sm bg-red-500 text-white rounded shadow hover:bg-red-400 focus:outline-none";
      deleteBtn.addEventListener("click", () => {
        deleteData("templates", template.id);
        refreshTemplateList();
      });

      // li 내부 요소 추가
      li.appendChild(contentDiv);
      li.appendChild(deleteBtn);
      templateList.appendChild(li);
    });
  });
};

// 초기 목록 로드
refreshInstructorList();
refreshTemplateList();
