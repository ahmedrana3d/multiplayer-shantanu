AFRAME.registerComponent('set-aspect-ratio', {
  init: function () {
    const el = this.el;
    const elMedia = el.getAttribute('src').substring(1);
    const media = document.getElementById(elMedia);

    if (media.tagName === 'A-ASSET-ITEM') {
      const mediaSrc = media.getAttribute('src');
      const newMedia = document.createElement('video');
      newMedia.src = mediaSrc;

      newMedia.addEventListener('loadedmetadata', function () {
        const mediaAspectRatio = newMedia.videoWidth / newMedia.videoHeight;
        el.setAttribute('width', mediaAspectRatio);
      });
    } else if (media.tagName === 'VIDEO') {
      const mediaAspectRatio = media.videoWidth / media.videoHeight;
      el.setAttribute('width', mediaAspectRatio);
    } else {
      const mediaAspectRatio = media.naturalWidth / media.naturalHeight;
      el.setAttribute('width', mediaAspectRatio);
    }
  }
});

AFRAME.registerComponent('handle-controls', {
  init: function () {
    const el = this.el;
    const isMobile = AFRAME.utils.device.isMobile();
    const sceneEl = document.querySelector('a-scene');

    if (isMobile) {
      console.log('Mobile');
      el.setAttribute('movement-controls', 'constrainToNavMesh: true; controls:nipple,keyboard');
      el.setAttribute('nipple-controls', 'mode: static');

      sceneEl.addEventListener('enter-vr', function () {
        console.log('VR');
        el.setAttribute('movement-controls', 'constrainToNavMesh: true; controls:gamepad ,keyboard,nipple');
        el.setAttribute('nipple-controls', 'mode: dynamic');
      });

      sceneEl.addEventListener('exit-vr', function () {
        el.setAttribute('movement-controls', 'constrainToNavMesh: true; controls:keyboard,nipple');
        el.setAttribute('nipple-controls', 'mode: static');
      });
    } else {
      el.setAttribute('movement-controls', 'constrainToNavMesh: true;');
    }
  }
});
