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

  const textToCopy = `담당 프로: ${instructorsSelect}\n레슨포인트 :\n${lessonPoints}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("복사되었습니다!");
  });
});

// 초기화 이벤트 로직
document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("내용을 초기화하시겠습니까?")) {
    document.getElementById("lessonPoints").value = "";
    document.getElementById("instructorsSelect").selectedIndex = 0;
  }
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
