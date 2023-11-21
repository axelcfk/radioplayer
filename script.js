"use strict";

let channels;
// let currentAudio = null;

async function getChannels() {
  try {
    const response = await fetch(
      " http://api.sr.se/api/v2/channels?format=json&size=100"
    );
    channels = await response.json();
    console.log(channels);

    const body = document.body;
    body.classList.add("container");

    channels = channels.channels;

    channels.forEach((channel) => {
      const channelDiv = document.createElement("div");
      const channelImg = document.createElement("img");
      const channelName = document.createElement("h2");
      const channelContainer = document.createElement("div");
      const channelPlayer = document.createElement("audio");
      const channelDescription = document.createElement("p");
      channelPlayer.controls = true;

      channelPlayer.src = channel.liveaudio.url;
      channelDescription.textContent = channel.tagline;

      channelName.textContent = channel.name;
      channelImg.src = channel.image;

      body.appendChild(channelDiv);
      channelDiv.appendChild(channelImg);
      channelDiv.appendChild(channelContainer);
      channelContainer.appendChild(channelName);
      channelContainer.appendChild(channelPlayer);

      channelContainer.insertBefore(channelDescription, channelPlayer);
      //   channelContainer.appendChild(channelDescription);

      channelDiv.classList.add("channel");
      channelImg.classList.add("channelImg");
      channelPlayer.classList.add("channelPlayer");
      channelContainer.classList.add("channelContainer");
      channelDescription.classList.add("channelDescription");

      channelDiv.style.backgroundColor = "#" + channel.color;
      channelDiv.style.height = "200px";
      channelDiv.style.width = "800px";
      channelImg.style.width = "200px";
      console.log(channelDiv);

      //Pause when other audio control is clicked
      //   channelPlayer.addEventListener("play", () => {
      //     if (currentAudio && currentAudio !== channelPlayer) {
      //       channelPlayer.pause();
      //     }
      //     currentAudio = channelPlayer;
      //   });

      //if there is no image use sr standard image
      if (channel.image === undefined) {
        channelImg.src =
          "https://static-cdn.sr.se/images/4842/b92bbffc-c722-48db-842d-0f7aac78a21d.jpg?preset=api-default-square";
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getChannels();
