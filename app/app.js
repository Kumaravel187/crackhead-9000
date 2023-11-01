import { friendsData } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const memeEl = document.querySelector(".section__meme-container");
  const btnEl = document.getElementById("btn");

  const closeModalEl = document.getElementById("close-modal");
  const modalEl = document.querySelector(".modal");
  const containerEl = document.getElementById("container");

  modalEl.style.display = "none";

  const retrieveFriendsArray = (friendsData) => {
    const friendName = [];
    for (let friend of friendsData) {
      for (let name of friend.name) {
        if (!friendName.includes(name)) {
          friendName.push(name);
        }
      }
    }
    return friendName;
  };

  const displayFriendName = () => {
    let allNames = retrieveFriendsArray(friendsData);
    for (let name of allNames) {
      memeEl.innerHTML += `<div class = "radio">
        <label for="${name}">${name}</label>
        <input 
            type="radio" 
            id="${name}" 
            value="${name}"   
            name="name-list"
            >
    </div>`;
    }
  };

  const retrieveFriendImageData = (friendsData) => {
    const friendImage = [];
    for (let friend of friendsData) {
      friendImage.push([friend.image, friend.alt]);
    }
    console.log(friendImage);
    return friendImage;
  };

  const filterFriendImages = () => {
    let filteredImages;
    const checkedRadio = document.querySelector(`input[type="radio"]:checked`);
    const allImages = retrieveFriendImageData(friendsData);

    if (checkedRadio) {
      filteredImages = allImages.filter((img) => {
        return img[0].includes(`${checkedRadio.id}`);
      });
    } else {
      alert("Please select a crackhead");
    }
    console.log(filteredImages);
    return filteredImages;
  };

  const generateRandomFilteredImage = () => {
    const filteredImageArray = filterFriendImages();

    if (filteredImageArray) {
      const randomNum = Math.floor(Math.random() * filteredImageArray.length);
      // console.log(filteredImageArray[randomNum]);
      return filteredImageArray[randomNum];
    }
  };

  const renderImage = () => {
    const friend = generateRandomFilteredImage();
    console.log(friend);

    if (friend) {
      containerEl.innerHTML = `

    <p class="modal__description">
      ${friend[1]}
    </p>
    <div class="image-container">
      <img class="modal__img" src="${friend[0]}" alt="" />
    </div>`;

      modalEl.style.display = "block";
    } else {
      modalEl.style.display = "none";
    }
  };

  displayFriendName();

  retrieveFriendImageData(friendsData);

  closeModalEl.addEventListener("click", () => {
    modalEl.style.display = "none";
  });

  btnEl.addEventListener("click", renderImage);
});

//   const generateRandomFilteredImage = () => {
//     const filteredImageArray = filterFriendImages();

//     if (filteredImageArray) {
//       const randomNum = Math.floor(Math.random() * filteredImageArray.length);

//       return filteredImageArray[randomNum];
//     }
//   };

//   const renderImage = () => {
//     const friendImage = generateRandomFilteredImage();

//     if (friendImage) {
//       containerEl.innerHTML = `

//   <p class="modal__description">
//     crack
//   </p>
//   <div class="image-container">
//     <img class="modal__img" src="${friendImage}" alt="" />
//   </div>`;

//       modalEl.style.display = "block";
//     } else {
//       modalEl.style.display = "none";
//     }
//   };

//   displayFriendName();

//   retrieveFriendImageData(friendsData);

//   closeModalEl.addEventListener("click", () => {
//     modalEl.style.display = "none";
//   });

//   btnEl.addEventListener("click", renderImage);
// });
