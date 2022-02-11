const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play and change the button text and style
const selectMediaStream = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }        
        button.innerText = "START";
        button.classList.replace('default-button', 'start-button');
    } catch (error) {
        //Catch Error Here
    }
}

// Start Picture in Picture and change the button text and style
const startSharing = async () => {    
    await videoElement.requestPictureInPicture();
    button.innerText = "STOP";
    button.classList.replace('start-button', 'stop-button');
}

//Stop Picture in Picture or just change the button text and style if it is already stopped
const stopSharing = () => {
    if(document.pictureInPictureElement) document.exitPictureInPicture();
    videoElement.srcObject = null;
    button.innerText = "SELECT MEDIA";
    button.classList.replace('stop-button', 'default-button');
}

// Check if media is selected or playing
const checkMedia = () => {
    if(!videoElement.srcObject) selectMediaStream();
    else if (!document.pictureInPictureElement) startSharing();
    else stopSharing();
}

// If Picture in Picture is stopped, change the button text and style
videoElement.addEventListener('leavepictureinpicture', stopSharing)

button.addEventListener('click', checkMedia);