import { initDB, getAllData } from "./indexedDB.js";

initDB();

// 프로 및 템플릿 불러오기
const instructorsSelect = document.getElementById("instructorsSelect");
const templateSelect = document.getElementById("templateSelect");

const loadInstructors = () => {
  getAllData("instructors", (data) => {
    instructorsSelect.innerHTML = "";
    data.forEach((instructor) => {
      const option = document.createElement("option");
      option.value = instructor.name;
      option.textContent = instructor.name;
      instructorsSelect.appendChild(option);
    });
  });
};

const loadTemplates = () => {
  getAllData("templates", (data) => {
    templateSelect.innerHTML = '<option value="">템플릿을 선택하세요.</option>';
    data.forEach((template) => {
      const option = document.createElement("option");
      option.value = template.content;
      option.textContent = template.templateName;
      templateSelect.appendChild(option);
    });
  });
};

// 템플릿 적용
templateSelect.addEventListener("change", () => {
  document.getElementById("lessonPoints").value = templateSelect.value;
});

// 복사 이벤트 로직
document.getElementById("copyBtn").addEventListener("click", () => {
  const instructorsSelect = document.getElementById("instructorsSelect").value;
  const lessonPoints = document.getElementById("lessonPoints").value;

  const textToCopy = `담당 프로: ${instructorsSelect}\n[레슨포인트]\n${lessonPoints}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "SUCCESS!",
      text: "클립보드에 복사되었습니다.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#fff",
    });
  });
});

// 초기화 이벤트 로직
document.getElementById("clearBtn").addEventListener("click", () => {
  Swal.fire({
    title: "내용을 초기화하시겠습니까?",
    text: "현재 입력된 내용이 삭제됩니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "초기화하기",
    cancelButtonText: "취소하기",
    confirmButtonColor: "#000",
    cancelButtonColor: "#808080",
    customClass: {
      confirmButton:
        "bg-black text-white px-6 py-3  rounded-full hover:bg-gray-900",
      cancelButton:
        "bg-gray-100 text-gray-800 px-6 py-3  rounded-full hover:bg-gray-200",
      popup: "rounded-lg",
      actions: "flex justify-center space-x-4",
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      // 현재 선택된 템플릿 값 가져오기
      const templateSelect = document.getElementById("templateSelect");
      const selectedTemplate = templateSelect.value;

      document.getElementById("lessonPoints").value = "";
      document.getElementById("instructorsSelect").selectedIndex = 0;

      // 현재 선택된 템플릿이 있다면 가져오기
      if (selectedTemplate) {
        document.getElementById("lessonPoints").value = selectedTemplate;
      }
    }
  });
});

// 초기 로드
loadInstructors();
loadTemplates();

// 실시간 글자수
const charCount = document.getElementById("charCount");

lessonPoints.addEventListener("input", () => {
  updateCharCount();
});

const updateCharCount = () => {
  const textLength = lessonPoints.value.length;
  charCount.textContent = `${textLength} / 1000`;
};
