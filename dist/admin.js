import {
  initDB,
  addData,
  getAllData,
  deleteData,
  updateData,
} from "./indexedDB.js";

initDB();

// 프로 관리
const instructorList = document.getElementById("instructorList");
const addInstructorBtn = document.getElementById("addInstructorBtn");

addInstructorBtn.addEventListener("click", async () => {
  const { value: name } = await Swal.fire({
    title: "이름 입력",
    input: "text",
    inputPlaceholder: "추가할 이름을 입력하세요",
    showCancelButton: true,
    confirmButtonText: "추가하기",
    cancelButtonText: "취소",
    inputValidator: (value) => {
      if (!value.trim()) {
        return "이름을 입력해주세요!";
      }
    },
    customClass: {
      confirmButton:
        "bg-black text-white px-6 py-3  rounded-full hover:bg-gray-900",
      cancelButton:
        "bg-gray-100 text-gray-800 px-6 py-3  rounded-full hover:bg-gray-200",
      popup: "rounded-lg",
      actions: "flex justify-center space-x-4",
    },
    buttonsStyling: false,
  });
  if (name) {
    addData("instructors", { name });
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "추가 완료!",
      text: "이름이 추가되었습니다.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    refreshInstructorList();
  }
});

const refreshInstructorList = () => {
  getAllData("instructors", (data) => {
    instructorList.innerHTML = "";
    data.forEach((instructor) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center p-2 ";
      li.innerHTML = `
        <span class="flex items-center">
          <span class="mr-2 text-green-500">⛳️</span>
          ${instructor.name}
        </span>
      `;

      // 삭제 버튼
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "flex items-center p-2 ";

      // 아이콘 생성
      const icon = document.createElement("i");
      icon.className = "fa-regular fa-circle-xmark";
      icon.style.color = "#000000";

      // 아이콘과 텍스트 추가
      deleteBtn.appendChild(icon);

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

// 모달 플래그
let isEditMode = false;
let currentEditingTemplateId = null; // 수정할 템플릿 ID 저장

const openModal = () => {
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  templateNameInput.value = "";
  templateContentInput.value = "";
};

// 템플릿 새로 추가할 때 모달
const openAddModal = () => {
  isEditMode = false;
  currentEditingTemplateId = null; // 기존 수정 id 초기화
  templateNameInput.value = "";
  templateContentInput.value = "";
  openModal();
};

// 템플릿 수정할 때 모달
const openEditModal = (template) => {
  isEditMode = true;
  currentEditingTemplateId = template.id; // 기존 수정 id 초기화
  templateNameInput.value = template.templateName;
  templateContentInput.value = template.content;
  openModal();
};

// 배경 클릭 시 닫기
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.getElementById("addTemplateBtn").addEventListener("click", openModal);

// 취소 버튼 클릭시 닫기
cancelTemplateBtn.addEventListener("click", closeModal);

// 저장 버튼 클릭 시 수정 데이터 처리
saveTemplateBtn.addEventListener("click", () => {
  saveTemplateBtn.disabled = true;
  const templateName = templateNameInput.value.trim();
  const templateContent = templateContentInput.value.trim();

  if (!templateContent || !templateContent) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      text: "모든 내용을 입력해주세요!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#fff",
    });
    saveTemplateBtn.disabled = false;
    return;
  }

  if (isEditMode) {
    // 수정 모드
    updateData("templates", {
      id: currentEditingTemplateId,
      templateName,
      content: templateContent,
    });
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "UPDATE!",
      text: "템플릿이 수정되었습니다!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#fff",
    });
  } else {
    // 추가 모드: 새 템플릿 추가
    addData("templates", { templateName, content: templateContent });
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "SUCCESS!",
      text: "새 템플릿이 추가되었습니다!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#fff",
    });
  }
  closeModal();
  refreshTemplateList();
  saveTemplateBtn.disabled = false;
});

// "템플릿 추가" 버튼 이벤트
document
  .getElementById("addTemplateBtn")
  .addEventListener("click", openAddModal);

const refreshTemplateList = () => {
  getAllData("templates", (data) => {
    templateList.innerHTML = "";
    data.forEach((template) => {
      const li = document.createElement("li");
      li.className = "flex items-center p-6 mb-6 bg-gray-50 rounded-lg border";

      // 템플릿 제목과 내용
      const contentDiv = document.createElement("div");
      contentDiv.className = "flex-1 text-left";
      contentDiv.innerHTML = `
        <div class="text-sm font-bold text-gray-700">${template.templateName}</div>
        <div class="text-sm text-gray-600 mt-1">${template.content}</div>
      `;

      // 버튼 컨테이너
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "flex items-center space-x-4";

      // 수정 버튼
      const editBtn = document.createElement("button");
      editBtn.className = "flex items-center";

      const editIcon = document.createElement("i");
      editIcon.className = "fa-regular fa-pen-to-square";
      editIcon.style.color = "#000000";

      editBtn.appendChild(editIcon);
      editBtn.addEventListener("click", () => {
        openEditModal(template);
      });

      // 삭제 버튼
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "flex items-center";

      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa-regular fa-circle-xmark";
      deleteIcon.style.color = "#000000";

      deleteBtn.appendChild(deleteIcon);
      deleteBtn.addEventListener("click", () => {
        deleteData("templates", template.id);
        refreshTemplateList();
      });

      // 버튼 컨테이너에 버튼 추가
      buttonContainer.appendChild(editBtn);
      buttonContainer.appendChild(deleteBtn);

      // li 내부에 내용과 버튼 컨테이너 추가
      li.appendChild(contentDiv);
      li.appendChild(buttonContainer);
      templateList.appendChild(li);
    });
  });
};

// 초기 목록 로드
refreshInstructorList();
refreshTemplateList();
