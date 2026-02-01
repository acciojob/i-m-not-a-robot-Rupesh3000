const images = [
  { id: "img1", url: "https://picsum.photos/200/300?random=1" },
  { id: "img2", url: "https://picsum.photos/200/300?random=2" },
  { id: "img3", url: "https://picsum.photos/200/300?random=3" },
  { id: "img4", url: "https://picsum.photos/200/300?random=4" },
  { id: "img5", url: "https://picsum.photos/200/300?random=5" },
];

const imgs = document.getElementById("imgs");
const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
let selectedImages = [];

const rerendorRendomImg = () => {
  for (let i = images.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at a[i] and a[j] using images destructuring
    [images[i], images[j]] = [images[j], images[i]];
  }

  for (let i = 0; i < images.length; i++) {
    const imgTag = document.createElement("img");
    imgTag.src = images[i].url;
    imgTag.className = images[i].id;
    imgTag.setAttribute("data-ns-test", images[i].id);
    imgs.appendChild(imgTag);
  }

  const rendomCopyImg = Math.floor(Math.random() * (images.length - 1));
  const imgTag = document.createElement("img");
  imgTag.src = images[rendomCopyImg].url;
  imgTag.className = images[rendomCopyImg].id;
  imgTag.setAttribute("data-ns-test", images[rendomCopyImg].id);
  imgs.appendChild(imgTag);
};

const handalClicked = (e) => {
  if (e.target.tagName !== "IMG") return;

  // Prevent double-click on same image
  if (selectedImages.includes(e.target)) return;

  // Do not allow more than 2 selections
  if (selectedImages.length === 2) return;
  if (
    e.target.tagName === "IMG" &&
    !selectedImages.includes(e.target) &&
    selectedImages.length < 2
  ) {
    selectedImages.push(e.target);
  }
  // State 2: at least one image selected
  reset.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verify.style.display = "block";
  }
};

reset.addEventListener("click", () => {
  selectedImages.length = 0;
  imgs.innerHTML = "";
  verify.style.display = "none";
  reset.style.display = "none";
  const para = document.getElementById("para");
  if (para) para.remove();

  rerendorRendomImg();
});

verify.addEventListener("click", () => {
  verify.style.display = "none";

  const [img1, img2] = selectedImages;

  const para = document.createElement("p");
  para.id = "para";

  if (img1.className === img2.className) {
    para.innerText = " You are a human. Congratulations!.";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.querySelector(".main").appendChild(para);
});

imgs.addEventListener("click", handalClicked);

rerendorRendomImg();
