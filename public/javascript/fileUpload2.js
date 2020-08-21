const rootStyles = window.getComputedStyle(document.documentElement)
if (rootStyles.getPropertyValue('--imageimage-width-large') != null && rootStyles.getPropertyValue('--imageimage-width-large') !== '') {
  ready()
} else {
  document.getElementById('main-css').addEventListener('load', (event) => {
    ready()
  })
}

function ready() {
  const coverWidth = parseFloat(rootStyles.getPropertyValue('--imageimage-width-large'))
  const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--imageimage-aspect-ratio'))
  const coverHeight = coverWidth / coverAspectRatio
  console.log(coverHeight, coverWidth)
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
  )

  FilePond.setOptions({
    allowImageResize: true,
    imageResizeMode: "cover",
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight,
    allowImageCrop: true,
    imageCropAspectRatio: coverAspectRatio,
    allowImageTransform: true
  })
  
  FilePond.parse(document.body)
}